import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

//canvas
const canvas = document.querySelector("canvas.webgl");
const canvasSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// objects
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const material = new THREE.MeshNormalMaterial();

// creating text
const textArray = [
  "Hello world",
  "Pretty cool, eh?",
  "Treat yourself",
  "1 + 1 = 2",
  "Enjoy :)",
];
const randomValue = Math.round(Math.random() * 4);

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
  //textGeometry
  const textGeometry = new TextGeometry(textArray[randomValue], {
    font,
    size: 0.5,
    depth: 0.5,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

// clock needed for animation
const clock = new THREE.Clock();

// creating 50 cubes
for (let i = 0; i < 50; i++) {
  // creating 50 cubes
  const cubes = new THREE.Mesh(cubeGeometry, material);
  // adding randomness
  cubes.position.x = (Math.random() - 0.5) * 10;
  cubes.position.y = (Math.random() - 0.5) * 10;
  cubes.position.z = (Math.random() - 0.8) * 10;

  cubes.rotation.x = Math.random();
  cubes.rotation.y = Math.random();

  const randomScale = Math.random() * 0.6;
  cubes.scale.x = randomScale;
  cubes.scale.y = randomScale;
  cubes.scale.z = randomScale;
  //animating cubes
  const animateCubes = () => {
    const elapsedTime = clock.getElapsedTime();
    cubes.rotation.z = elapsedTime * 0.1;
    window.requestAnimationFrame(animateCubes);
  };
  animateCubes();
  scene.add(cubes);
  // creating donuts
  const donuts = new THREE.Mesh(donutGeometry, material);
  // adding randomness
  donuts.position.x = (Math.random() - 0.5) * 10;
  donuts.position.y = (Math.random() - 0.5) * 10;
  donuts.position.z = (Math.random() - 0.5) * 10;

  donuts.rotation.x = Math.random();
  donuts.rotation.y = Math.random();

  donuts.scale.x = randomScale;
  donuts.scale.y = randomScale;
  donuts.scale.z = randomScale;
  //animating donuts
  const animateDonuts = () => {
    const elapsedTime = clock.getElapsedTime();
    donuts.rotation.x = elapsedTime * 0.8;
    window.requestAnimationFrame(animateDonuts);
  };
  animateDonuts();
  scene.add(donuts);
}
// camera
const camera = new THREE.PerspectiveCamera(
  90,
  canvasSize.width / canvasSize.height
);
camera.position.z = 4;
scene.add(camera);

// resizing & updating window
window.addEventListener("resize", () => {
  //update sizes/ratio
  canvasSize.width = window.innerWidth;
  canvasSize.height = window.innerHeight;
  camera.aspect = canvasSize.width / canvasSize.height;
  // update camera
  camera.updateProjectionMatrix();
  // update renderer
  renderer.setSize(canvasSize.width, canvasSize.height);
});

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// orbit controls
const controls = new OrbitControls(camera, canvas);
const animateOrbitControls = () => {
  controls.enableDamping = true;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animateOrbitControls);
};
animateOrbitControls();
