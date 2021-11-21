'use strict';

const { ClassBuilder, SchemaBuilder } = require('../src/index');

const userObject = {
  user_id: 56,
  username: 'johnsmith1998',
  user_register_date: { type: Date },
  user_last_seen_date: '2021-11-21T13:59:47.355Z',
  user_is_moderator: false,
};

const userSchema = new SchemaBuilder({ ...userObject, user_email: { type: String } }, { detectDateType: true });
const User = new ClassBuilder({ snakeToCamel: true, excludeFromVarNames: ['user_'] })
  .setName('User')
  .setSchema(userSchema)
  .addGetter('registerTimestamp', self => self.registerDate.getTime())
  .build();

const user = new User(userObject);
console.log(user);
