import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

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

// Добавляем свет
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

// Геометрия и материал
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();

const cubelets = [];

// Создание 3x3x3 куба
for (let y = 1; y >= -1; y--) {
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      const cubelet = new THREE.Mesh(boxGeometry, material);
      cubelet.position.set(x, y, z);
      cubelet.userData = { position: { x, y, z } };
      scene.add(cubelet);
      cubelets.push(cubelet);
    }
  }
}

// Поворот сцены для лучшего обзора
scene.rotation.x = 0.5;
scene.rotation.y = 0.5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
