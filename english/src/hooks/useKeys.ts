import { useEffect, type RefObject } from 'react';

// Global keyboard shortcuts for an exercise. Enter always works, digits only when the
// focus is not inside a text input.
export function useKeys(handlers: { enter?: () => void; digit?: (n: number) => void; escape?: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inInput = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (e.key === 'Enter') {
        if (e.isComposing) return;
        if (target && target.tagName === 'BUTTON' && !inInput) return;
        if (target && (target.tagName === 'SELECT' || target.tagName === 'SUMMARY' || target.tagName === 'A')) return;
        if (handlers.enter) {
          e.preventDefault();
          handlers.enter();
        }
        return;
      }
      if (e.key === 'Escape' && handlers.escape) {
        handlers.escape();
        return;
      }
      if (!inInput && handlers.digit && /^[1-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        handlers.digit(Number(e.key));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlers]);
}

// Focuses the input after each new item, but only on devices with a physical keyboard so the
// virtual keyboard does not pop up uninvited on phones.
export function useAutoFocus(ref: RefObject<HTMLInputElement | null>, deps: unknown[]) {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const t = setTimeout(() => ref.current?.focus(), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// On touch devices, drop focus from the text field before the page changes state. iOS Safari
// can leave a focused input in a stuck state (taps stop registering) when it becomes read-only
// or disappears while the keyboard is open.
export function blurOnTouch() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const el = document.activeElement as HTMLElement | null;
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) el.blur();
}
