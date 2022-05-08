module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        default: '#B196D7',
      },
      'white':"#fff",
      gray: {
        "100": '#f3f4f6',
        "200": '#e5e7eb',
        "300":"#dbdbdb",
        "900": '#dedace',
      },
      red:{
        "100": '#e6152b',
      }

    }
  },
  plugins: [],
}
