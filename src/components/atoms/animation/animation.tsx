import React, { useState, useEffect } from "react";

interface AnimationProps {
  text: string;
  className?: string;
}

const Animation: React.FC<AnimationProps> = ({
  text,
  className = "typing-animation",
}) => {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = text;
      if (!isDeleting) {
        if (typedText === currentPhrase) {
          setIsDeleting(true);
          setTimeout(() => {
            setIsDeleting(false);
            setLoopNum((prevLoopNum) => (prevLoopNum + 1) % 2);
          }, 5000);
        } else {
          setTypedText((prevText) => {
            return currentPhrase.substring(0, prevText.length + 1);
          });
        }
      } else {
        if (typedText === "") {
          setIsDeleting(false);
          setLoopNum((prevLoopNum) => (prevLoopNum + 1) % 2);
        } else {
          setTypedText((prevText) => {
            return currentPhrase.substring(0, prevText.length - 1);
          });
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, 100);
    return () => clearTimeout(typingTimeout);
  }, [typedText, loopNum, isDeleting, text]);

  return (
    <div className="typing-animation-container">
      <h1 className={className}>{typedText}</h1>
    </div>
  );
};

export default Animation;
