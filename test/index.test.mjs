import babel from '@babel/core'
import plugin from '../src/index.js';

describe("babel-plugin-undeprecate-inject-from-at-ember-service", () => {
  function transform(code) {
    return babel.transformSync(code, {
      plugins: [plugin],
      parserOpts: {
        sourceType: "module",
      },
    }).code;
  }

  test("transforms inject as service import", () => {
    const input = "import { inject as service } from '@ember/service';";
    const output = transform(input);
    expect(output).toBe("import { service } from '@ember/service';");
  });

  test("transforms inject import", () => {
    const input = "import { inject } from '@ember/service';";
    const output = transform(input);
    expect(output).toBe("import { service as inject } from '@ember/service';");
  });

  test("transforms mixed imports with inject", () => {
    const input = "import { inject, getOwner } from '@ember/service';";
    const output = transform(input);
    expect(output).toBe(
      "import { service as inject, getOwner } from '@ember/service';",
    );
  });

  test("transforms inject as service with other imports", () => {
    const input =
      "import { inject as service, getOwner } from '@ember/service';";
    const output = transform(input);
    expect(output).toBe("import { service, getOwner } from '@ember/service';");
  });

  test("leaves other imports unchanged", () => {
    const input = "import { getOwner } from '@ember/service';";
    const output = transform(input);
    expect(output).toBe("import { getOwner } from '@ember/service';");
  });

  test("leaves service import unchanged", () => {
    const input = "import { service } from '@ember/service';";
    const output = transform(input);
    expect(output).toBe("import { service } from '@ember/service';");
  });

  test("ignores imports from other modules", () => {
    const input = "import { inject } from '@ember/object';";
    const output = transform(input);
    expect(output).toBe("import { inject } from '@ember/object';");
  });

  test("handles default imports alongside named imports", () => {
    const input = "import Service, { inject } from '@ember/service';";
    const output = transform(input);
    expect(output).toBe(
      "import Service, { service as inject } from '@ember/service';",
    );
  });
});
