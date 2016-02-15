import Ember from 'ember';
import FB from 'ember-cli-facebook-js-sdk/fb';
import config from '../config/environment';

function onLogin(controller,response)
{
  if(response.status === 'connected')
  {
    var accessToken = response.authResponse.accessToken;
    var userId = response.authResponse.userID;
    /* check if there's an account or not in the system */
    Ember.$.ajax({
      url: config.apiHost + '/api/v0/check_account',
      type: 'POST',
      data: { facebook_token: accessToken, facebook_id: userId },
    }).then(function(response){
      if(response.hasAccount === true)
      {
        /* has account then auth */

        controller.send('authenticate',userId,accessToken);

      }
      else
      {
        /* doesn't have account, should move to first-setup */
        controller.transitionToRoute('first-setup');
      }
    }, function(error){
      controller.set('loadingText','There\'s an error while logging in. Please refresh this page. (error: ' + error.responseJSON.message +')');
    });
  }
}

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  actions: {
    didTransition: function () {
      /* these code will run after the login route loaded */
      if(this.get('session.isAuthenticated'))
      {
        this.controller.transitionToRoute('index');
      }
      else
      {
        var controller = this.controller;

        FB.getLoginStatus().then(function (response)
        {
          if (response.status === 'connected')
          {
            onLogin(controller, response);
          }
          else
          {
            FB.login({scope: 'user_about_me, user_friends, email'}).then(function (response)
            {
              onLogin(controller, response);
            });
          }
        });
      }
      return true;
    },

    authenticate: function (facebook_id, facebook_token) {
      var credentials = {identification:facebook_id, password:facebook_token};
      this.get('session').authenticate('authenticator:jwt',credentials);

    }
  },
});
