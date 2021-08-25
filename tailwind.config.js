// O safelist serve para a lógica da cor dos botões no compoenete botão funcione na produção e não só em desenvolvimento, eu coloquei através de regex que essas classes nçao serão purgass quando o app for para deploy

module.exports = {
  purge: {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
      ],
    safelist: [
      /^bg-/,
      /^to-/,
      /^from-/,
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
