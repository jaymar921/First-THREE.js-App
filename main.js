import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

let ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
ambientLight.castShadow = true;
scene.add(ambientLight);

// directional light - parallel sun rays
let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// this.directionalLight.castShadow = true;
directionalLight.position.set(0, 32, 64);
scene.add(directionalLight);

camera.position.z = 48;

const canvasElement = document.getElementById("canvas");

const renderer = new THREE.WebGLRenderer({ canvasElement, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loadedModel;
const loader = new GLTFLoader();
loader.load(
  "./Duck.gltf",
  function (gltf) {
    loadedModel = gltf;
    console.log(gltf);
    gltf.scene.scale.set(20, 20, 20);
    scene.add(gltf.scene);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);
let d = 0;
function animate() {
  if (loadedModel) {
    loadedModel.scene.rotation.x += 0.01;
    loadedModel.scene.rotation.y += 0.01;
    loadedModel.scene.rotation.z += 0.01;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
