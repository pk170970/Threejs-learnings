import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Create a scene
const scene = new THREE.Scene();
const aspectRatio = window.innerWidth/window.innerHeight;


const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:'rgba(108, 190, 19, 0.5)', wireframe: true});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh1.position.x = 2;
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = -2;

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh1);
group.add(cubeMesh2);

group.scale.setScalar(0.5);

scene.add(group);
// group.position.x = 4;
// group.rotation.x = -60

//Create a Perspective camera
const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth/window.innerHeight,
  0.1,
  200
);

const axis = new THREE.AxesHelper(2);
// group.add(axis);
scene.add(axis);

//Since camera is at origin on top of object(Mesh) so we need to shift it to make the object visible
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1
// );

camera.position.z = 5;



//Create a renderer
const canvas = document.querySelector('#myCanvas');
const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


window.addEventListener('resize',()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

let clock = new THREE.Clock();

function animate(){
  let delta = clock.getDelta();
  group.rotation.x += THREE.MathUtils.radToDeg(0.05) * delta;
  // cubeMesh2.position.y += delta;
  cubeMesh1.position.z += delta * 0.1;
  cubeMesh1.rotation.x = -group.rotation.x; // reset rotation on x
  cubeMesh1.rotation.z += THREE.MathUtils.radToDeg(0.05) * delta;

  controls.update();
  controls.enableDamping = true;
  // controls.autoRotate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
