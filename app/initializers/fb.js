import FB from 'ember-cli-facebook-js-sdk/fb';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'fb',
  initialize: function()
  {
    return FB.init({
      appId: '463605780481509',
      version: 'v2.5',
      xfbml: true
    });
  }
};
