/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(222.2, 84%, 4.9%)",
        foreground: "hsl(210, 40%, 98%)",
        card: "hsl(222.2, 84%, 4.9%)",
        cardForeground: "hsl(210, 40%, 98%)",
        popover: "hsl(222.2, 84%, 4.9%)",
        popoverForeground: "hsl(210, 40%, 98%)",
        primary: "hsl(210, 40%, 98%)",
        primaryForeground: "hsl(222.2, 47.4%, 11.2%)",
        secondary: "hsl(217.2, 32.6%, 17.5%)",
        secondaryForeground: "hsl(210, 40%, 98%)",
        muted: "hsl(217.2, 32.6%, 17.5%)",
        mutedForeground: "hsl(215, 20.2%, 65.1%)",
        accent: "hsl(217.2, 32.6%, 17.5%)",
        accentForeground: "hsl(210, 40%, 98%)",
        destructive: "hsl(0, 62.8%, 30.6%)",
        destructiveForeground: "hsl(210, 40%, 98%)",
        border: "hsl(217.2, 32.6%, 17.5%)",
        input: "hsl(217.2, 32.6%, 17.5%)",
        ring: "hsl(212.7, 26.8%, 83.9)",
      },
    },
  },
  plugins: [],
};
