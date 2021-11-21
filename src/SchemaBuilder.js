'use strict';

const defaultOptions = { detectDateType: true };

module.exports = class SchemaBuilder {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.currentSettings = {};
  }

  parseData(data) {
    // TODO
    return data;
  }

  toJSON() {
    // TODO
    return null;
  }
};
