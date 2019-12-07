const fs = require('fs');
const path = require('path');

const defaultExclude = 'index(\\.{,3})?';
const fileNameRegexp = '[\\w-\\d]+';

module.exports = class ImportAllPlugin {
  constructor(dirPath, exclude = defaultExclude) {
    this.dirPath = dirPath;
    this.exclude = exclude;
  }

  verify() {
    return Array.isArray(this.exclude)
      ? !this.exclude.includes
      : value => !new RegExp(this.exclude, 'gi').test(value);
  }

  apply(compiler) {
    const dirPath = fs.readdirSync(this.dirPath);

    const newEntries = dirPath
      .map(fileName => path.resolve(this.dirPath, fileName))
      .filter(value => {
        return this.verify(value);
      });

    compiler.options.entry = newEntries.reduce(
      (acc, value, ind) => {
        const name = value
          .match(new RegExp(`${fileNameRegexp}\.\\w+$`))[0]
          .match(new RegExp(fileNameRegexp))[0];

        return Object.assign(acc, { [name || ind]: value });
      },
      { main: compiler.options.entry }
    );
  }
};
