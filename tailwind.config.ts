import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { navy:'#10243A', paper:'#F8FAFC', gold:'#C5A46D', steel:'#52738C' } } }, plugins: [] };
export default config;
