"use client";

import confetti from "canvas-confetti";

export function useConfetti() {
  const fireConfetti = () => {
    // Gold and green confetti to match brand
    const goldColors = ["#C4A15F", "#D4B16F", "#B8956A", "#E8C97D"];
    const greenColors = ["#5B9A8B", "#6BA89A", "#4A8A7B"];
    const colors = [...goldColors, ...greenColors, "#FFFFFF"];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: goldColors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: greenColors,
      });
    }, 150);
  };

  return { fireConfetti };
}
