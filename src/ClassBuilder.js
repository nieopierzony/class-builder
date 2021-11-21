'use strict';

const defaultOptions = { snakeToCamel: false, excludeFromVarNames: [] };

module.exports = class ClassBuilder {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.currentSettings = {};
  }

  setName(name) {
    // TODO
    return this;
  }

  setSchema(schema = {}) {
    // TODO
    return this;
  }

  addGetter(key, fn) {
    // TODO
    return this;
  }

  build() {
    // TODO
    return null;
  }
};
