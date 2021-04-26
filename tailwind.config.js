module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== "development",
    content: [
      "./components/**/*.js",
      "./components/**/*.jsx",
      "./pages/**/*.js",
      "./pages/**/*.jsx",
    ],
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        20: "0 0 20%",
        30: "0 0 30%",
        35: "1 1 35%",
        80: "2 2 80%",
        40: "1 1 40%",
        60: "2 2 60%",
      },
      minHeight: {
        250: "250px",
        200: "200px",
      },
      height: {
        250: "250px",
        200: "200px",
        150: "150px",
      },
      colors: {
        red: "red",
        primary: "var(--color-bg)",
        elements: "var(--color-elements)",
        secondary: "var(--color-text)",
        input: "var(--color-input)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
