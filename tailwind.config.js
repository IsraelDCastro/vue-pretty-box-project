/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFEBEB",
          100: "#FECDCD",
          200: "#FEAFB0",
          300: "#FD9092",
          400: "#FD7275",
          500: "#FC5457",
          600: "#F22C30",
          700: "#E70409",
          800: "#B50307",
          900: "#830204"
        },
        secondary: {
          50: "#FFFAFA",
          100: "#FDD3D3",
          200: "#FCACAD",
          300: "#FA8486",
          400: "#F95D60",
          500: "#F73639",
          600: "#DB1F22",
          700: "#BF080A",
          800: "#8E0608",
          900: "#5D0405"
        },
        tertiary: {
          50: "#FAF6FE",
          100: "#E6DBEF",
          200: "#D3BFE0",
          300: "#BFA4D1",
          400: "#AB89C2",
          500: "#986DB2",
          600: "#8452A3",
          700: "#703794",
          800: "#5D1B85",
          900: "#490076"
        }
      },
      transitionDuration: {
        0: "0ms",
        400: "400ms",
        600: "600ms"
      },
      zIndex: {
        "-1": -1,
        1: 1,
        5: 5
      },
      inset: {
        "-100": "-100%"
      },
      screens: {
        tablet: "989px",
        "max-md": { max: "988px" },
        mb: { max: "500px" }
      },
      borderWidth: {
        6: "6px"
      },
      boxShadow: {
        alert: "0 6px 26px rgba(0, 0, 0, 0.1)",
        base: "0 3px 20px rgba(0, 0, 0, 0.05)"
      },
      minHeight: {
        24: "6rem",
        "3-5": "14px"
      },
      listStyleType: {
        circle: "circle"
      }
    },
    fontFamily: {
      sans: ["Nunito Sans", "Lato", "Inter", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"],
      body: ["Nunito", "Lato", '"Helvetica Neue"', "Helvetica ", "Arial", "sans-serif"]
    }
  },
  plugins: []
};
