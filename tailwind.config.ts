import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Ethereal Precision color system
      colors: {
        "surface-container-highest": "#e2e2e2",
        "on-primary": "#ffffff",
        "on-background": "#1a1c1c",
        "primary-fixed-dim": "#adc6ff",
        background: "#f9f9f9",
        "surface-tint": "#005bc1",
        "on-tertiary": "#ffffff",
        error: "#ba1a1a",
        "inverse-on-surface": "#f0f1f1",
        "inverse-primary": "#adc6ff",
        "on-secondary-container": "#fffbff",
        "tertiary-container": "#c64f00",
        "on-surface": "#1a1c1c",
        "secondary-fixed": "#e2dfff",
        "inverse-surface": "#2f3131",
        "surface-container-low": "#f3f3f3",
        surface: "#f9f9f9",
        "secondary-container": "#6664e4",
        "on-surface-variant": "#414755",
        "error-container": "#ffdad6",
        "surface-container-high": "#e8e8e8",
        secondary: "#4c4aca",
        "on-secondary": "#ffffff",
        "outline-variant": "#c1c6d7",
        "secondary-fixed-dim": "#c2c1ff",
        "on-primary-container": "#fefcff",
        tertiary: "#9e3d00",
        "primary-fixed": "#d8e2ff",
        "primary-container": "#0070eb",
        "surface-dim": "#dadada",
        outline: "#717786",
        "on-tertiary-container": "#fffbff",
        "on-error-container": "#93000a",
        "on-error": "#ffffff",
        "surface-container": "#eeeeee",
        "surface-container-lowest": "#ffffff",
        "surface-bright": "#f9f9f9",
        primary: "#0058bc",
        "surface-variant": "#e2e2e2",
      },
      borderRadius: {
        sm: "0.5rem",
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      spacing: {
        unit: "8px",
        "stack-sm": "16px",
        "stack-md": "32px",
        "stack-lg": "80px",
        "container-max": "1024px",
        gutter: "24px",
        "margin-mobile": "24px",
        "margin-desktop": "64px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.01em", fontWeight: "500" }],
      },
      boxShadow: {
        ambient: "0px 10px 40px rgba(0, 0, 0, 0.04)",
        "ambient-md": "0px 8px 30px rgba(0, 0, 0, 0.06)",
        "ambient-lg": "0px 20px 60px rgba(0, 0, 0, 0.08)",
        primary: "0px 8px 24px rgba(0, 88, 188, 0.20)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0058bc 0%, #4c4aca 100%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s infinite linear",
      },
      maxWidth: {
        container: "1024px",
      },
    },
  },
  plugins: [],
};

export default config;
