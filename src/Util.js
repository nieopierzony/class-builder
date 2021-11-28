'use strict';

module.exports = class Util extends null {
  static isObject(obj) {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
  }

  static snakeToCamel(str) {
    return str
      .split('_')
      .map((word, i) => (i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`))
      .join('');
  }

  static formatObject(obj, options = {}) {
    if (!this.isObject(obj)) throw new TypeError('Provided object should be that type accordingly');
    const entries = Object.entries(obj).map(([key, val]) => {
      const { excludeFromKeys = [], snakeToCamel } = options;

      // Exclude bad words from key
      const badWordsRegex = new RegExp(excludeFromKeys.join('|'), 'g');
      key = key.replaceAll(badWordsRegex, '');

      // Snake to camel case
      if (snakeToCamel) key = Util.snakeToCamel(key);

      if (this.isObject(val)) val = this.formatObject(val, options);

      return [key, val];
    });

    return Object.fromEntries(entries);
  }

  static parseClassData(instance, schema, data, options = {}) {
    // TODO: It's possible to have dupblicate keys after converting snake case to camel
    const formattedData = this.formatObject(data, options);
    for (const [key, val] of Object.entries(formattedData)) {
      if (!schema[key]) continue;

      // If value is date
      if (schema[key].type === 'date') {
        const defaultValue =
          schema[key]?.defaultValue instanceof Date
            ? schema[key].defaultValue
            : schema[key].defaultValue && new Date(schema[key].defaultValue);
        instance[key] = ['string', 'number'].includes(typeof val) ? new Date(val) : defaultValue;
        continue;
      }

      // TODO: Check object properties recursive
      if (typeof val === schema[key].type) instance[key] = val;
    }
  }
};
