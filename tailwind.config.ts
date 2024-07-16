import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
            primary: '#1a73e8', // 구글 포토의 파란색 계열
            secondary: '#e8f0fe',
            accent: '#34a853',
        },
        typography: (theme: (arg0: string) => any) => ({
            DEFAULT: {
                css: {
                    color: theme('colors.gray.900'),
                    a: {
                        color: theme('colors.primary'),
                        '&:hover': {
                            color: theme('colors.primary'),
                        },
                    },
                },
            },
        }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
