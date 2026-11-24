'use client';

import { useEffect } from 'react';

export default function ProductCardInteraction() {
  useEffect(() => {
    const handleCardInteraction = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest('.product-card, .catalog-card, .room-card');
      if (card) {
        document.querySelectorAll('.card-active').forEach((el) => {
          if (el !== card) el.classList.remove('card-active');
        });
        card.classList.add('card-active');
      } else {
        document.querySelectorAll('.card-active').forEach((el) => {
          el.classList.remove('card-active');
        });
      }
    };

    document.addEventListener('click', handleCardInteraction, { passive: true });
    document.addEventListener('touchstart', handleCardInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleCardInteraction);
      document.removeEventListener('touchstart', handleCardInteraction);
    };
  }, []);

  return null;
}
