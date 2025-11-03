/**
 * Type definitions for JSON component tokens export
 * 
 * @example
 * ```ts
 * import components from '@jensdemo/design-tokens/json/components.json';
 * 
 * const heroBg = components.hero.background;
 * ```
 */
export interface ComponentTokens {
  [key: string]: string;
}

export interface Components {
  [componentName: string]: ComponentTokens;
}

declare const components: Components;
export default components;

