// Get the current URL.
function getCurrentTabUrl( callback ) {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query( queryInfo, ( tabs ) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    const tab = tabs[ 0 ];

    const url = tab.url;

    callback( tab );
  } );
};

function isGithubUrl( url ) {
  return url.includes( 'https://github.com/' );
};

// Inject script in head tag
function createScript() {
  const s = document.createElement( 'script' );
  s.src = chrome.extension.getURL( 'src/color.js' );
  s.onload = function() { this.remove(); };
  (document.head || document.documentElement).appendChild(s);
}

getCurrentTabUrl( function( tab ) {
  if ( isGithubUrl( tab.url ) ) {
    chrome.tabs.executeScript( {
      code: '(' + createScript + ')();'
    } );
  }
} );