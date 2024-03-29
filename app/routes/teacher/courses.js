import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('course', { role: 1 });
  },

  actions: {
    showAddModal: function ()
    {
      const route = this;
      Ember.$('#add-course').modal();
      Ember.$('.modal').on('hidden.bs.modal', function ()
      {
        Ember.$('.modal').find('form')[0].reset();
        route.controller.set('modal_error', '');
      });
    },

    course_new: function ()
    {
      const route = this;
      if (this.controller.get('course_code') || this.controller.get('name'))
      {
        Ember.$('#submit_button').prop("disabled", true);
        var new_course = this.store.createRecord('course', {
          course_code: this.controller.get('course_code'),
          name: this.controller.get('name'),
        });

        new_course.save().then(function()
        {
          Ember.$('#add-course').modal('hide');
          route.refresh();
        });


      }
      else
      {
        this.controller.set('modal_error', 'You must specify both course code and name.');

      }
    },
  },

});
