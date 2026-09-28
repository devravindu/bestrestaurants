import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",       
        ink: "#000000",         
        accent: "#FC693D", // Your new vibrant orange brand color
        line: "#E5E5E5",        
      },
    },
  },
  plugins: [],
};
export default config;