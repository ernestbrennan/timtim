import { useRef, useState, useEffect } from 'react';

export default function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = (e) => {
    const node = ref.current;
    if (!node) return setValue(false);
    setValue(e.target === node || node.contains(e.target));
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const doc = node.ownerDocument;
      if ('ontouchstart' in doc.documentElement) {
        return () => null;
      }
      doc.addEventListener('mouseover', handleMouseOver);
      return () => {
        doc.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, []);

  return [ref, value];
}
