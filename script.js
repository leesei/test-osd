var VIEWPORT_ZOOM_MIN = 0.9;
var IMAGE_ZOOM_MAX = 2;

var tileSource = {
  Image: {
    xmlns: "http://schemas.microsoft.com/deepzoom/2008",
    Url: "http://openseadragon.github.io/example-images/highsmith/highsmith_files/",
    Format: "jpg",
    Overlap: "2",
    TileSize: "256",
    Size: {
      Height: "9221",
      Width: "7026"
    }
  }
};

window.viewer = OpenSeadragon({
  id: "openseadragon",
  tabIndex: '',
  animationTime: 0.5,
  blendTime: 0.1,
  debugMode: false,
  immediateRender: true,
  showNavigator: true,
  navigatorSizeRatio: 0.2,
  navigatorAutoFade: false,
  showNavigationControl: false,
  autoResize: true,
  constrainDuringPan: true,
  defaultZoomLevel: 1,
  minZoomImageRatio: VIEWPORT_ZOOM_MIN,
  maxZoomPixelRatio: IMAGE_ZOOM_MAX,
  gestureSettingsMouse: {
    clickToZoom: false,
    dblClickToZoom: false
  },
  gestureSettingsTouch: {
    clickToZoom: false,
    dblClickToZoom: false
  },
  showNavigationControl: false,
  showNavigator: true
});

viewer.addHandler('open', function () {
  console.log('opened');
  window.viewport = viewer.viewport;
  window.tiledImage = viewer.world.getItemAt(0);
  window.navigator = viewer.navigator;
});

function onViewChanged () {
  var viewport = viewer.viewport;
  var boundRect = viewport.viewportToImageRectangle(viewport.getBounds());
  var viewInfo = {
    // don't expose OpenSeadragon.Rect
    boundRect: {
      x: boundRect.x,
      y: boundRect.y,
      width: boundRect.width,
      height: boundRect.height
    },
    center: {
      x: (boundRect.x + boundRect.width) / 2,
      y: (boundRect.y + boundRect.height) / 2
    },
    imageZoom: viewport.viewportToImageZoom(viewport.getZoom()),
    rotation: viewport.getRotation()
  };
  console.log('view-updated', viewInfo);
}

viewer.addHandler('rotate', onViewChanged);
viewer.addHandler('animation-finish', onViewChanged);
viewer.addHandler('resize', onViewChanged);

viewer.open(tileSource);
