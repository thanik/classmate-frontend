import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model(params) {
    return this.store.findRecord('course', params.course_id);
  },


  afterModel: function(posts)
  {
    const route = this;
    this.get('session').authorize('authorizer:token', (headerName, headerValue) =>
    {
      const headers = {};
      headers[headerName] = headerValue;

      Ember.$.ajax({
        url: config.apiHost + '/api/v0/course/' + posts.get('id') + '/getLatestMaterial',
        type: 'GET',
        headers: headers,
      }).then(function (response)
      {
        if(response.status === 'success')
        {
          route.controller.set('latest_material_title',response.title);
          route.controller.set('latest_material_time',response.time);
          route.controller.set('latest_material_name',response.name);
          route.controller.set('latest_material_user_pic',response.user_pic);
        }
        else
        {
          route.controller.set('latest_material_title','No material');
        }
      });

      Ember.$.ajax({
        url: config.apiHost + '/api/v0/course/' + posts.get('id') + '/getLatestAnnouncement',
        type: 'GET',
        headers: headers,
      }).then(function (response)
      {
        if(response.status === 'success')
        {
          route.controller.set('latest_announcement_title',response.title);
          route.controller.set('latest_announcement_content',response.content);
          route.controller.set('latest_announcement_time',response.time);
          route.controller.set('latest_announcement_name',response.name);
          route.controller.set('latest_announcement_user_pic',response.user_pic);
        }
        else
        {
          route.controller.set('latest_announcement_title','No announcement');
        }
      });

      Ember.$.ajax({
        url: config.apiHost + '/api/v0/course/' + posts.get('id') + '/getLatestDiscussionPost',
        type: 'GET',
        headers: headers,
      }).then(function (response)
      {
        if(response.status === 'success')
        {
          route.controller.set('latest_discussionpost_title',response.title);
          route.controller.set('latest_discussionpost_time',response.time);
          route.controller.set('latest_discussionpost_name',response.name);
          route.controller.set('latest_discussionpost_user_pic',response.user_pic);
        }
        else
        {
          route.controller.set('latest_discussionpost_title','No discussion');
        }
      });
    });
  },

});
