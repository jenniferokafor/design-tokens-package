/**
 * Design tokens exported from Tokens Studio
 *
 * Each component token is an object with string values representing
 * design properties like colors, sizes, typography, etc.
 */
export interface ComponentTokens {
  [key: string]: string;
}

/**
 * Design tokens organized by component
 *
 * Generated from Tokens Studio/Figma tokens
 *
 * @example
 * ```ts
 * import tokens from '@jensdemo/design-tokens';
 *
 * const heroBg = tokens.hero.background; // "#2f1893"
 * const buttonColor = tokens.buttonPrimary.background; // "#25dac5"
 * ```
 */
declare const designTokens: {
  [componentName: string]: ComponentTokens;
};

export default designTokens;
