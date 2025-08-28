'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      throwUnlessParallelizable: true,
    },
    babel: {
      plugins: [
        [
          require.resolve(
            'babel-plugin-undeprecate-inject-from-at-ember-service',
          ),
          {},
        ],
      ],
    },
    autoImport: {
      webpack: {
        module: {
          rules: [
            {
              test: (filename) => {
                return filename.endsWith('.js');
              },
              use: {
                loader: 'babel-loader-8',
                options: {
                  plugins: [
                    require.resolve(
                      'babel-plugin-undeprecate-inject-from-at-ember-service',
                    ),
                  ],
                },
              },
            },
          ],
        },
      },
    },
  });

  return app.toTree();
};
