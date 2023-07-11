import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Instantiate a loader
const loader = new GLTFLoader();

const light = new THREE.AmbientLight(0xffffff, 0.8 * Math.PI);
const light2 = new THREE.DirectionalLight(0xffffff, 0.3);

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );
const scene = new THREE.Scene();

// Load a glTF resource
loader.load(
    // resource URL
    "/models/prastic.glb",
    // called when the resource is loaded
    function (gltf) {
        console.log("gltf", gltf);

        scene.add(gltf.scene);

        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Group
        // gltf.scenes; // Array<THREE.Group>
        // gltf.cameras; // Array<THREE.Camera>
        // gltf.asset; // Object

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        scene.add(light);
        scene.add(light2);

        camera.position.z = 5;

        const controls = new OrbitControls(camera, renderer.domElement);

        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    },
    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
        console.log("An error happened", error);
    }
);
