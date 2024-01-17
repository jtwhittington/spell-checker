"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileSpellChecker_1 = require("./FileSpellChecker");
if (process.argv[2] && process.argv[3]) {
    const dictionaryFile = process.argv[2];
    const fileToCheck = process.argv[3];
    const corrections = new FileSpellChecker_1.FileSpellChecker(dictionaryFile, fileToCheck).checkFile();
    corrections.forEach((correction) => {
        console.log(`"${correction.word}" is misspelled on line ${correction.lineNumber} column ${correction.columnNumber}`);
        console.log(`Context: ${correction.context}`);
        console.log(`Suggestions: ${correction.suggestions.join(", ")}`);
        console.log();
    });
}
else {
    console.log("Please include two arguments, the path to the dictionary file and the path to the file to check.");
}
