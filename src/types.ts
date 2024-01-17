export interface TrieNode extends Record<string, TrieNode | true | undefined> {
  isWord?: true;
}

export interface SpellingCorrection {
  word: string;
  suggestions: Array<string>;
  context: string;
  lineNumber: number;
  columnNumber: number;
}
