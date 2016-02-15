import Ember from 'ember';

export default Ember.Controller.extend({
  courseController: Ember.inject.controller('student.course'),
  latest_material_title: Ember.computed.reads('courseController.latest_material_title'),
  latest_material_time: moment(Ember.computed.reads('courseController.latest_material_time')).fromNow(),
  latest_material_name: Ember.computed.reads('courseController.latest_material_name'),
  latest_material_user_pic: Ember.computed.reads('courseController.latest_material_user_pic'),
  latest_announcement_title: Ember.computed.reads('courseController.latest_announcement_title'),
  latest_announcement_content: Ember.computed.reads('courseController.latest_announcement_content'),
  latest_announcement_time: moment(Ember.computed.reads('courseController.latest_announcement_time')).fromNow(),
  latest_announcement_name: Ember.computed.reads('courseController.latest_announcement_name'),
  latest_announcement_user_pic: Ember.computed.reads('courseController.latest_announcement_user_pic'),
  latest_discussionpost_title: Ember.computed.reads('courseController.latest_discussionpost_title'),
  latest_discussionpost_time: moment(Ember.computed.reads('courseController.latest_discussionpost_time')).fromNow(),
  latest_discussionpost_name: Ember.computed.reads('courseController.latest_discussionpost_name'),
  latest_discussionpost_user_pic: Ember.computed.reads('courseController.latest_discussionpost_user_pic'),



});
