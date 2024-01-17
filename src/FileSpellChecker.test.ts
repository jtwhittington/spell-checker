import { FileSpellChecker } from "./FileSpellChecker";

describe("FileSpellChecker", () => {
  it("accepts a dictionary file and file to check and logs any misspelled words", () => {
    const dictionary = "../fixtures/dictionary.txt";
    const fileToCheck = "../fixtures/Small document.txt";

    const checker = new FileSpellChecker(dictionary, fileToCheck);
    expect(checker.checkFile()).toMatchSnapshot();
  });
});
