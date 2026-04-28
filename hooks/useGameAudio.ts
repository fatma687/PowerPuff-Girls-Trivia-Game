"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   EXPLOSION  —  boom + crackling noise burst
───────────────────────────────────────────────────────────── */
function playExplosion(ctx: AudioContext) {
  const now = ctx.currentTime;

  // 1) Low-frequency boom sweep
  const boomOsc = ctx.createOscillator();
  boomOsc.type = "sine";
  boomOsc.frequency.setValueAtTime(180, now);
  boomOsc.frequency.exponentialRampToValueAtTime(28, now + 0.55);

  const boomGain = ctx.createGain();
  boomGain.gain.setValueAtTime(0.9, now);
  boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  boomOsc.connect(boomGain);
  boomGain.connect(ctx.destination);
  boomOsc.start(now);
  boomOsc.stop(now + 0.55);

  // 2) White-noise crackle
  const sampleRate = ctx.sampleRate;
  const noiseLen = sampleRate * 0.7;
  const noiseBuf = ctx.createBuffer(1, noiseLen, sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) data[i] = Math.random() * 2 - 1;

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuf;

  // Filter to shape the noise into an explosion texture
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(80, now + 0.5);
  filter.Q.value = 0.8;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(1.2, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

  noiseSource.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);
  noiseSource.stop(now + 0.7);

  // 3) Sharp impact click at the very start
  const clickOsc = ctx.createOscillator();
  clickOsc.type = "square";
  clickOsc.frequency.setValueAtTime(220, now);
  clickOsc.frequency.exponentialRampToValueAtTime(55, now + 0.06);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.5, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(now);
  clickOsc.stop(now + 0.06);
}

/* ─────────────────────────────────────────────────────────────
   MAGIC / CORRECT  —  ascending sparkle chimes
───────────────────────────────────────────────────────────── */
function playMagic(ctx: AudioContext) {
  const now = ctx.currentTime;
  // Pentatonic ascending arpeggio — airy & magical
  const freqs = [523, 659, 784, 1047, 1319, 1568, 2093];

  freqs.forEach((freq, i) => {
    const t = now + i * 0.07;

    // Main tone
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    // Overtone shimmer at 2× frequency
    const shimmer = ctx.createOscillator();
    shimmer.type = "triangle";
    shimmer.frequency.value = freq * 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0, t);
    shimmerGain.gain.linearRampToValueAtTime(0.06, t + 0.02);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
    shimmer.start(t);
    shimmer.stop(t + 0.4);
  });

  // Ending glitter burst — quick high-pitched twinkling
  const glitterFreqs = [2637, 3136, 2794, 3520];
  glitterFreqs.forEach((freq, i) => {
    const t = now + 0.45 + i * 0.04;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.14);
  });
}

/* ─────────────────────────────────────────────────────────────
   BACKGROUND MUSIC  —  upbeat cartoon chiptune loop
   Key: C major pentatonic | BPM: 132
───────────────────────────────────────────────────────────── */
const BEAT = 60 / 132;         // seconds per beat
const HALF = BEAT / 2;

// Melody — note frequencies (0 = rest)
const MELODY: number[] = [
  523, 659, 784, 880, 784, 659, 784, 659,   // bar 1
  523, 659, 523, 440, 523,   0, 440, 523,   // bar 2
  659, 784, 880,1047, 880, 784, 880, 784,   // bar 3
  659, 784, 659, 523, 659,   0, 523,   0,   // bar 4
];

// Bass — root notes each beat
const BASS: number[] = [
  131, 131, 165, 165, 131, 131, 165, 165,
  131, 131, 110, 110, 131, 131, 110, 110,
  165, 165, 196, 196, 165, 165, 196, 196,
  165, 165, 131, 131, 165, 165, 131, 131,
];

function scheduleMusicBar(
  ctx: AudioContext,
  masterGain: GainNode,
  startTime: number
) {
  const loopDuration = MELODY.length * HALF;

  MELODY.forEach((freq, i) => {
    if (freq === 0) return;
    const t = startTime + i * HALF;

    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.07, t + 0.01);
    gain.gain.setValueAtTime(0.07, t + HALF * 0.75);
    gain.gain.linearRampToValueAtTime(0, t + HALF * 0.9);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(t);
    osc.stop(t + HALF);
  });

  BASS.forEach((freq, i) => {
    const t = startTime + i * HALF;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.11, t + 0.02);
    gain.gain.setValueAtTime(0.11, t + HALF * 0.6);
    gain.gain.linearRampToValueAtTime(0, t + HALF * 0.85);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(t);
    osc.stop(t + HALF);
  });

  return loopDuration;
}

/* ─────────────────────────────────────────────────────────────
   HOOK
───────────────────────────────────────────────────────────── */
export function useGameAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const musicRunningRef = useRef(false);

  // Lazy-init AudioContext on first user gesture
  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
      const master = ctxRef.current.createGain();
      master.gain.value = 1;
      master.connect(ctxRef.current.destination);
      masterRef.current = master;
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const startMusic = useCallback(() => {
    if (musicRunningRef.current) return;
    musicRunningRef.current = true;

    const ctx = getCtx();
    const master = masterRef.current!;

    // Fade in
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.5);

    let nextStart = ctx.currentTime + 0.1;

    function scheduleLoop() {
      if (!musicRunningRef.current) return;
      const ctx2 = ctxRef.current!;
      const duration = scheduleMusicBar(ctx2, masterRef.current!, nextStart);
      nextStart += duration;
      // Re-schedule ~0.3s before the loop ends
      loopTimerRef.current = setTimeout(scheduleLoop, (duration - 0.3) * 1000);
    }

    scheduleLoop();
  }, [getCtx]);

  const stopMusic = useCallback(() => {
    musicRunningRef.current = false;
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setValueAtTime(
        masterRef.current.gain.value,
        ctxRef.current.currentTime
      );
      masterRef.current.gain.linearRampToValueAtTime(
        0,
        ctxRef.current.currentTime + 0.5
      );
    }
  }, []);

  const soundExplosion = useCallback(() => {
    playExplosion(getCtx());
  }, [getCtx]);

  const soundMagic = useCallback(() => {
    playMagic(getCtx());
  }, [getCtx]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      musicRunningRef.current = false;
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
      ctxRef.current?.close();
    };
  }, []);

  return { startMusic, stopMusic, soundExplosion, soundMagic };
}
