import Ember from 'ember';

export default Ember.Controller.extend({
  courseController: Ember.inject.controller('teacher.course'),
  latest_discussionpost_title: Ember.computed.reads('courseController.latest_discussionpost_title'),
  latest_discussionpost_time: moment(Ember.computed.reads('courseController.latest_discussionpost_time')).fromNow(),
  latest_discussionpost_name: Ember.computed.reads('courseController.latest_discussionpost_name'),
  latest_discussionpost_user_pic: Ember.computed.reads('courseController.latest_discussionpost_user_pic'),



});
