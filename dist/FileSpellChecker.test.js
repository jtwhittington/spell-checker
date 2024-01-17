"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileSpellChecker_1 = require("./FileSpellChecker");
describe("FileSpellChecker", () => {
    it("accepts a dictionary file and file to check and logs any misspelled words", () => {
        const dictionary = "../fixtures/dictionary.txt";
        const fileToCheck = "../fixtures/Small document.txt";
        const checker = new FileSpellChecker_1.FileSpellChecker(dictionary, fileToCheck);
        expect(checker.checkFile()).toMatchSnapshot();
    });
});
