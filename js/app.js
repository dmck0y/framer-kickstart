// Welcome to Framer
const _ = require('lodash-fp');

const obj = {
	width: 250,
	height: 250,
	opacity: 1,
	backgroundColor: 'red'
};

const layerA = new Layer(obj);

layerA.center();
