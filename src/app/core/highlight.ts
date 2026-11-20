export interface HighlightToken {
  text: string;
  highlight: boolean;
  space: boolean;
}

/** Separa el texto en palabras y espacios; lo encerrado entre `*` se marca como resaltado. */
export function highlightTokens(text: string): HighlightToken[] {
  return text.split(/(\*[^*]+\*)/).flatMap((segment) => {
    const highlight = segment.startsWith('*') && segment.endsWith('*');
    return (highlight ? segment.slice(1, -1) : segment)
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part) => ({ text: part, highlight, space: !part.trim() }));
  });
}
