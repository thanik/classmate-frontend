import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  filename: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  course: DS.belongsTo('course'),
  files: DS.hasMany('file',{ async: true }),
  user: DS.belongsTo('user'),
});
