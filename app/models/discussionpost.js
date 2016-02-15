import DS from 'ember-data';

export default DS.Model.extend({
  topic: DS.attr('string'),
  content: DS.attr('string'),
  replies: DS.attr('number'),

  comments: DS.hasMany('comment',{ async: true }),
  user: DS.belongsTo('user'),
  course: DS.belongsTo('course'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  files: DS.hasMany('file',{ async: true }),
});
