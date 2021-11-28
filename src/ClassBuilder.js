'use strict';

const SchemaBuilder = require('./SchemaBuilder');
const Util = require('./Util');

const defaultOptions = {};

const PureClass = schema =>
  class {
    constructor(data) {
      this._parse(data);
    }

    _parse(data) {
      Util.parseClassData(this, schema.toJSON(), data, schema.options);
    }

    toJSON() {
      return Object.fromEntries(Object.keys(schema.toJSON()).map(key => [key, this[key]]));
    }
  };

module.exports = class ClassBuilder {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.properties = {};
    this.schema = {};
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setSchema(obj = {}, options = {}) {
    if (obj instanceof SchemaBuilder) this.schema = obj.toJSON();
    else if (Util.isObject(obj)) this.schema = new SchemaBuilder(obj, options);
    else throw new TypeError('Schema should be an insctance of SchemaBuilder or an object');

    return this;
  }

  addGetter(key, fn) {
    this.properties[key] = {
      // eslint-disable-next-line func-names
      get: function () {
        return fn(this);
      },
    };
    return this;
  }

  build() {
    if (!this.schema) throw new TypeError('Schema should be specified');
    const Class = PureClass(this.schema);

    // If custom name for class is specified, set it
    if (this.name) {
      Object.defineProperty(Class, 'name', { value: this.name });
    }

    // TODO: Add define of properties (getters/setters)
    // const isGetter = typeof value === 'object' && typeof value?.get === 'function';
    // return [key, isGetter ? value : { value }];

    // Add schema
    Object.defineProperty(Class.prototype, 'schema', { value: this.schema, writable: false });

    return Class;
  }
};
