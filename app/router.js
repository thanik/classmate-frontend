import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('first-setup');
  this.route('login');

  this.route('student', function(){
    this.route('courses',function(){
      this.route('join',{ resetNamespace: true });
    });
    this.route('course', { path: '/course/:course_id' },function()
    {

      this.route('announcement', { path: '/announcement/:announcement_id' });
      this.route('announcements');
      this.route('materials');
      this.route('material', { path: '/material/:material_id' });
      this.route('discussions', function() {
      });
      this.route('discussion', { path: '/discussion/:discussion_id' }, function() {
        this.route('comment', function() {
          this.route('new');
          this.route('edit');
        });
      });
    });

  });

  this.route('teacher', function(){
    this.route('courses');
    this.route('course', { path: '/course/:course_id' }, function() {
      this.route('new');
      this.route('announcement', { path: '/announcement/:announcement_id' }, function() {
        this.route('edit');
      });
      this.route('announcements', function() {
        this.route('new');
      });
      this.route('materials', function() {
        this.route('new');
      });
      this.route('material', { path: '/material/:material_id' }, function() {
        this.route('edit');
      });
      this.route('discussions', function() {
        this.route('new');
      });
      this.route('discussion', { path: '/discussion/:discussion_id' }, function() {
        this.route('edit');

        this.route('comment', function() {
          this.route('edit');
          this.route('new');
        });
      });
    });
  });


  this.route('logout');
});

export default Router;
