import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('first-setup-student', 'Integration | Component | first setup student', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{first-setup-student}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#first-setup-student}}
      template block text
    {{/first-setup-student}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
