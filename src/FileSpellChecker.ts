import { readFileSync } from "fs";
import { join } from "path";
import { SpellCheck } from "./SpellCheck";
import { Trie } from "./Trie";
import { SpellingCorrection } from "./types";

export class FileSpellChecker {
  dictionaryTrie: Trie;
  fileToCheck: string;

  constructor(dictionaryFile: string, fileToCheck: string) {
    this.dictionaryTrie = new Trie();
    const contents = readFileSync(join(__dirname, dictionaryFile), "utf-8");

    const wordList = contents.split(/\r?\n/);
    wordList.forEach((word) => this.dictionaryTrie.insert(word));
    this.fileToCheck = fileToCheck;
  }

  checkFile() {
    const misspellings: Array<SpellingCorrection> = [];

    const fileBuffer = readFileSync(join(__dirname, this.fileToCheck), "utf-8");
    const lines = fileBuffer.split(/\r?\n/);
    let prevEndOfSentence = false;
    const sentenceDelimiters = [".", "!", "?"];

    lines.forEach((line, lineNumber) => {
      lineNumber += 1;
      let columnNumber = 0;
      const words = line.split(" ");
      words.forEach((word, wordIndex) => {
        columnNumber += word.length;
        if (word === "") {
          return;
        }

        // if the word is capitalized and previous word was not the end of a sentence, then it's probably a proper noun
        const properNoun =
          word[0] === word[0].toUpperCase() && !prevEndOfSentence;

        // Remove punctuation
        const cleanedWord = word.replace(/\W/g, "");

        // Very naive detection of proper nouns
        const [isCorrect, suggestions] = properNoun
          ? [true, []]
          : new SpellCheck(this.dictionaryTrie, cleanedWord).check();

        prevEndOfSentence = sentenceDelimiters.includes(word[word.length - 1]);

        // get context 2 words before and after
        const context = words
          .slice(Math.max(wordIndex - 2, 0), wordIndex + 3)
          .join(" ");

        if (!isCorrect) {
          misspellings.push({
            word: cleanedWord,
            suggestions,
            context,
            lineNumber,
            columnNumber,
          });
        }
      });
    });
    return misspellings;
  }
}
