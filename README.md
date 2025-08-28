# Babel Plugin: Undeprecate Inject from @ember/service

A Babel plugin that transforms deprecated `inject` imports to `service` imports from `@ember/service`.

## What it does

This plugin transforms the following import patterns:

- `import { inject as service } from '@ember/service'` → `import { service } from '@ember/service'`
- `import { inject } from '@ember/service'` → `import { service as inject } from '@ember/service'`

## Installation

```bash
pnpm add -D babel-plugin-undeprecate-inject-from-at-ember-service
```

## Usage

Add the plugin to your Babel configuration:

```js
// ember-cli-build.js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // transforms your own app
    babel: {
      plugins: [
        [require.resolve('babel-plugin-undeprecate-inject-from-at-ember-service'), {}]
      ]
    },
    autoImport: {
      webpack: {
        module: {
          rules: [
            // transforms v2 addon code
            {
              test: (filename) => {
                return filename.endsWith('.js');
              },
              use: {
                loader: 'babel-loader-8',
                options: {
                  plugins: [
                    require.resolve('babel-plugin-undeprecate-inject-from-at-ember-service')
                  ]
                },
              },
            }
          ]
        }
      }

    }
  });

  return app.toTree();
};
```

## Examples

### Before

```javascript
import { inject as service } from "@ember/service";
import { inject } from "@ember/service";
```

### After

```javascript
import { service } from "@ember/service";
import { service as inject } from "@ember/service";
```

## Development

```bash
pnpm install
pnpm test
pnpm run build
```

Tests are written using Vitest.

## License

MIT
