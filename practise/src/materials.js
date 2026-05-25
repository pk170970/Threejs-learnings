import * as THREE from 'three';
import './style.css';

import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Pane } from 'tweakpane';

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
scene.add(camera);
const pane = new Pane();

const canvas = document.getElementById('canvas');
const controls = new OrbitControls(camera, canvas);
const fog = new THREE.Fog('white', 1, 10);
// scene.fog = fog;
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight('0xffffff', 100);
pointLight.position.setScalar(2);

scene.add(pointLight);

const material1 = new THREE.MeshBasicMaterial({
    color: 'red',
    transparent: true,
    opacity: 0.5
});


const material2 = new THREE.MeshBasicMaterial({
    color: 'red'
});
material2.side = THREE.DoubleSide;



//Mesh Phong material
// const material = new THREE.MeshPhongMaterial({
//     color: '#049ef4',
// });

// pane.addBinding(material, 'shininess', 
//     {
//         min: 0,
//         max: 100,
//         step: 1,
//         label: 'Shininess'
//     }
// )

//Mesh Standard material

// const material = new THREE.MeshStandardMaterial({
//     color: '#049ef4',
// });

// pane.addBinding(material, 'roughness', 
//     {
//         min: 0,
//         max: 100,
//         step: 1,
//         label: 'roughness'
//     }
// )

const material = new THREE.MeshPhysicalMaterial({
    color: '#049ef4',
});

pane.addBinding(material, 'reflectivity', 
    {
        min: 0,
        max: 100,
        step: 1,
        label: 'Reflection'
    }
)

const cubeGeometry1 = new THREE.BoxGeometry(1, 1, 1);
const cubeGeometry2 = new THREE.BoxGeometry(1, 1, 1);
const planegeomtry = new THREE.PlaneGeometry(1, 1);
const knowGeometry = new THREE.TorusKnotGeometry(5, 1, 100, 16);

const mesh1 = new THREE.Mesh(cubeGeometry1, material1);
const mesh2 = new THREE.Mesh(cubeGeometry2, material2);
const mesh3 = new THREE.Mesh(planegeomtry, material2);
const mesh4 = new THREE.Mesh(knowGeometry, material);
// mesh2.position.x = 2;
// mesh3.position.x = -2;
mesh4.scale.setScalar(0.3);
// scene.add(mesh1);
// scene.add(mesh2);
// scene.add(mesh3); // by default, 2d objects material are visible only on front side, to make them backside
// we need to set constant
scene.add(mesh4);
// scene.background = new THREE.Color('OxFFFFFF');

camera.position.z = 5;
controls.update();
controls.enableDamping = true;
controls.autoRotate = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

function animation() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}

animation()