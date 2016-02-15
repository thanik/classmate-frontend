import Ember from 'ember';

export default Ember.TextField.extend({

  tagName: 'input',

  classNames: ['typeahead','form-control'],
  displayKey: 'name',
  hint: true,
  highlight: true,
  minLength: 2,

  //TODO: We need more customizable solution here
  bloodhound: Ember.computed({
    get: function() {
      var self, states;
      self = this;
      states = new Bloodhound({
        datumTokenizer: function (data) {
          return Bloodhound.tokenizers.whitespace(data.name);
        },
        //datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
          url: this.get('url') + '#%QUERY',
          wildcard: '%QUERY',
          transport: function(opts, onSuccess, onError) {
            var url = opts.url.split("#")[0];
            var query = opts.url.split("#")[1];
            Ember.$.ajax({
              url: url,
              data: "query=" + query,
              type: "POST",
              success: onSuccess,
              error: onError,
            });
          },
          filter: function(response) {
            return response.results;
          },

        }
      });
      states.initialize();
      return states;
    }
  }),
  initComponent: Ember.on('didInsertElement', function() {
    this.$().typeahead(this.getProperties(['hint', 'highlight', 'minLength']), {
      name: 'institute',
      displayKey: this.get('displayKey'),
      source: this.get('bloodhound').ttAdapter()
    });
    var component = this;
    Ember.$('.typeahead').on('typeahead:select', function (e, datum) {
      component.set('selectiondata',datum.id);
    });
    return;
  }),
  destroyComponent: Ember.on('willDestroyElement', function() {
    return this.$().typeahead('destroy');
  })
});
