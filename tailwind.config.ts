import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
} as Config & {
  daisyui: {
    themes: string[];
    darkTheme: string;
    base: boolean;
    styled: boolean;
    utils: boolean;
  };
};

// @ts-ignore - DaisyUI config
config.daisyui = {
  themes: ['corporate', 'business'],
  darkTheme: 'business',
  base: true,
  styled: true,
  utils: true,
};

export default config;
