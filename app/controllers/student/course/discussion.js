import Ember from 'ember';

export default Ember.Controller.extend({
  modal_error: '',
  actions: {
    showReplyModal: function()
    {
      var contoller = this;
      Ember.$('#reply-modal').modal();
      Ember.$('.modal').on('hidden.bs.modal', function(){
        Ember.$('.modal').find('form')[0].reset();
        contoller.set('modal_error','');
      });
    },


  }


});
