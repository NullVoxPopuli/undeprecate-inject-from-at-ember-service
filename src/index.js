module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "undeprecate-inject-from-at-ember-service",
    visitor: {
      ImportDeclaration(path, state) {
        if (state.filename?.includes('/ember-source/')) {
          if (state.filename.includes('@ember/service/index.js')) {
            return;
          }

          if (!state.filename.includes('/.embroider/')) {
            return;
          }
        }

        // Only process imports from '@ember/service'
        if (path.node.source.value !== "@ember/service") {
          return;
        }

        const newSpecifiers = [];

        // Process all specifiers
        path.node.specifiers.forEach((specifier) => {
          if (t.isImportSpecifier(specifier)) {
            if (specifier.imported.name === "inject") {
              // Transform inject to service
              // If it's aliased (inject as service), use the alias
              // If it's not aliased, rename it to service
              const localName = specifier.local.name;

              // Create new service import
              const newSpecifier = t.importSpecifier(
                t.identifier(localName), // local name (could be 'service' or the alias)
                t.identifier("service"), // imported name
              );
              newSpecifiers.push(newSpecifier);
            } else {
              // Keep other imports as-is
              newSpecifiers.push(specifier);
            }
          } else {
            // Keep default imports and namespace imports as-is
            newSpecifiers.push(specifier);
          }
        });

        // Replace the import declaration with updated specifiers
        path.node.specifiers = newSpecifiers;
      },
    },
  };
};
