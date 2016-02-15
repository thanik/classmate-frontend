import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('teacher.course');
  },

  actions:
  {
    showAddModal: function()
    {
      Ember.$('#add-material').modal();
      Ember.$('.modal').on('hidden.bs.modal', function ()
      {
        Ember.$('.modal').find('form')[0].reset();
        this.controller.set('modal_error', '');
      });
    },

    post_new: function()
    {
      const course = this.controller.get('model');
      if(this.controller.get('title') || this.controller.get('filename'))
      {
        var new_post = this.store.createRecord('material', {
          title: this.controller.get('title'),
          description: this.controller.get('description'),
          filename: this.controller.get('filename'),
          course: course,
        });

        new_post.save().then(function(){
          Ember.$('#add-material').modal('hide');
        });


      }
      else
      {
        this.controller.set('modal_error','You must specify both title and URL of this file.');

      }
    },

    post_delete: function()
    {

    },
  }

});
