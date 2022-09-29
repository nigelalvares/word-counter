const { program } = require('commander');
const { count } = require('./counter');

program
  .requiredOption('--path <string>', 'fully qualified path of the file eg. C:\\input.txt')
  .option('--no-case-sensitivity', 'optional parameter to disable case sensitivity eg. [HelLO] and [hello] will be treated as same words')
  .option('--debug', 'debugging mode enabled')
  .parse(process.argv);

const options = program.opts();
const output = count(options.path, options.caseSensitivity, options.debug);
output.forEach((obj) => console.log(`${obj.word}: ${obj.count}`));
