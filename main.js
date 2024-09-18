import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

//canvas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()

// objects
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshNormalMaterial(); 

// creating text
const fontLoader = new FontLoader()
fontLoader.load(
  '/fonts/helvetiker_bold.typeface.json', 
  (font) => {
    //textGeometry
    const textGeometry = new TextGeometry('Hello World',{
      font,
      size: 0.5,
      depth: 0.5,
      curveSegments: 6,
		  bevelEnabled: true,
		  bevelThickness: 0.03,
		  bevelSize: 0.02,
		  bevelOffset: 0,
		  bevelSegments: 4
    })
    textGeometry.center()
    const text = new THREE.Mesh(textGeometry, material)
    scene.add(text)
  })

// creating lots of cubes
for(let i = 0; i < 100; i++){
  const cubes = new THREE.Mesh(cubeGeometry, material)

  //creating some randomness (positioning/rotation/scale)
  cubes.position.x =  (Math.random() - 0.5) * 20
  cubes.position.y =  (Math.random() - 0.5) * 20
  cubes.position.z =  (Math.random() - 0.5) * 20

  cubes.rotation.x = Math.random()
  cubes.rotation.y = Math.random()

  const randomScale = Math.random()
  cubes.scale.x = randomScale
  cubes.scale.y = randomScale
  cubes.scale.z = randomScale

  scene.add(cubes)
}

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.z = 3
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
// orbit controls
const controls = new OrbitControls(camera, canvas)
const animateOrbitControls = () => {
  controls.enableDamping = true
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animateOrbitControls)
}
animateOrbitControls()
