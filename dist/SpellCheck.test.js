"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const SpellCheck_1 = require("./SpellCheck");
const Trie_1 = require("./Trie");
describe("SpellCheck", () => {
    const listToCheck = [
        [
            "abatez",
            [
                "abate",
                "abated",
                "abater",
                "abates",
                "abaters",
                "abating",
                "abatis",
                "abator",
                "abators",
                "abattis",
            ],
        ],
        ["zygotez", ["zygote", "zygotes", "zygotene", "zygotic"]],
    ];
    let trie = new Trie_1.Trie();
    beforeAll(() => {
        const contents = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../fixtures/dictionary.txt"), "utf-8");
        const wordList = contents.split(/\r?\n/);
        wordList.forEach((word) => trie.insert(word));
    });
    listToCheck.forEach(([word, suggestions]) => {
        it(`returns a list of suggestions for ${word}`, () => {
            const spellCheck = new SpellCheck_1.SpellCheck(trie, word);
            expect(spellCheck.generateSuggestions()).toEqual(suggestions);
        });
    });
});
