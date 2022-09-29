const { readFileSync } = require('fs');

function count(path, caseSensitivity, debug) {
  let file;
  try {
    file = readFileSync(path, { encoding: 'utf-8' });
  } catch (e) {
    if (e.message.includes('no such file or directory')) {
      throw new Error(`Path '${path}' does not exist`);
    }
    throw new Error(e);
  }

  let splitInputText = file.split(/\W+/).filter((word) => word.length > 0);
  if (debug) console.debug('input file after splitting ', splitInputText);

  if (!caseSensitivity) {
    splitInputText = splitInputText.map((word) => word.toLowerCase());
    if (debug) console.debug('input file after splitting and transforming to lowercase', splitInputText);
  }

  const output = [];
  splitInputText.forEach((word) => {
    const existingObj = output.find((obj) => obj.word === word);
    if (existingObj) {
      existingObj.count += 1;
    } else {
      output.push({ word, count: 1 });
    }
  });
  if (debug) console.debug('unsorted words in output ', output);

  output.sort((a, b) => b.count - a.count);

  return output;
}

module.exports = { count };
