'use strict';

const { ClassBuilder } = require('../src/index');

const userObject = {
  user_id: 56,
  username: 'johnsmith1998',
  user_register_date: '2020-03-06T18:32:23.000Z',
  user_last_seen_date: '2021-11-21T13:59:47.355Z',
  user_is_moderator: false,

  // TODO
  user_is_admin: { type: 'boolean', default: false },
  user_permissions: {
    manage_users: true,
    use_admin_panel: false,
  },
};

// Const userSchema = new SchemaBuilder({ ...userObject, user_email: { type: String } }, { detectDateType: true });
const User = new ClassBuilder()
  .setName('User')
  .setSchema(userObject, { excludeFromKeys: ['user_'] })
  .addGetter('registerTimestamp', self => self.registerDate.getTime())
  .build({ ignoreSchema: true });

const user = new User(userObject);
console.log(user.toJSON());
