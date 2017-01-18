> Issue fixed in OSD 2.3

Clone this repo and serve it via HTTP server (e.g. `ecstatic`, `python -m SimpleHTTPServer`).  
Visit the page and enter the following snippets in console.

These are exposed to `window`:
- viewer
- viewport
- tiledImage

### Fail case

```js
viewport.zoomTo(tiledImage.imageToViewportZoom(2.0))
// wait for 'view-updated'
viewport.setRotation(0)
// wait for 'view-updated'
viewport.setRotation(44)
```

The tiles do not fill canvas after these operations (the white canvas background  can be seen).

Resizing the window will fix the issue, and subsequent calls to rotation will not trigger the issue.

OSD 2.1.0 does not have this issue (change the `<script>` in `index.html`).

### Success case

Single paste and execute, without waiting for `view-updated`

```js
viewport.zoomTo(tiledImage.imageToViewportZoom(2.0))
viewport.setRotation(0)
viewport.setRotation(44)
```

### Success case

Without `setRotation(0)`

```js
viewport.zoomTo(tiledImage.imageToViewportZoom(2.0))
// wait for 'view-updated'
viewport.setRotation(44)
```
