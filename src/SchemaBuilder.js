'use strict';

const Util = require('./Util');

const defaultOptions = { detectDateType: true, snakeToCamel: true, excludeFromKeys: [] };

module.exports = class SchemaBuilder {
  constructor(data, options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.schema = this._patch(data);
  }

  _patch(data) {
    if (!data || !Util.isObject(data)) throw new TypeError('Data should be an object');
    const formattedData = Util.formatObject(data, this.options);
    const entries = Object.entries(formattedData).map(([key, val]) => {
      // Is Date
      if (this.options.detectDateType) {
        const date = new Date(val);
        const isValidDate = typeof val === 'string' && date.toString() !== 'Invalid Date';
        if (isValidDate) val = { type: 'date' };
      }

      if (Util.isObject(val) && typeof val?.type !== 'string') val = this._patch(val);
      else if (!val?.type) val = { type: typeof val };

      return [key, val];
    });

    return Object.fromEntries(entries);
  }

  toJSON() {
    return this.schema;
  }
};
