import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  beforeModel: function()
  {
    let token = this.get('session.data.authenticated.token');
    // Get the part of the token where data is stored.
    token = token.split('.')[1];

    // Make URL friendly.
    token = token.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');

    // Reverse to original encoding.
    if (token.length % 4 !== 0)
    {
      token += ('===').slice(0, 4 - (token.length % 4));
    }

    token = token.replace(/-/g, '+').replace(/_/g, '/');

    // Return the token data decoded.
    let token_data = JSON.parse(atob(token));
    console.log(token_data);
    this.set('avatar_filename',token_data.avatar_filename);
  },

  avatar_filename: Ember.computed(function()
  {
    let token = this.get('session.data.authenticated.token');
    // Get the part of the token where data is stored.
    token = token.split('.')[1];

    // Make URL friendly.
    token = token.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');

    // Reverse to original encoding.
    if (token.length % 4 !== 0)
    {
      token += ('===').slice(0, 4 - (token.length % 4));
    }

    token = token.replace(/-/g, '+').replace(/_/g, '/');

    // Return the token data decoded.
    let token_data = JSON.parse(atob(token));
    console.log(token_data);
    return token_data.avatar_filename;
  }),

});
