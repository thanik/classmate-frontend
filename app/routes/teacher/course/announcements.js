import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('teacher.course');
  },

  actions:
  {

    showAddModal: function()
    {
      Ember.$('#add-announcement').modal();
      Ember.$('.modal').on('hidden.bs.modal', function ()
      {
        Ember.$('.modal').find('form')[0].reset();
        this.controller.set('modal_error', '');
      });
    },

    post_new: function()
    {
      const course = this.controller.get('model');
      if(this.controller.get('title') || this.controller.get('post_content'))
      {
        var new_post = this.store.createRecord('announcement', {
          title: this.controller.get('title'),
          content: this.controller.get('post_content'),
          course: course,
        });

        new_post.save();
        Ember.$('#add-announcement').modal('hide');

      }
      else
      {
        this.controller.set('modal_error','You must specify the post title and content.');

      }
    },

    post_delete: function()
    {

    },
  }

});
