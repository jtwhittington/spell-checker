"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Trie_1 = require("./Trie");
describe("Trie", () => {
    const words = [
        "a",
        "apple",
        "app",
        "apricot",
        "banana",
        "ban",
        "bandana",
        "band",
        "cat",
        "cats",
        "dog",
        "dogs",
        "d",
        "do",
        "dot",
        "dots",
    ];
    let trie;
    beforeAll(() => {
        trie = new Trie_1.Trie();
        words.forEach((word) => trie.insert(word));
    });
    describe("insert", () => {
        it("can insert a list of words", () => {
            expect(trie).toMatchSnapshot();
        });
        it("can insert another word", () => {
            expect(trie.has("bandit")).toBe(false);
            trie.insert("bandit");
            expect(trie.has("bandit")).toBe(true);
        });
        it("doesnt insert duplicate words", () => {
            const before = Object.assign({}, trie);
            trie.insert("apple");
            expect(trie).toEqual(before);
        });
    });
    describe("find", () => {
        it("can find prefix of a word from the list", () => {
            expect(trie.find("banda")).toEqual({
                n: {
                    a: {
                        isWord: true,
                    },
                },
            });
        });
        it("can find prefix with multiple word matches", () => {
            expect(trie.find("do")).toEqual({
                isWord: true,
                g: {
                    isWord: true,
                    s: {
                        isWord: true,
                    },
                },
                t: {
                    isWord: true,
                    s: {
                        isWord: true,
                    },
                },
            });
        });
    });
    describe("has", () => {
        it("returns true if the word is in the trie", () => {
            expect(trie.has("band")).toBe(true);
        });
        it("returns false if the word is not in the trie", () => {
            expect(trie.has("frog")).toBe(false);
        });
    });
    describe("withPrefix", () => {
        it("returns all words with the given prefix", () => {
            expect(trie.withPrefix("do")).toEqual([
                "do",
                "dog",
                "dogs",
                "dot",
                "dots",
            ]);
        });
    });
    describe("withPrefixAndLimit", () => {
        it("returns all words with the given prefix adding letters up to the limit", () => {
            expect(trie.withPrefixAndLimit("do", 1)).toEqual(["do", "dog", "dot"]);
        });
    });
});
