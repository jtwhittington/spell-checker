"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
class Trie {
    constructor() {
        this.root = {};
    }
    /**
     * Inserts a word into the trie.
     * @param word The word to insert.
     */
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node[char]) {
                node[char] = {};
            }
            node = node[char];
        }
        node.isWord = true;
    }
    /**
     * Returns {@link TrieNode} if the word is in the trie, otherwise null.
     * @param string The word to search for.
     */
    find(string) {
        let node = this.root;
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            if (!node[char]) {
                return null;
            }
            node = node[char];
        }
        return node;
    }
    /**
     * Returns true if the word is in the trie, otherwise false.
     * @param word The word to search for.
     */
    has(word) {
        const node = this.find(word);
        return (node === null || node === void 0 ? void 0 : node.isWord) === true;
    }
    /**
     * Find all words with given prefix
     * @param prefix The prefix to search for
     */
    withPrefix(prefix) {
        const node = this.find(prefix);
        if (!node) {
            return [];
        }
        const words = [];
        const traverse = (node, word) => {
            if (node.isWord) {
                words.push(word);
            }
            for (const char in node) {
                traverse(node[char], word + char);
            }
        };
        traverse(node, prefix);
        return words;
    }
    /**
     * Find all words with given prefix, up to a certain limit of added letters
     * @param prefix The prefix to search for
     * @param limit The maximum number of letters to add to the prefix
     */
    withPrefixAndLimit(prefix, limit) {
        const node = this.find(prefix);
        if (!node) {
            return [];
        }
        const words = [];
        const traverse = (node, word, depth) => {
            if (node.isWord) {
                words.push(word);
            }
            if (depth < limit) {
                for (const char in node) {
                    traverse(node[char], word + char, depth + 1);
                }
            }
        };
        traverse(node, prefix, 0);
        return words;
    }
}
exports.Trie = Trie;
