document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const trigger = nav ? nav.querySelector(".hamburger") : null;
  const links = nav ? nav.querySelector(".nav-links") : null;

  if (!nav || !trigger || !links) return;

  trigger.setAttribute("role", "button");
  trigger.setAttribute("tabindex", "0");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-label", "Toggle navigation menu");

  const closeMenu = () => {
    nav.classList.remove("nav-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle("nav-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  };

  trigger.addEventListener("click", toggleMenu);
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const isResumeTerminal = document.body.classList.contains("resume-terminal-mode");
  if (!isResumeTerminal) return;

  const gate = document.getElementById("resume-audio-gate");
  const button = document.getElementById("resume-audio-toggle");
  if (!gate || !button) return;

  const gateLabel = gate.querySelector("span");
  let audioContext = null;
  let masterGain = null;
  let carrierOsc = null;
  let carrierGain = null;
  let carrierLfo = null;
  let carrierLfoGain = null;
  let noiseBuffer = null;
  let handshakeInterval = null;
  let handshakeStopTimer = null;
  let bootPlayed = false;

  const setGateState = (label, buttonText, isOn) => {
    gateLabel.textContent = label;
    button.textContent = buttonText;
    gate.classList.toggle("is-on", Boolean(isOn));
  };

  const makeNoiseBuffer = (ctx) => {
    const length = Math.floor(ctx.sampleRate * 0.5);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    return buffer;
  };

  const scheduleTone = (ctx, when, fromHz, toHz, duration, volume) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(fromHz, when);
    osc.frequency.exponentialRampToValueAtTime(toHz, when + duration);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(volume, when + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(when);
    osc.stop(when + duration + 0.02);
  };

  const playNoiseBurst = (ctx, when, duration, volume) => {
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = noiseBuffer;
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900 + Math.random() * 2100, when);
    filter.Q.setValueAtTime(6, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(volume, when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start(when);
    source.stop(when + duration + 0.03);
  };

  const startCarrier = (ctx) => {
    if (carrierOsc) return;
    carrierOsc = ctx.createOscillator();
    carrierGain = ctx.createGain();
    carrierLfo = ctx.createOscillator();
    carrierLfoGain = ctx.createGain();

    carrierOsc.type = "sine";
    carrierOsc.frequency.value = 207;
    carrierGain.gain.value = 0.04;
    carrierLfo.type = "sine";
    carrierLfo.frequency.value = 0.42;
    carrierLfoGain.gain.value = 11;

    carrierLfo.connect(carrierLfoGain);
    carrierLfoGain.connect(carrierOsc.frequency);
    carrierOsc.connect(carrierGain);
    carrierGain.connect(masterGain);
    carrierOsc.start();
    carrierLfo.start();
  };

  const runHandshake = () => {
    const ctx = audioContext;
    const startAt = ctx.currentTime + 0.1;
    const toneMap = [
      [0.00, 420, 860, 0.22, 0.14],
      [0.33, 860, 510, 0.24, 0.16],
      [0.70, 510, 1240, 0.2, 0.14],
      [1.05, 980, 320, 0.26, 0.18],
      [1.50, 700, 1470, 0.23, 0.15],
      [1.95, 360, 970, 0.28, 0.17],
      [2.40, 1220, 540, 0.24, 0.15],
      [2.84, 470, 1320, 0.27, 0.17],
      [3.34, 1330, 380, 0.2, 0.14],
      [3.72, 900, 290, 0.35, 0.2]
    ];
    toneMap.forEach(([offset, fromHz, toHz, duration, vol]) => {
      scheduleTone(ctx, startAt + offset, fromHz, toHz, duration, vol);
    });

    let elapsed = 0;
    handshakeInterval = window.setInterval(() => {
      elapsed += 240;
      const at = ctx.currentTime + 0.02;
      playNoiseBurst(ctx, at, 0.08 + Math.random() * 0.09, 0.05 + Math.random() * 0.03);
      if (Math.random() > 0.68) {
        scheduleTone(ctx, at + 0.03, 560 + Math.random() * 560, 300 + Math.random() * 360, 0.09, 0.09);
      }
      if (elapsed > 7200) {
        window.clearInterval(handshakeInterval);
        handshakeInterval = null;
      }
    }, 240);

    handshakeStopTimer = window.setTimeout(() => {
      if (handshakeInterval) {
        window.clearInterval(handshakeInterval);
        handshakeInterval = null;
      }
      startCarrier(ctx);
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setTargetAtTime(0.11, ctx.currentTime, 0.45);
    }, 7800);
  };

  const ensureAudio = async () => {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      throw new Error("Web Audio API unavailable");
    }
    if (!audioContext) {
      audioContext = new AudioContextCtor();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.0001;
      masterGain.connect(audioContext.destination);
      noiseBuffer = makeNoiseBuffer(audioContext);
    }
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
  };

  const startAudio = async () => {
    try {
      await ensureAudio();
      setGateState("AUDIO CHANNEL: OPEN", "MUTE AUDIO", true);
      if (!bootPlayed) {
        bootPlayed = true;
        masterGain.gain.cancelScheduledValues(audioContext.currentTime);
        masterGain.gain.setTargetAtTime(0.23, audioContext.currentTime, 0.2);
        runHandshake();
      } else {
        startCarrier(audioContext);
        masterGain.gain.cancelScheduledValues(audioContext.currentTime);
        masterGain.gain.setTargetAtTime(0.11, audioContext.currentTime, 0.25);
      }
    } catch (error) {
      setGateState("AUDIO CHANNEL: BLOCKED", "RETRY AUDIO", false);
    }
  };

  const muteAudio = async () => {
    if (!audioContext) return;
    if (handshakeInterval) {
      window.clearInterval(handshakeInterval);
      handshakeInterval = null;
    }
    if (handshakeStopTimer) {
      window.clearTimeout(handshakeStopTimer);
      handshakeStopTimer = null;
    }
    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.08);
    await audioContext.suspend();
    setGateState("AUDIO CHANNEL: MUTED", "UNMUTE AUDIO", false);
  };

  button.addEventListener("click", async () => {
    if (!audioContext || audioContext.state !== "running") {
      await startAudio();
      return;
    }
    await muteAudio();
  });

  const startOnFirstGesture = async () => {
    if (!audioContext || audioContext.state !== "running") {
      await startAudio();
    }
  };

  window.addEventListener("pointerdown", startOnFirstGesture, { once: true });
  window.addEventListener("keydown", startOnFirstGesture, { once: true });

  setGateState("AUDIO CHANNEL: CLOSED", "CONNECT AUDIO", false);
});
