import { loadJSON, saveJSON } from './storage';

// Known male English voices, in order of preference. Matched case-insensitively as substrings.
const PREFERRED = [
  'Daniel',
  'Alex',
  'Fred',
  'Aaron',
  'Arthur',
  'Google UK English Male',
  'Microsoft Guy',
  'Microsoft David',
  'Microsoft Ryan',
  'Microsoft Mark',
  'Microsoft George',
  'Oliver',
  'Rishi',
  'Reed',
  'Rocko',
  'Eddy',
  'Gordon',
  'Tom',
  'James',
  'Bruce',
  'Lee',
];

let chosen: SpeechSynthesisVoice | null = null;
let ready: Promise<SpeechSynthesisVoice | null> | null = null;

function isEnglish(v: SpeechSynthesisVoice) {
  return /^en[-_]/i.test(v.lang) || v.lang.toLowerCase() === 'en';
}

function pick(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const english = voices.filter(isEnglish);
  if (english.length === 0) return null;
  const stored = loadJSON<string | null>('voice', null);
  if (stored) {
    const v = english.find((x) => x.name === stored);
    if (v) return v;
  }
  for (const pref of PREFERRED) {
    const v = english.find((x) => x.name.toLowerCase().includes(pref.toLowerCase()));
    if (v) return v;
  }
  return (
    english.find((x) => /en[-_]US/i.test(x.lang)) ??
    english.find((x) => /en[-_]GB/i.test(x.lang)) ??
    english[0]
  );
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const now = synth.getVoices();
    if (now.length > 0) return resolve(now);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve(synth.getVoices());
    };
    synth.addEventListener('voiceschanged', finish, { once: true });
    // Safari sometimes never fires voiceschanged, so poll briefly as a backup.
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (synth.getVoices().length > 0 || tries > 20) {
        clearInterval(timer);
        finish();
      }
    }, 150);
  });
}

export function getVoice(): Promise<SpeechSynthesisVoice | null> {
  if (chosen) return Promise.resolve(chosen);
  if (!ready) {
    ready = loadVoices().then((voices) => {
      chosen = pick(voices);
      if (chosen) saveJSON('voice', chosen.name);
      return chosen;
    });
  }
  return ready;
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export async function speak(text: string): Promise<void> {
  if (!speechSupported()) return;
  const clean = text.replace(/[_]+/g, '').replace(/\s+/g, ' ').trim();
  if (!clean) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const voice = await getVoice();
  const u = new SpeechSynthesisUtterance(clean);
  if (voice) {
    u.voice = voice;
    u.lang = voice.lang;
  } else {
    u.lang = 'en-US';
  }
  u.rate = 0.92;
  u.pitch = 1;
  synth.speak(u);
}

// Warm up voice loading on first user interaction so the first tap does not lag.
export function primeVoices(): void {
  if (!speechSupported()) return;
  void getVoice();
}
