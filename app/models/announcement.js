import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  course: DS.belongsTo('course'),
  user: DS.belongsTo('user'),
});
