module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'page1': "url('assets/img/bg1.png')",
      }),
      colors: {
        primary: '#007aff',
        main: {
          100: '#01374A',
          200: '#006687',
          300: '#0093AF',
          400: '#E49576',
          500: '#CE5423',
          600: '#6F252A',
        },
        bg: {
          100: '#000153',
          200: '#007edd',
        }
      },
      fontFamily: {
        quicksand: ['quicksand'],
        noto: ['Noto Sans'],
        kanit: ['Kanit']
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
