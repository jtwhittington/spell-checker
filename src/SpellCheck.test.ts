import { readFileSync } from "fs";
import { join } from "path";
import { SpellCheck } from "./SpellCheck";
import { Trie } from "./Trie";

describe("SpellCheck", () => {
  const listToCheck: Array<[string, Array<string>]> = [
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
  let trie = new Trie();

  beforeAll(() => {
    const contents = readFileSync(
      join(__dirname, "../fixtures/dictionary.txt"),
      "utf-8"
    );

    const wordList = contents.split(/\r?\n/);
    wordList.forEach((word) => trie.insert(word));
  });

  listToCheck.forEach(([word, suggestions]) => {
    it(`returns a list of suggestions for ${word}`, () => {
      const spellCheck = new SpellCheck(trie, word);
      expect(spellCheck.generateSuggestions()).toEqual(suggestions);
    });
  });
});
