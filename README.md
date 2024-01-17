# Make a Spell Checker!

## Given Problem:

Write a program that checks spelling. The input to the program is a dictionary file containing a list of valid words and a file containing the text to be checked.
You can use the `dictionary.txt` file included here as your dictionary.

The program should run on the command line like so:

```sh
my-cool-spellchecker dictionary.txt file-to-check.txt
# output here
```

### The Features

Your program should support the following features (time permitting) (2-4 hours):

- The program outputs a list of incorrectly spelled words.
- For each misspelled word, the program outputs a list of suggested words.
- The program includes the line and column number of the misspelled word
- The program prints the misspelled word along with some surrounding context.
- The program handles proper nouns (person or place names, for example) correctly.

## Notes on solution:

To run, simply run the script: `./script/my-cool-spellchecker`. It accepts 0, 1, or 2 arguments, read notes in the file for details. Requires node to be installed, not 100%, but pretty sure most any node versions will suffice.

Before starting I spent a few minutes googling, and quickly found the [trie](https://en.wikipedia.org/wiki/Trie) structure as a possible option as a good data structure for building a spell-checker. Having done a number of other algorithms with trees, this seemed like a good place to start.

The project is written in Typescript, tested with jest, and compiled to the dist/ directory.
I started by writing a simple Trie class which could insert words find the last node of a string (prefix or word), and determine if the trie had a specific word. I then wrote a small class to spell check a single word using a given trie, and then one that would make use of that to check a file full of words.

By this point, I could check for misspelled words and am pretty sure the algorithm both to add words and check for words is fast, while not taking up a ton of space (the trie structure removes a lot of duplication caused from common prefixes). I thought a bit about suggestions - normally I would get either some test cases or more thorough requirements for this type of feature. Without that, I decided to begin a few proof-of-concepts, I tried making a single edit to words, making 2 edits, and also finding all the words that shared a prefix with the misspelled word.

Prefixes helped me to fill in some suggestions I thought should be included that a single edit didn't get; I picked an arbitrary place to lock down the prefix generation, and removed finding suggestions based on 2 edits (this I saw a noticeable slowdown which makes sense being n^2). The suggestion mechinism could certainly be more robust, however by this point I was relatively happy and beginning to run low on time. Perhaps there is a data-structure more conducive to finding suggestions quickly which I would want to research before diving deeper into optimizing (as well as trying to lock down some requirements).

By this point I basically had the program, I just had the final bullet point, which I had forgot about until now. Thinking about it I couldn't think any great solutions to proper nouns that weren't in the dictionary already, so I threw in a basic catch where a capitalized word not at the beginning of the sentence would be considered a proper noun and left alone.

I wrote a quick script, built the project with tsc and gave it a run. And am now going to push it up.

My final thoughts - overall this seems to work pretty well and is relatively fast. In a real-life situation this would require more questions before tackling it, and then likely a day of research - there are probably better algorithms (from what I know I'm sure spell checking has been a big area of CS research over the past 40 years). If though this was a request for an app to put spell checking into a context menu for example, researching either the best way to solve this, or possible a library would be a good option. It would be a very simple thing to build design for and then iterate/trial a few different solutions with very little change between each.
