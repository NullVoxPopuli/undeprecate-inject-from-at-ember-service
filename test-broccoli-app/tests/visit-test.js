import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Application | visit test', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / shows hello world as document title', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.strictEqual(document.title, 'hello world');
  });
});
