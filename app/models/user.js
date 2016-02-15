import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  avatar_filename: DS.attr('string'),

  organizations: DS.hasMany('organization'),

  discussionposts: DS.hasMany('post'),
  comments: DS.hasMany('comment'),
  announcements: DS.hasMany('announcement'),
  materials: DS.hasMany('material'),
  files: DS.hasMany('file'),
});
