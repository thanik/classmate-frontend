import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({

  session: Ember.inject.service('session'),
  actions: {

    joinCourse: function ()
    {
      const controller = this;
      this.get('session').authorize('authorizer:token', (headerName, headerValue) =>
      {
        const headers = {};
        headers[headerName] = headerValue;
        Ember.$.ajax({
          url: config.apiHost + '/api/v0/join_course',
          type: 'POST',
          headers: headers,
          data: {
            joinCode: this.get('joinCode'),
          },
        }).then(function (response)
        {
          if (response.status === 'success')
          {
            Ember.$('.modal').modal('hide');
            controller.set('joinCode', '');
            window.location.reload(true);

          }
          else
          {
            controller.set('error', response.message);
          }
        });
      });


    }
  }
});
