"use client";
import { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  eraseSpeed?: number;
  delay?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  eraseSpeed = 50,
  delay = 2000,
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, eraseSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentText) {
      setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, eraseSpeed, delay]);

  return (
    <h1 className="text-3xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
      {displayText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};
