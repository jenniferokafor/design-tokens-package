# @jensdemo/design-tokens

A design tokens package exported from Tokens Studio, providing component design tokens in multiple formats for use in JavaScript/TypeScript, CSS, and JSON.

## ⚠️ Demo Package

**This package was created for demonstration purposes and will not be updated or maintained.** It serves as an example of how to structure and publish design tokens from Tokens Studio/Figma.

## Installation

```bash
npm install @jensdemo/design-tokens
```

## Usage

This package exports design tokens in multiple formats to suit different use cases:

### 1. JavaScript/TypeScript (Recommended)

Import the default export for use in your JavaScript or TypeScript code:

#### ESM (ES Modules)

```typescript
import tokens from '@jensdemo/design-tokens';

// Access component tokens
const heroBackground = tokens.hero.background; // "#2f1893"
const buttonColor = tokens.buttonPrimary.background; // "#25dac5"
const headingFontSize = tokens.heroHeading.fontSize; // "52px"
```

#### CommonJS

```javascript
const tokens = require('@jensdemo/design-tokens');

// Access tokens (note: CommonJS default export)
const heroBg = tokens.default.hero.background;
```

#### TypeScript Support

Full TypeScript definitions are included. You'll get autocomplete and type checking:

```typescript
import tokens from '@jensdemo/design-tokens';

// TypeScript provides full type safety
interface HeroProps {
  title: string;
}

function Hero({ title }: HeroProps) {
  return (
    <div
      style={{
        background: tokens.hero.background,
        color: tokens.hero.text,
        maxWidth: tokens.hero.maxWidth,
        gap: tokens.hero.gap,
      }}
    >
      <h1
        style={{
          color: tokens.heroHeading.color,
          fontSize: tokens.heroHeading.fontSize,
          fontFamily: tokens.heroHeading.fontFamily,
        }}
      >
        {title}
      </h1>
    </div>
  );
}
```

#### Usage with Styled Components / CSS-in-JS

```typescript
import tokens from '@jensdemo/design-tokens';
import styled from 'styled-components';

const HeroSection = styled.section`
  background-color: ${tokens.hero.background};
  color: ${tokens.hero.text};
  max-width: ${tokens.hero.maxWidth};
  gap: ${tokens.hero.gap};
`;

const PrimaryButton = styled.button`
  background: ${tokens.buttonPrimary.background};
  color: ${tokens.buttonPrimary.text};
  border-radius: ${tokens.buttonPrimary.radius};
  padding: ${tokens.buttonPrimary.paddingY} ${tokens.buttonPrimary.paddingX};
  font-family: ${tokens.buttonPrimary.fontFamily};
  font-size: ${tokens.buttonPrimary.fontSize};
`;
```

### 2. CSS Variables

Import the CSS file to use CSS custom properties in your stylesheets:

```typescript
// In your main entry file (e.g., index.tsx, main.ts, App.tsx)
import '@jensdemo/design-tokens/css/variables.css';
```

Then use the CSS variables in your CSS/SCSS:

```css
.hero {
  background: var(--hero-background);
  color: var(--hero-text);
  max-width: var(--hero-max-width);
  gap: var(--hero-gap);
}

.hero-heading {
  color: var(--hero-heading-color);
  font-size: var(--hero-heading-font-size);
  font-family: var(--hero-heading-font-family);
  font-weight: var(--hero-heading-font-weight);
}

.button-primary {
  background: var(--button-primary-background);
  color: var(--button-primary-text);
  border-radius: var(--button-primary-radius);
  padding: var(--button-primary-padding-y) var(--button-primary-padding-x);
  font-family: var(--button-primary-font-family);
}
```

Or with styled-components:

```typescript
import '@jensdemo/design-tokens/css/variables.css';
import styled from 'styled-components';

const Button = styled.button`
  background: var(--button-primary-background);
  border-radius: var(--button-primary-radius);
  padding: var(--button-primary-padding-y) var(--button-primary-padding-x);
`;
```

### 3. JSON Export

Import the JSON directly for use in build tools or static generation:

```typescript
import components from '@jensdemo/design-tokens/json/components.json';

// TypeScript provides full type safety
const hero = components.hero;
const heroBg = components.hero.background; // "#2f1893"
const buttonStyles = components.buttonPrimary;

// Use in configuration or build scripts
const config = {
  hero: {
    background: components.hero.background,
    maxWidth: components.hero.maxWidth,
  },
};
```

### 4. Raw Tokens

Access the complete token structure including all metadata:

```typescript
import rawTokens from '@jensdemo/design-tokens/raw/tokens.json';

// Access the full token structure including options, semantics, components, and metadata
const allTokens = rawTokens;
const metadata = rawTokens.$metadata;
```

## Available Exports

| Export | Description | Type |
|--------|-------------|------|
| `.` | Main JavaScript/TypeScript export (ESM & CommonJS) | JavaScript object |
| `./css/variables.css` | CSS custom properties | CSS file |
| `./json/components.json` | Component tokens as JSON | JSON object |
| `./raw/tokens.json` | Complete token structure with metadata | JSON object |

## Component Tokens

The package includes tokens for the following components:

- `hero` - Hero section styling (background, text, maxWidth, gap)
- `heroHeading` - Hero heading typography (color, fontSize, fontFamily, etc.)
- `heroBody` - Hero body text styling
- `buttonPrimary` - Primary button styling (background, text, radius, padding, etc.)

## TypeScript Configuration

TypeScript definitions are included automatically. If you're using JSON imports and encounter issues, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

## Examples

### React Component Example

```typescript
import tokens from '@jensdemo/design-tokens';
import '@jensdemo/design-tokens/css/variables.css';

export function HeroSection() {
  return (
    <section
      style={{
        background: tokens.hero.background,
        color: tokens.hero.text,
        maxWidth: tokens.hero.maxWidth,
        gap: tokens.hero.gap,
        padding: '2rem',
      }}
    >
      <h1
        style={{
          color: tokens.heroHeading.color,
          fontSize: tokens.heroHeading.fontSize,
          fontFamily: tokens.heroHeading.fontFamily,
          fontWeight: tokens.heroHeading.fontWeight,
          lineHeight: tokens.heroHeading.lineHeight,
        }}
      >
        Welcome
      </h1>
      <p
        style={{
          color: tokens.heroBody.color,
          fontSize: tokens.heroBody.fontSize,
          fontFamily: tokens.heroBody.fontFamily,
        }}
      >
        Get started with our design system
      </p>
      <button
        style={{
          background: tokens.buttonPrimary.background,
          color: tokens.buttonPrimary.text,
          borderRadius: tokens.buttonPrimary.radius,
          padding: `${tokens.buttonPrimary.paddingY} ${tokens.buttonPrimary.paddingX}`,
          fontFamily: tokens.buttonPrimary.fontFamily,
          fontSize: tokens.buttonPrimary.fontSize,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Get Started
      </button>
    </section>
  );
}
```

## License

MIT

## Author

Created by [Jennifer Okafor](https://github.com/jenniferokafor)

---

**Note:** This is a demo package and will not receive updates or maintenance. For production use, create your own design tokens package based on your design system requirements.
