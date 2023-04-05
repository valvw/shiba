import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';



var clock = new THREE.Clock();


const scene = new THREE.Scene();


// Init scene
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 4, 7);

const loader = new FBXLoader();
const url = require('./LP_ShibaInu.fbx');

const textureLoader = new THREE.TextureLoader();

var diffuse = textureLoader.load(require('./textures/LP_ShibaInu_1002_Diffuse.png'));
var specular = textureLoader.load(require('./textures/LP_ShibaInu_1002_Specular.png'));
var normal = textureLoader.load(require('./textures/1002_normal_base.png'));
//var gloss = textureLoader.load(require('./textures/LP_ShibaInu_1002_Glossiness.png'));
var ao = textureLoader.load(require('./textures/LP_ShibaInu_1002_AO.png'));

diffuse.wrapS = diffuse.wrapT = THREE.RepeatWrapping;
//texture.repeat.set(0.02,0.02);




const material = new THREE.MeshPhongMaterial( {
  map: diffuse,
  normalMap: normal,
  specularMap: specular,
  aoMap: ao,
  //alphaMap: gloss,
  //displayScale: 0.1


} );






loader.load(url, function (object) {
  object.traverse((c) => {
    if (c.isMesh) {
           //console.log( c.geometry.attributes.uv );

           c.material = material;
           //c.material.map = diffuse;
           //c.flatshading = true;
           //c.castShadow = true;
           //c.receiveShadow = false;
           //depthWrite: false

          }
  object.position.copy(new THREE.Vector3(0.5, 0.5, 0.5));        
  scene.add(object);
  var mixer = new THREE.AnimationMixer(object);

});
});






const renderer = new THREE.WebGLRenderer({
  //antialias: true, 
  alpha: true,
 
  
} );


renderer.shadowMap.enabled = true;

renderer.setPixelRatio(window.devicePixelRatio);


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);
light.position.set(2, 2, 4);


// Set up orbital camera controls.
let controls = new OrbitControls(camera, renderer.domElement);
controls.update();


// Render loop
function update() {
  requestAnimationFrame(update);
  renderer.render(scene, camera);

  var time = clock.getDelta();

}
update();





