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
      spacing: {
        101: '55rem',
        100: '50rem',
        94: '25rem',
        95: '29.5rem',
        96: '30rem',
        97: '34rem',
        98: '39.5rem',
        99: '45rem',
      },
      fontFamily: {
        quicksand: ['quicksand'],
        noto: ['Noto Sans'],
        kanit: ['Kanit'],
        fredoka: ['Fredoka One'],
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
