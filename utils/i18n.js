const { extname, basename, join } = require('path');
const { readdirSync, readFileSync } = require('fs');

const i18n = {
  version: '0.1',
};

module.exports = function (message, params) {

};

module.exports.setOptions = function ({ locales, directory }) {
  i18n.locales = readdirSync(directory).reduce((result, filename) => {
    const ext = extname(filename);
    const locale = basename(filename, ext);
    if (locales.includes(locale)) {
      result[locale] = readFileSync(join(directory, filename));
    }
    return result;
  }, {});

};