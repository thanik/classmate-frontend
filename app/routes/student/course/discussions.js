import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('student.course');
  },

  actions:
  {
    post_new: function()
    {
      const course = this.controller.get('model');
      if(this.controller.get('title') || this.controller.get('post_content'))
      {
        var new_post = this.store.createRecord('discussionpost', {
          topic: this.controller.get('title'),
          content: this.controller.get('post_content'),
          course: course,
          replies: 0,
        });

        new_post.save();
        Ember.$('#add-discussion').modal('hide');

      }
      else
      {
        this.controller.set('modal_error','You must specify the post title and content.');

      }
    },
  }

});
