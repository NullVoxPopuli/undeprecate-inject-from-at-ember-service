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

**.babelrc**

```json
{
  "plugins": ["undeprecate-inject-from-at-ember-service"]
}
```

**babel.config.js**

```javascript
module.exports = {
  plugins: ["undeprecate-inject-from-at-ember-service"],
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
