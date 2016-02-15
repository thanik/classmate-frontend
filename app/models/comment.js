import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  discussionpost: DS.belongsTo('discussionpost'),
  files: DS.hasMany('file',{ async: true }),
  user: DS.belongsTo('user'),
});
