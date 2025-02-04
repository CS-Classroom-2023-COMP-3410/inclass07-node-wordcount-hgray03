// TODO: Import required modules
// Hint: You will need the 'fs' module for reading the file and the 'chalk' library for coloring the words.

const fs = require('fs');
const chalk = require('chalk');

// Force Chalk to use a consistent ANSI color level
chalk.level = 1; // Ensures colors are applied consistently


/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    // TODO: Use the 'fs' module to synchronously read the content of 'declaration.txt' and return it.
    return fs.readFileSync('declaration.txt', 'utf8');
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    // TODO: Implement a function to count occurrences of each word in the content.
    // Hint: Consider splitting the content into words and then tallying the counts.
    const wordCount = {};
    const words = content.toLowerCase().split(/\W+/).filter(Boolean); // Splitting by non-word characters.

    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (!word.trim()) return word; // Prevent empty spaces from being colorized

    if (count === 1) {
        return chalk.blue(word);
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}
/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const words = line.split(/\W+/).filter(Boolean); // Extract words, removing extra empty entries
        const coloredLine = words.map(word => colorWord(word, wordCount[word.toLowerCase()] || 0)).join(' ') + ' '; // Ensure trailing space

        console.log(coloredLine); // Print with correct formatting
    }
}



/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// TODO: Export the functions for testing
// Hint: You can use the 'module.exports' syntax.

module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines
};