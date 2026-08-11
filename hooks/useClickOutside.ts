// hooks/useClickOutside.ts
"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseClickOutsideOptions {
  onOutsideClick?: () => void;
  onEscape?: () => void;
  onEnter?: () => void;
  enabled?: boolean;
}

export function useClickOutside<T extends HTMLElement = HTMLDivElement>({
  onOutsideClick,
  onEscape,
  onEnter,
  enabled = true,
}: UseClickOutsideOptions = {}) {
  const ref = useRef<T>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClick?.();
      }
    },
    [onOutsideClick]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape?.();
      } else if (e.key === "Enter") {
        onEnter?.();
      }
    },
    [onEscape, onEnter]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleOutsideClick, handleKeyDown]);

  return ref;
}