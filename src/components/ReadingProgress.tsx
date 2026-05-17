import { useEffect, useState } from 'react';

/** Gold 2px reading progress bar for blog posts (Accessible Dark Authority). */
export function ReadingProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const height = doc.scrollHeight - doc.clientHeight;
      setScale(height > 0 ? Math.min(1, scrollTop / height) : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ transform: `scaleX(${scale})` }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(scale * 100)}
      aria-label="Reading progress"
    />
  );
}
