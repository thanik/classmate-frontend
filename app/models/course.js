import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  course_code: DS.attr('string'),
  name: DS.attr('string'),
  join_code: DS.attr('string'),
  role: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  announcements: DS.hasMany('announcement',{ async: true }),
  materials: DS.hasMany('material',{ async: true }),
  discussionposts: DS.hasMany('discussionpost',{ async: true }),

  fullCourseName: Ember.computed('course_code','name',function(){
    return this.get('course_code') + ' ' + this.get('name');
  }),
});
