import DS from 'ember-data';

export default DS.Model.extend({

  material: DS.belongsTo('material'),
  comment: DS.belongsTo('comment'),
  discussionpost: DS.belongsTo('discussionpost'),

  revision_id: DS.attr('number'),
  filename: DS.attr('string'),
  user: DS.belongsTo('user'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});
