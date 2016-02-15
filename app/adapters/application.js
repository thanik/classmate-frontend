import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token',
  namespace: 'api/v0',
  host: config.apiHost,
  pathForType: function(type) {
    return Ember.String.camelize(type);
  }
});
