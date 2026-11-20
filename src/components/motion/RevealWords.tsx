import { Fragment } from "react";

/** Título que aparece palabra por palabra, subiendo desde una máscara. Los lectores de pantalla leen el texto completo. */
const RevealWords = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span data-reveal="words" aria-hidden="true" className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="reveal-word">
              <span style={{ ["--i" as string]: i }}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </>
  );
};

export default RevealWords;
