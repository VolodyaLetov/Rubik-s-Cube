const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
const tile = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cubeTile = new THREE.Mesh(tile, material);
scene.add(cubeTile);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
function animate() {
  requestAnimationFrame(animate);
  cubeTile.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();
