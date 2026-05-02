import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });

    const over = (e) => {
      if (e.target.closest("a, button, input, textarea, select")) setHovered(true);
    };

    const out = () => setHovered(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`cursor-ring ${hovered ? "hovered" : ""}`}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
      <motion.div
        className="cursor-dot"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 700, damping: 35 }}
      />
    </>
  );
}