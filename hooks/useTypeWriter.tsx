import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  phrases: string[];
  typingSpeed?: number;   
  deletingSpeed?: number; 
  pauseAfter?: number;    
  pauseBefore?: number;   
}

export function useTypewriter({
  phrases,
  typingSpeed = 25,
  deletingSpeed = 50,
  pauseAfter = 1200,
  pauseBefore = 400,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false); // true after first phrase completes

  const state = useRef({
    phraseIdx: 0,
    charIdx: 0,
    isDeleting: false,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const { phraseIdx, charIdx, isDeleting } = state.current;
      const phrase = phrases[phraseIdx];

      if (!isDeleting) {
        const next = charIdx + 1;
        state.current.charIdx = next;
        setDisplayed(phrase.slice(0, next));

        if (next === phrase.length) {
          setIsDone(true);
          state.current.isDeleting = true;
          timer = setTimeout(tick, pauseAfter);
        } else {
          timer = setTimeout(tick, typingSpeed);
        }
      } else {
        const next = charIdx - 1;
        state.current.charIdx = next;
        setDisplayed(phrase.slice(0, next));

        if (next === 0) {
          state.current.isDeleting = false;
          state.current.phraseIdx = (phraseIdx + 1) % phrases.length;
          timer = setTimeout(tick, pauseBefore);
        } else {
          timer = setTimeout(tick, deletingSpeed);
        }
      }
    }

    timer = setTimeout(tick, pauseBefore);
    return () => clearTimeout(timer);
  }, [phrases, typingSpeed, deletingSpeed, pauseAfter, pauseBefore]);

  return { displayed, isDone };
}