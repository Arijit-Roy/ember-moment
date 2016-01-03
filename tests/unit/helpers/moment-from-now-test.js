import Ember from 'ember';
import moment from 'moment';
import { test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moduleForHelper from '../../helpers/module-for-helper';
import { runAppend, runDestroy } from '../../helpers/run-append';

moduleForHelper('moment-from-now',{
  needs: ['service:moment']
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const context = Ember.Object.create({
    date: threeDaysAgo
  });

  const view = this.createView({
    template: hbs`{{moment-from-now date}}`,
    context: context
  });

  runAppend(view);
  assert.equal(view.$().text(), '3 days ago');
});

test('two args (date, inputFormat)', function(assert) {
  assert.expect(1);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const view = this.createView({
    template: hbs`{{moment-from-now date inputFormat}}`,
    context: {
      inputFormat: 'LLLL',
      date: threeDaysAgo
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '3 days ago');
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);
  const context = Ember.Object.create({
    date: moment().subtract(1, 'hour'),
  });

  const view = this.createView({
    template: hbs`{{moment-from-now date}}`,
    context: context
  });

  runAppend(view);

  assert.equal(view.$().text(), 'an hour ago');

  Ember.run(function () {
    context.set('date', moment().subtract(2, 'hours'));
  });

  assert.equal(view.$().text(), '2 hours ago');

  runDestroy(view);
});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);
  const view = this.createView({
    template: hbs`{{moment-from-now date locale='es'}}`,
    context: {
      date: moment().subtract(1, 'hour'),
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'hace una hora');
  runDestroy(view);
});

test('can be called with null', function(assert) {
  assert.expect(1);
  const view = this.createView({
    template: hbs`{{moment-from-now date allow-empty=true}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '');
  runDestroy(view);
});
