(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Layers, canvas, getFrameByIndex, getIndexByFrame, i, j, layer, layerAtIndex, listHeight, listWidth, yDistance;

Framer.Device = new DeviceComponent({});

Framer.Device.deviceType = 'google-nexus-4';

listWidth = Framer.Device.screen.width - 80;

listHeight = 130;

yDistance = listHeight + 10;

Framer.Device.screen.backgroundColor = '#eee';

canvas = new Layer({
  width: listWidth,
  height: 400,
  backgroundColor: "transparent",
  clip: false
});

canvas.parent = Framer.Device.screen;

canvas.x = Align.center;

canvas.y = Align.center;

window.onresize = function() {
  canvas.x = Align.center;
  return canvas.y = Align.center;
};

Layers = [];

getFrameByIndex = function(index) {
  return {
    y: index * yDistance,
    height: listHeight
  };
};

getIndexByFrame = function(frame) {
  var index;
  return index = parseInt((frame.y + (frame.height / 2)) / yDistance);
};

layerAtIndex = function(index) {
  var j, layer, len;
  for (j = 0, len = Layers.length; j < len; j++) {
    layer = Layers[j];
    if (layer.listIndex === index) {
      return layer;
    }
  }
};

for (i = j = 0; j <= 3; i = ++j) {
  layer = new Layer({
    width: listWidth,
    height: listHeight,
    y: i * yDistance,
    clip: false,
    borderRadius: 4,
    superLayer: canvas
  });
  layer.listIndex = i;
  layer.draggable.enabled = true;
  layer.draggable.speedX = 0;
  layer.draggable.speedY = 1;
  layer.backgroundColor = "rgba(255,255,255,1)";
  layer.html = layer.listIndex + 1;
  layer.style.color = "#999";
  layer.style.lineHeight = listHeight + 6 + "px";
  layer.style.paddingLeft = "32px";
  layer.style.fontSize = "24px";
  layer.style.fontWeight = "400";
  layer.shadowY = 1;
  layer.shadowBlur = 2;
  layer.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
  Layers.push(layer);
  layer.on(Events.DragMove, function(event, layer) {
    var currentIndex, hoveredLayer;
    currentIndex = getIndexByFrame(layer.frame);
    if (currentIndex !== layer.listIndex && currentIndex >= 0 && currentIndex <= 3) {
      hoveredLayer = layerAtIndex(currentIndex);
      hoveredLayer.listIndex = layer.listIndex;
      layer.listIndex = currentIndex;
      layer.html = layer.listIndex + 1;
      hoveredLayer.html = hoveredLayer.listIndex + 1;
      hoveredLayer.animateStop();
      return hoveredLayer.animate({
        properties: getFrameByIndex(hoveredLayer.listIndex),
        curve: "spring(300,40,0)"
      });
    }
  });
  layer.on(Events.DragStart, function(event, layer) {
    var currentIndex;
    currentIndex = getIndexByFrame(layer);
    layer.bringToFront();
    layer.shadowColor = "rgba(0,0,0,0.2)";
    layer.animate({
      properties: {
        shadowY: 16,
        shadowBlur: 32
      },
      curve: "ease",
      time: 0.4
    });
    return layer.animate({
      properties: {
        scale: 1.1
      },
      curve: "spring(600,50,0)"
    });
  });
  layer.on(Events.DragEnd, function(event, layer) {
    var currentIndex;
    layer.animateStop();
    layer.animate({
      properties: {
        scale: 1
      },
      curve: "spring(300,50,0)"
    });
    currentIndex = getIndexByFrame(layer.frame);
    if (currentIndex < 0) {
      currentIndex = 0;
    }
    if (currentIndex > 3) {
      currentIndex = 3;
    }
    layer.animate({
      properties: {
        shadowY: 1,
        shadowBlur: 2,
        y: currentIndex * yDistance
      },
      curve: "spring(300,40,0)"
    });
    return Utils.delay(0.4, function() {
      return layer.shadowColor = "rgba(0,0,0,0.2)";
    });
  });
}


},{}]},{},[1]);
