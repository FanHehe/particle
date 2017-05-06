var THREE = require('three');

var O = new THREE.Vector3(0, 0, 0);
var maxX = new THREE.Vector3(1000, 0, 0);
var maxY = new THREE.Vector3(0, 1000, 0);
var maxZ = new THREE.Vector3(0, 0, 1000);


var lineColor = "#ffffff";
function coordinate () {
	var x = createLine(O, maxX);
	var y = createLine(O, maxY);
	var z = createLine(O, maxZ);
	return {};
}

function createLine (point1, point2) {
	var geom = new THREE.Geometry();
	geom.vertices.push(point1);
	geom.vertices.push(point2);
	var line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: lineColor }));
	return line;
}