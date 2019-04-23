/**
 * Get Color Hex
 *
 * @param {String} color - Swatch color
 * @return {String} Hex value of swatch color
 */
export const getColorHex = color => {
  const ColorObj = {
    'antique white': '##fbf5e8',
    aqua: '#c0dddf',
    'ashley blue': '#b4c9d3',
    baltic: '#43acb3',
    beige: '#ede6d6',
    black: '#000000',
    blue: '#0b56c7',
    blush: '#ffd0dd',
    'bright white': '#FFFFFF',
    brown: '#462103',
    'burnt orange': '#e67734',
    celedon: '#c2d9d7',
    charcoal: '#5f5f5f',
    chocolate: '#462103',
    citron: '#f6f872',
    clear: '#FFFFFF',
    coral: '#e96a64',
    'coral spice': '#e96a64',
    denim: '#294782',
    eggplant: '#78668c',
    emberglow: '#e96a64',
    'faux jute': '#ede6d6',
    fog: '#d7d7d7',
    'forest green': '#00431b',
    'frost grey': '#7c7c7c',
    green: '#009933',
    grey: '#6c6c6c',
    'dark grey': '#818181',
    harbor: '#badede',
    indigo: '#2c288b',
    ivory: '#fdfced',
    'light blue': '#d1e4f2',
    light_blue: '#d1e4f2',
    'light pink': '#ffd0dd',
    'light grey': '#818181',
    'light purple': '#BFB1C6',
    lime: '#a3e044',
    linen: '#c7ae99',
    mauve: '#b99baf',
    mimosa: '#f7d61f',
    mint: '#c2d9d7',
    naked: '#f7e2b8',
    natural: '#ede6d6',
    navy: '#06236c',
    'neon pink': '#ff0096',
    'hot pink': '#ff0096',
    nirvana: '#bbacc7',
    orange: '#e67734',
    'peacoat navy': '#06236c',
    'pebble grey': '#bcbcbc',
    pewter: '#6c6c6c',
    pink: '#ff0096',
    pumpkin: '#e67734',
    purple: '#854eae',
    lilac: '#6276B8',
    quartz: '#FFFFFF',
    red: '#e71111',
    'rose smoke': '#e8d3d0',
    sage: '#badede',
    'seashell white': '#474847',
    'smoke blue': '#5f5f5f',
    'spiced coral': '#E55663',
    taupe: '#d6bda0',
    teal: '#43acb3',
    turquoise: '#43acb3',
    violet: '#854eae',
    white: '#FFFFFF',
    wine: '#732323',
    yellow: '#f7d61f',
    periwinkle: '#A7B8DF',
    bone: '#DAD1B0',
    magenta: '#E9659E',
    'crushed gravel': '#767676',
    'pink flamingo': '#E62C82',
    'light pinirvanank': '#EBD5D5',
    tan: '#B59D7F',
    smoke: '#474847',
    powder: '#F0D6C8',
    seapunk: '#00ACAD',
    'purple pink': '#D967DA',
    olive: '#60726C',
    'dusty blue': '#98B0DF',
    'black silver': '#000000',
    'black silver': '#000000',
    'palm print': '#691FF6',
    'heather grey': '#B5B1B2',
    'metallic grey': '#66625F',
    'dusty rose': '#FED4D0',
    'default title': '#FFFFFF',
  };
  return ColorObj[color];
};