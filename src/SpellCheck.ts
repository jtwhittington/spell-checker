import { Trie } from "./Trie";

export class SpellCheck {
  dictionaryTrie: Trie;
  word: string;

  constructor(dictionaryTrie: Trie, word: string) {
    this.dictionaryTrie = dictionaryTrie;
    this.word = word.toLowerCase();
  }

  /**
   * Returns a tuple: [boolean, string[]]
   * The first element is true if the word is spelled correctly, otherwise false.
   * The second element is a list of suggestions for the word.
   */
  check(): [boolean, Array<string>] {
    if (this.dictionaryTrie.has(this.word)) {
      return [true, []];
    } else {
      return [false, this.generateSuggestions()];
    }
  }

  /**
   * Returns a list of suggestions for the word.
   */
  generateSuggestions() {
    const edits = this.oneEditAway();
    const suggestions = edits.filter((word) => this.dictionaryTrie.has(word));
    return Array.from(new Set([...suggestions, ...this.prefixMatches()]));
  }

  /**
   * Returns a list of words that are one edit away from the word.
   */
  oneEditAway(word = this.word) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const splits = [];
    for (let i = 0; i < word.length; i++) {
      splits.push([word.slice(0, i), word.slice(i)]);
    }
    const deletes = splits.map(([a, b]) => a + b.slice(1));
    const transposes = splits.map(([a, b]) => a + b[1] + b[0] + b.slice(2));
    const replaces = splits
      .map(([a, b]) => alphabet.split("").map((c) => a + c + b.slice(1)))
      .flat();
    const inserts = splits
      .map(([a, b]) => alphabet.split("").map((c) => a + c + b))
      .flat();
    return [...deletes, ...transposes, ...replaces, ...inserts];
  }

  /**
   * Return any valid words that share the same prefix as the word.
   */
  prefixMatches() {
    const word = this.word;

    // Remove last two letters and return all valid words with that prefix
    const allowance = 2;
    const prefix = word.slice(0, word.length - allowance);
    return this.dictionaryTrie.withPrefixAndLimit(prefix, 3);
  }
}
