import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// Scene, Camera, Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update(); // initialize controls

// Create a 3x3x3 grid of cubes (Rubik’s cube pieces)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial(); // colors by face normals
const cubelets = [];
for (let y = 1; y >= -1; y--) {
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      const cubelet = new THREE.Mesh(boxGeometry, material);
      cubelet.position.set(x, y, z);
      // Store original position in userData (optional)
      cubelet.userData = { position: { x, y, z } };
      scene.add(cubelet);
      cubelets.push(cubelet);
    }
  }
}

// Rotate the entire scene slightly for a better initial view
scene.rotation.x = 0.5;
scene.rotation.y = 0.5;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
