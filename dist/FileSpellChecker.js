"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSpellChecker = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const SpellCheck_1 = require("./SpellCheck");
const Trie_1 = require("./Trie");
class FileSpellChecker {
    constructor(dictionaryFile, fileToCheck) {
        this.dictionaryTrie = new Trie_1.Trie();
        const contents = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, dictionaryFile), "utf-8");
        const wordList = contents.split(/\r?\n/);
        wordList.forEach((word) => this.dictionaryTrie.insert(word));
        this.fileToCheck = fileToCheck;
    }
    checkFile() {
        const misspellings = [];
        const fileBuffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, this.fileToCheck), "utf-8");
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
                const properNoun = word[0] === word[0].toUpperCase() && !prevEndOfSentence;
                // Remove punctuation
                const cleanedWord = word.replace(/\W/g, "");
                // Very naive detection of proper nouns
                const [isCorrect, suggestions] = properNoun
                    ? [true, []]
                    : new SpellCheck_1.SpellCheck(this.dictionaryTrie, cleanedWord).check();
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
exports.FileSpellChecker = FileSpellChecker;
