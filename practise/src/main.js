import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Pane } from 'tweakpane';

//Creating a scene
const scene = new THREE.Scene();

//Creating a axis helper to understand about x,y and z axis
const axesHelper = new THREE.AxesHelper(2);

//GUI for real time changing parameters like position, width, height, radius etc.
const pane = new Pane();

//Camera is the eye of user, needs to add in scene. Perspective camera is like far object seems small, near looks big. Orthographic camera 
// have same depth so from top every object looks similar no big or small
const camera = new THREE.PerspectiveCamera(
  75, //Field of view (angle made by camera to see the object)
  window.innerWidth / window.innerHeight, //aspect ration
  0.1, // near distance (below this distance, object is not visible)
  100 // far distance(far this distance, object is not visible)
);


const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });


//Primitive geometry
const geometry = new THREE.BoxGeometry(1,1,1);
// const geometry = new THREE.BoxGeometry(2, 2, 2, 4,4,4);
// const geometry = new THREE.SphereGeometry(15,32,16);
// const geometry = new THREE.PlaneGeometry(1,1,3)

//Mesh composes of geometry and material
// const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
const mesh = new THREE.Mesh(geometry, cubeMaterial);

const positionFolder = pane.addFolder({
  title: "Position",
  expanded: true
});

positionFolder.addBinding(mesh.position, 'x',{
  min: 0,
  max: 10,
  step: 0.01,
  label: 'Position x',
});

positionFolder.addBinding(mesh.position, 'y',{
  min: 0,
  max: 10,
  step: 0.01,
  label: 'Position y',
});

positionFolder.addBinding(mesh.position, 'z',{
  min: 0,
  max: 10,
  step: 0.01,
  label: 'Position z',
});

const scaleFolder = pane.addFolder({
  title: 'Scaling cube',
  expanded: true
})

scaleFolder.addBinding(
  mesh.scale, 'y',{
    min: 0,
    max: 10,
    step: 0.01,
    label: 'Scale y'
  }
)

//for simple rotation
// pane.addBinding(mesh.rotation,'x', {
//   min: 0,
//   max: 100,
//   step: 1,
//   label: 'Rotation around x'
// })

//For creating UI rotation in degree
const rotationFolder = pane.addFolder({
  title:'Rotation',
  expanded:true
})
const degreeRotation = {
  x:0,
  y:0,
  z:0
}

rotationFolder.addBinding(degreeRotation, 'x', {
  min:0,
  max: 360,
  step: 1,
  label: 'Rotation X'
})
.on('change',(ev)=>{
  mesh.rotation.x = THREE.MathUtils.degToRad(ev.value);
})


const geometryFolder = pane.addFolder({
  title: 'Changing geometry',
  expanded:true
});

let parameters = {
  width:2,
  height:2
}
//Geometry can't have objects to pass so calculating
// every time on changing units

let geometry2 = new THREE.BoxGeometry(parameters.width, parameters.height);
let cubeMaterial2 = new THREE.MeshBasicMaterial({
  color:'green',
  wireframe:true
});
let mesh2 = new THREE.Mesh(geometry2, cubeMaterial2);
mesh2.position.x = -3;
scene.add(mesh2); 

geometryFolder.addBinding(
  parameters,
  'width',
  {
    min:0,
    max: 10,
    label:'width'
  }
).on('change', (ev)=>{
  geometry2 = new THREE.BoxGeometry(parameters.width, parameters.height);
  mesh2.geometry = geometry2;
})

//Buffer Geometry -> Many inbuild or primitive geometry uses buffer geometry inside, it has lots of boilerplate code to write.
// For creating a buffer geometry, we need buffer attribute and these attributes need corrdinates to make any object.
// Those coordinates need to be stored in typed array not the random array as gpu don't like it, gpu needs raw binary memory which
// are stored continious in memory and in random array we can store any data type which is issue for gpu

// const vertices = new Float32Array([
//   3,0,0,
//   0,0,3,
//   0,3,0,

//   -3,0,0,
//   0,0,-3,
//   0,3,0,

//   0,3,0,
//   0,0,3,
//   -3,0,0,

//   0,0,-3,
//   0,3,0,
//   3,0,0

// ]);

// const bufferAttribute = new THREE.BufferAttribute(vertices, 3); // 3 is length of one coordinate like x,y,z
// const bufferGeometry = new THREE.BufferGeometry();
// bufferGeometry.setAttribute('position', bufferAttribute);

// const mesh2 = new THREE.Mesh(bufferGeometry, cubeMaterial);



//since camera is at origin and object is also at origin, so user can't see it. Need to shift camera. 
//Note: by default, camera always looks on negative z axis, so here we shifted to 5 units so object are origin is visible
camera.position.z = 5;

//Another way is to shift the camera and make it look towards object, alternate way
// camera.position.x = 5;
// camera.lookAt(cubeMesh.position);


//Once any objects, helpers are crated, need to add in scene to make it visible
// scene.add(mesh2);
// scene.add(cubeMesh);
scene.add(mesh);
scene.add(camera);
scene.add(axesHelper);

//Need a place or drawing book to draw, similarly need a canvas to make 3d objects and graphics
const canvas = document.getElementById('canvas');

//These controls enable user to move object through mouse, soothing animation on rotation and still learning
const controls = new OrbitControls(camera, canvas);

//helps in animation, instead of making object stop immediately it make them slowly stop
controls.enableDamping = true;

//Once scene and camera is set, need to pass into renderer which talks with webGL and browser to take the snapshot of 3d image and sends to browser.
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true, // everything is pixel on screen, uneveness on straight lines looks fine but diagonals are visible so making pixels color similar to background feels like straight line i.e make it looks fine grained
},);

//Size of canvas or render where 3d objects are rendered -> setting to screen size
renderer.setSize(window.innerWidth, window.innerHeight);

//Inbuild timer to check the passed time
const clock = new THREE.Clock();

//Delta is used for walking, jumping, rotation speed
// elpased time is used for time based animation like sin wave, floating, pulsing

//This function runs on every frame such that different devices has 60fps or 144fps so this runs for 60times/second to make object 3d real time

function animation() {
  controls.update();
  // const delta = clock.getDelta();
  // const elapsedTime = clock.getElapsedTime();
  // cubeMesh.rotation.z += delta * 5;
  // cubeMesh.scale.y = 3* Math.sin(elapsedTime);

  // cubeMesh.position.x = Math.sin(elapsedTime) * 2;
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}
animation();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})