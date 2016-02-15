import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin).extend({
  session: Ember.inject.service('session'),
  actions: {
    didTransition: function()
    {
      /*this.get('session').authorize('authorizer:token', (headerName, headerValue) => {
       const headers = {};
       headers[headerName] = headerValue;
       Ember.$.ajax({
       url: 'https://classmateapp.xyz/api/v0/testToken',
       type: 'POST',
       headers: headers,
       }).then(function(response){
       console.log(response);
       });
       });*/
      if(this.get('session.isAuthenticated'))
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
        if(token_data.default_role === '0')
        {
          this.controller.transitionToRoute('student.courses');
        }
        else if(token_data.default_role === '1')
        {
          this.controller.transitionToRoute('teacher.courses');
        }
      }
    },
  }
});
