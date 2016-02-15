import Ember from 'ember';

export default Ember.Controller.extend({
  modal_error: '',
  actions: {
    showAddModal: function()
    {
      var contoller = this;
      Ember.$('#add-discussion').modal();
      Ember.$('.modal').on('hidden.bs.modal', function(){
        Ember.$('.modal').find('form')[0].reset();
        contoller.set('modal_error','');
      });
    },


  }


});

