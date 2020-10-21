// Taken from https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries

// Media query to check min width and decide wether to show fullscreenBtn or not
const mediaQueryList = window.matchMedia('(min-width: 600px)');

function handleOrientationChange(mql) {
    if (appSettings) {
        appSettings.smallScreen = !mql.matches;
    }
}

handleOrientationChange(mediaQueryList);
mediaQueryList.addListener(handleOrientationChange);
