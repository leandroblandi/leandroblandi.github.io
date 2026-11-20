import { highlightTokens } from './highlight';

describe('highlightTokens', () => {
  it('marks words between asterisks and keeps punctuation attached', () => {
    const tokens = highlightTokens('Uso *Spring Framework*. Y *AWS*');
    expect(tokens.map((t) => t.text).join('')).toBe('Uso Spring Framework. Y AWS');
    expect(tokens.filter((t) => t.highlight && !t.space).map((t) => t.text)).toEqual([
      'Spring',
      'Framework',
      'AWS',
    ]);
    expect(tokens.find((t) => t.text === '.')?.highlight).toBe(false);
  });

  it('supports highlighting single characters inside a word', () => {
    const tokens = highlightTokens('*¿*Hablamos*?*');
    expect(tokens).toEqual([
      { text: '¿', highlight: true, space: false },
      { text: 'Hablamos', highlight: false, space: false },
      { text: '?', highlight: true, space: false },
    ]);
  });
});
