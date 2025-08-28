import { module, test } from 'qunit';
import { inject } from '@ember/service';
import { setupTest } from 'ember-qunit';

module('in-app import', function (hooks) {
  setupTest(hooks);

  test('this file has no errors', async function (assert) {
    assert.ok(inject);
  });
});