Clone this repo and serve it via HTTP server (e.g. `ecstatic`, `python -m SimpleHTTPServer`).  

These are exposed to `window`:
- viewer
- viewport
- tiledImage

Check [`addOverlay()`](https://github.com/leesei/test-osd-rotate/blob/overlay/script.js#L76).

### Fail case

Mouse hover the red rect.

A label is shown:
- on the left of the screen for the very first time (`wrong-pos-1.png`)
- shown with wrong placement (it seems) if I moved the image (`wrong-pos-2.png`)

### Expected case

Mouse hover the red rect.

A label is shown on the middle of the image (`expected-pos.png`).

### Hot fix

Call `viewer.updateOverlay(rect.label)` after adding the label.

