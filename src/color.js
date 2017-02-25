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

// get the background-color property and update it
function swapColorStyleProp( element ) {
  const currentColor = rgbToHex( element.style[ 'background-color' ] );
  element.setAttribute( 'style', 'background-color:' + colorSwap( currentColor ) );
};

// fancy sleep function
function sleep( ms ) {
  return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
};

// change the progress bar colors
async function walkAndSwapProgressBarColors() {
  // do an initial wait so github can fetch the data and update the DOM
  await sleep( 250 );

  // do additional busy-waiting if the loading class is present on the DOM
  const loadingBox = document.getElementById( 'js-contribution-activity' );
  while ( loadingBox.className.includes( 'loading' ) ) {
    await sleep( 250 );
  }

  // update the progress bar colors once they are on the DOM
  const progressBars = Array.from( document.getElementsByClassName( 'progress-bar' ) );
  progressBars.forEach( ( progressBar ) => {
    swapColorStyleProp( progressBar );
  } );
};

// change the github map colors
function walkAndSwapMap() {
  // get the day squares on the github contribution map as an array
  const days = Array.from( document.getElementsByClassName( 'day' ) );

  days.forEach( function( day ) {
    const newColor = colorSwap( day.getAttribute( 'fill' ) );
    day.setAttribute( 'fill', newColor );
    // attach click event for squares so we can update the progress bars once they are loaded
    day.addEventListener( 'click', walkAndSwapProgressBarColors );
  } );
};

// change the github legend square colors
function walkAndSwapLegend() {
  // get the legend squares on the github contribution map as an array
  const legendSquares = Array.from( document.getElementsByClassName( 'legend' )[ 0 ].children );

  legendSquares.forEach( ( square ) => {
    swapColorStyleProp( square );
  } );
};

walkAndSwapMap();
walkAndSwapLegend();
walkAndSwapProgressBarColors();