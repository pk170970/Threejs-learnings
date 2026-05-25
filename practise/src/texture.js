import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import './style.css';

const canvas = document.querySelector('#canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth/window.innerHeight,
    0.1,
    100
);
const controls = new OrbitControls(camera, canvas);
const texureLoader = new THREE.TextureLoader();

scene.add(camera);
camera.position.z = 10;

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cyclinderGeometry = new THREE.CylinderGeometry(1,1,1,32);
const sphereGeometry = new THREE.SphereGeometry(1,32,32);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,16);
const planeGeomtry = new THREE.PlaneGeometry(3,3);

const material = new THREE.MeshBasicMaterial();
const textureTest = texureLoader.load('textures2/1st.jpg');
textureTest.repeat.set(4,4);
// textureTest.wrapS = THREE.RepeatWrapping;
// textureTest.wrapT = THREE.RepeatWrapping;

textureTest.wrapS = THREE.MirroredRepeatWrapping;
textureTest.wrapT = THREE.MirroredRepeatWrapping;

// textureTest.wrapS = THREE.ClampToEdgeWrapping;
// textureTest.wrapT = THREE.ClampToEdgeWrapping;

material.map = textureTest;
const group = new THREE.Group();

const cubeMesh = new THREE.Mesh();
cubeMesh.geometry = cubeGeometry;
cubeMesh.material = material;
cubeMesh.position.x = 2;

const cyclinderMesh = new THREE.Mesh(cyclinderGeometry, material);
cyclinderMesh.position.x = -2;

const spherMesh = new THREE.Mesh(sphereGeometry, material);
spherMesh.position.y = 3;

const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
torusKnotMesh.position.y = -3;

const planeMesh = new THREE.Mesh(planeGeomtry, material);
material.side = THREE.DoubleSide;

// group.add(cubeMesh, spherMesh, torusKnotMesh, cyclinderMesh, planeMesh);
group.add(planeMesh);
scene.add(group);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

controls.enableDamping = true;

function animation(){
    controls.update();
    // group.rotation.x +=0.01;
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
}

animation();
