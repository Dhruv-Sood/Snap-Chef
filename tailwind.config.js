/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      "mario-mushroom":
        "url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmFpNjg1NnFhbWcyYjM5OXU5OGNtZno3cWk1NTRmMXNweHJtaHhycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhPxS1j2VGxYMccZaX/giphy.gif')",
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lemonade", "cupcake"],
  },
};
