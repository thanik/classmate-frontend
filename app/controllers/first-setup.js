import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  fb: Ember.inject.service(),
  currentPage: '0',
  firstPage: Ember.computed.equal('currentPage','0'),
  studentPage: Ember.computed.equal('currentPage','1'),
  teacherPage: Ember.computed.equal('currentPage','2'),
  dataSubmitted: false,
  errors: 0,

  actions: {

    showPage: function(pageIndex)
    {
      this.set('currentPage', pageIndex);
    },
    registerStudent: function()
    {
      const controller = this;
      const FB = this.get('fb');
      var register_data = controller.getProperties('name','organization_code','faculty_field','student_id','email');
      if(register_data.name === '' || register_data.faculty_field === '' || register_data.student_id === '' || register_data.email === '' || register_data.organization_code === undefined)
      {
        /* input validation */
        controller.set('errors', 'Some infomations are missing. Please check your input and try again.');
      }
      else
      {
        if (register_data.organization_code === undefined)
        {
          controller.set('errors', 'The university/college infomation is invalid.');
        }
        else
        {
          Ember.$('#submit_button').prop("disabled", true);
          FB.getLoginStatus().then(function (response)
          {
            console.log(response);
            if (response.status === 'connected')
            {
              var fb_id = response.authResponse.userID;
              var fb_token = response.authResponse.accessToken;

              Ember.$.ajax({
                url: config.apiHost + '/api/v0/register',
                type: 'POST',
                data: {
                  name: register_data.name,
                  organization_id: register_data.organization_code,
                  faculty_field: register_data.faculty_field,
                  student_id: register_data.student_id,
                  facebook_id: fb_id,
                  facebook_token: fb_token,
                  role: 0,
                  email: register_data.email,
                },
              }).then(function (response)
              {
                if (response.status === 'success')
                {
                  controller.transitionToRoute('login');
                }
              }, function (error)
              {
                controller.set('errors', 'There\'s an error while registering your account. (error: ' + error.responseJSON.message + ' ' + error.responseJSON.field_errors + ')');
                Ember.$('#submit_button').prop("disabled", false);
              });

            }
          });
        }
      }

    },

    registerTeacher: function()
    {
      const controller = this;
      const FB = this.get('fb');
      var register_data = controller.getProperties('name','organization_code','faculty_field','email');
      if(register_data.name === '' || register_data.faculty_field === '' || register_data.email === '')
      {
        /* input validation */
        controller.set('errors', 'Some infomations are missing. Please check your input and try again.');
      }
      else
      {
        if (register_data.organization_code === undefined)
        {
          controller.set('errors', 'The university/college infomation is invalid.');
        }
        else
        {
          Ember.$('#submit_button').prop("disabled", true);
          FB.getLoginStatus().then(function (response)
          {
            console.log(response);
            if (response.status === 'connected')
            {
              var fb_id = response.authResponse.userID;
              var fb_token = response.authResponse.accessToken;

              Ember.$.ajax({
                url: config.apiHost + '/api/v0/register',
                type: 'POST',
                data: {
                  name: register_data.name,
                  organization_id: register_data.organization_code,
                  faculty_field: register_data.faculty_field,
                  facebook_id: fb_id,
                  facebook_token: fb_token,
                  role: 1,
                  student_id: 0,
                  email: register_data.email,
                },
              }).then(function (response)
              {
                if (response.status === 'success')
                {
                  controller.transitionToRoute('login');
                }
              }, function (error)
              {
                controller.set('errors', 'There\'s an error while registering your account. (error: ' + error.responseJSON.message + ' ' + error.responseJSON.field_errors + ')');
                Ember.$('#submit_button').prop("disabled", false);
              });

            }
          });
        }
      }
    },

  }

});
