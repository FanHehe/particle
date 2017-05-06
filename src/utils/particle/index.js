require('./utils/TrackballControls');
require('./utils/GPUParticleSystem');
var dat = require('./utils/dat.min.js');
var Stat = require('./utils/stat.min.js');

export default function Particle () {
	this.camera = null;
	this.scene = null;
	this.renderer = null;
	this.particles = [];
	this.container = null;
	this.control = null;
	this.light = null;
	this.particles = {};
	this.gui = null;
	this.stat = null;
	this.init();
}

Particle.prototype.init = function () {
	this.initCamera();
	this.initScene();
	this.initRenderer();
	this.initLight();
	this.initParticle();
	
}
Particle.prototype.initParticle = function () {
	// this.particles.p = new THREE.ParticleSystem({ maxParticles: 250000 });

	var options = this.particles.options = {
		position: new THREE.Vector3(),
		positionRandomness: .3,
		velocity: new THREE.Vector3(),
		velocityRandomness: .5,
		color: 0xaa88ff,
		colorRandomness: .2,
		turbulence: .5,
		lifetime: 2,
		size: 5,
		sizeRandomness: 1
	};
	var spawnerOptions = this.particles.spawnerOptions = {
		spawnRate: 15000,
		horizontalSpeed: 1.5,
		verticalSpeed: 1.33,
		timeScale: 1
	};

	this.gui = new dat.GUI( { width: 350 } );
	this.gui.add(options, "velocityRandomness", 0, 3 );
	this.gui.add(options, "positionRandomness", 0, 3 );
	this.gui.add(options, "size", 1, 20 );
	this.gui.add(options, "sizeRandomness", 0, 25 );
	this.gui.add(options, "colorRandomness", 0, 1 );
	this.gui.add(options, "lifetime", .1, 10 );
	this.gui.add(options, "turbulence", 0, 1 );
	this.gui.add(spawnerOptions, "spawnRate", 10, 30000 );
	this.gui.add(spawnerOptions, "timeScale", -1, 1 );

	this.stat = new Stat();
}

Particle.prototype.initRenderer = function () {
	//生成渲染器的对象
	this.renderer = new THREE.WebGLRenderer();
}

Particle.prototype.initScene = function () {
	//声明场景
	this.scene = new THREE.Scene();
	//将相机装加载到场景
	this.scene.add(this.camera);
}

Particle.prototype.initCamera = function () {
	//四个参数值分别代表:视野角：fov  纵横比：aspect 相机离视体最近的距离：near 相机离视体最远的距离：far
	this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000);
	//设置相机位置,默认位置为:0,0,0.
	this.camera.position.z = 1000;
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
}

Particle.prototype.initLight = function () {
	this.light = new THREE.DirectionalLight(0xffffff, 1);
	this.light.castShodow = true;
	this.light.position.set(-5, 2, 3);
	this.light.shadow.camera.near = 0;
	this.light.shadow.camera.far = 200;
	this.light.shadow.camera.left = -400;
	this.light.shadow.camera.right = 400;
	this.light.shadow.camera.top = 300;
	this.light.shadow.camera.bottom = -300;
	this.light.shadow.camera = true;
	this.scene.add(this.light);
	var geom = new THREE.CubeGeometry(800, 200, 200);
	var box = new THREE.Mesh(geom, new THREE.MeshLambertMaterial({ color: 0xffffff }));
	this.scene.add(box);
}

Particle.prototype.insertInto = function (container) {
	if (/string|number/.test(typeof container)) container = document.querySelector(container);
	if (!container) return console.log('插入失败');
	this.container = container;
	this.autoSize();
	this.control = new THREE.TrackballControls(this.camera, this.renderer.domElement);
	this.control.addEventListener('change', this.render.bind(this));
	this.container.appendChild(this.renderer.domElement);
	this.container.appendChild(this.stat.dom);
	this.animate();
}

Particle.prototype.setSize = function (width, height) {
	if (typeof width === "object") { height = width.height; width = width.width; }
	var oldSize = this.renderer.getSize();
	var oldWidth = oldSize.width;
	var oldHeight = oldSize.height;
	width = width || oldWidth;
	height = height || oldHeight;
	this.renderer.setSize(width, height);
}

Particle.prototype.autoSize = function () {
	var width = this.container.clientWidth;
	var height = this.container.clientHeight;
	this.setSize(width, height);
}

Particle.prototype.render = function () {
	this.renderer.render(this.scene, this.camera);
}

Particle.prototype.animate = function () {
	if (this.control) this.control.update();
	if (this.renderer) this.renderer.render(this.scene, this.camera);
	if (this.stat) this.stat.update();
	requestAnimationFrame(this.animate.bind(this));
}