import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model(params) {
    return this.store.findRecord('discussionpost', params.discussion_id);
  },

  actions: {
    reply: function ()
    {
      const discussion = this.controller.get('model');
      if (this.controller.get('reply_content'))
      {
        var new_post = this.store.createRecord('comment', {
          content: this.controller.get('reply_content'),
          discussionpost: discussion,
        });

        new_post.save();
        Ember.$('#reply-modal').modal('hide');

      }
      else
      {
        this.controller.set('modal_error', 'You must specify the reply content.');

      }
    },

    delete: function ()
    {
      const route = this;
      const discussion = this.controller.get('model');

      discussion.destroyRecord().then(function(){
        Ember.$('#delete-modal').modal('hide');
        route.transitionTo('teacher.course.discussions');
      });

    },


    showReplyModal: function()
    {
      const controller = this;
      Ember.$('#reply-modal').modal();
      Ember.$('#reply-modal').on('hidden.bs.modal', function(){
        Ember.$('.modal').find('form')[0].reset();
        controller.set('reply_content','');
        controller.set('modal_error','');
      });
    },

    showDeleteModal: function()
    {
      const controller = this;
      Ember.$('#delete-modal').modal();
      Ember.$('#delete-modal').on('hidden.bs.modal', function(){
        controller.set('modal_error','');
      });
    },
  }
});
