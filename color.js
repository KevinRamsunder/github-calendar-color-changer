// swap out github's colors with our colors
function colorSwap( color='' ) {
  switch ( color.toLowerCase() ) {
    case '#eee':
    case '#eeeeee':
      return '#eeeeee';
    case '#d6e685':
      return '#85C9E6';
    case '#8cc665':
      return '#65A6C7';
    case '#44a340':
      return '#407FA3';
    case '#1e6823':
      return '#1E4A69';
    default:
      return color;
  }
};

// convert rgb( #, #, # ) to hex
function rgbToHex( rgb ) {
  return '#' + rgb.substr( 4, rgb.indexOf( ')' ) - 4 ).split( ',' ).map( 
    ( color ) => parseInt( color ).toString( 16 )
  ).join( '' );
};

// change the github map colors
function walkAndSwapMap() {
  // get the day squares on the github contribution map as an array
  const days = Array.from( document.getElementsByClassName( 'day' ) );

  days.forEach( function( day ) {
    const newColor = colorSwap( day.getAttribute( 'fill' ) );
    day.setAttribute( 'fill', newColor );
  } );
};

// change the github legend square colors
function walkAndSwapLegend() {
  // get the legend squares on the github contribution map as an array
  const legendSquares = Array.from( document.getElementsByClassName( 'legend' )[ 0 ].children );

  legendSquares.forEach( ( square ) => {
    const currentColor = rgbToHex( square.style[ 'background-color' ] );
    square.setAttribute( 'style', 'background-color:' + colorSwap( currentColor ) );
  } );
};

walkAndSwapMap();
walkAndSwapLegend();