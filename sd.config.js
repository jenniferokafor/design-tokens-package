import fs from "fs";
import StyleDictionary from "style-dictionary";
import * as sdTransforms from "@tokens-studio/sd-transforms";

sdTransforms.register(StyleDictionary);
const raw = JSON.parse(fs.readFileSync("tokens.json", "utf8"));

/**
 * Deep merge function to combine token sets while preserving nested structures
 */
const deepMerge = (target, source) => {
  const output = { ...target };
  if (source && typeof source === "object" && !Array.isArray(source)) {
    Object.keys(source).forEach((key) => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        !source[key].$type &&
        !source[key].$value
      ) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
};

// Deep merge options and semantics as base (for reference resolution)
// This preserves nested structures so options.color.teal.500 and semantics.color.primary
// can coexist at color.teal.500 and color.primary
const base = deepMerge(raw.options ?? {}, raw.semantics ?? {});

const tokens = {
  ...base,
  components: raw.components ?? {},
  $metadata: raw.$metadata ?? {},
};

// Filter to only include tokens inside the components set
const onlyComponents = (token) => token.path[0] === "components";

/**
 * Custom name transform that removes the "components" prefix
 * and converts to kebab-case.
 */
StyleDictionary.registerTransform({
  name: "name/kebab-no-components",
  type: "name",
  transform: (token) => {
    const path =
      token.path[0] === "components" ? token.path.slice(1) : token.path;

    return path
      .join("-")
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  },
});

/**
 * Helper function to extract nested component tokens and remove the "components" prefix.
 * Uses the nested dictionary.tokens structure and extracts just the resolved values.
 */
const extractComponentsFromTokens = (tokensObj) => {
  if (!tokensObj || !tokensObj.components) {
    return {};
  }

  const extractValues = (obj) => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      return obj;
    }

    if ("$value" in obj && Object.keys(obj).length > 1) {
      return obj.$value;
    }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = extractValues(value);
    }
    return result;
  };

  return extractValues(tokensObj.components);
};

/**
 * Format for ESM JavaScript export
 */
StyleDictionary.registerFormat({
  name: "javascript/esm-components",
  format: ({ dictionary }) => {
    const tokens = extractComponentsFromTokens(dictionary.tokens);
    return `export default ${JSON.stringify(tokens, null, 2)};\n`;
  },
});

/**
 * Format for CJS JavaScript export
 */
StyleDictionary.registerFormat({
  name: "javascript/cjs-components",
  format: ({ dictionary }) => {
    const tokens = extractComponentsFromTokens(dictionary.tokens);
    return `module.exports = ${JSON.stringify(tokens, null, 2)};\n`;
  },
});

/**
 * Format for nested JSON export
 */
StyleDictionary.registerFormat({
  name: "json/nested-components",
  format: ({ dictionary }) => {
    const tokens = extractComponentsFromTokens(dictionary.tokens);
    return JSON.stringify(tokens, null, 2) + "\n";
  },
});

export default {
  tokens,
  preprocessors: ["tokens-studio"],
  clean: true,
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["name/kebab-no-components"],
      buildPath: "dist/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: { selector: ":root" },
          filter: onlyComponents,
        },
      ],
    },
    json: {
      transformGroup: "tokens-studio",
      buildPath: "dist/json/",
      files: [
        {
          destination: "components.json",
          format: "json/nested-components",
          filter: onlyComponents,
        },
      ],
    },
    js: {
      transformGroup: "tokens-studio",
      buildPath: "dist/",
      files: [
        {
          destination: "index.js",
          format: "javascript/esm-components",
          filter: onlyComponents,
        },
        {
          destination: "index.cjs",
          format: "javascript/cjs-components",
          filter: onlyComponents,
        },
      ],
    },
  },
};
