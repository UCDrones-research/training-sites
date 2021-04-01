module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        main: ['Megrim'],
        body: ['Marvel']
      },
      backgroundImage: {
        //'bgpattern': "url('../icons/bg.svg')",
      },
      height: {
        header: '10vh',
        content:'90vh',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
