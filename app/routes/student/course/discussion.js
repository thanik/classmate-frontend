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
  }
});
