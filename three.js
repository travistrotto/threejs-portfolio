import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

const lighterColor = 'red'
// const lighterColor = '#969696'
// const generate = Math.round((Math.random() + 0.5) * 2)
const generate = 3
const rand2 = Math.round((Math.random() * 40) + 140)
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: document.querySelector("canvas") });
const scene = new THREE.Scene();

// Torus 1 and 2
const geometry = new THREE.TorusKnotGeometry(180, 50, 200, 200, generate);

/*  
 *  Light Material
 *  - Uncomment next two lines
 *  - Comment out the cool material to use
 *  - (optional: swap lines 285 and 286) [lighterColor]
 */
// const material = new THREE.MeshBasicMaterial({ color: lighterColor })
// material.opacity = 0.1

/*  
 *  Cool Material
 */
const material = new THREE.MeshNormalMaterial()
material.flatShading = true
material.opacity = 0.25

// Spheres
const geometry2 = new THREE.SphereGeometry(30, 30, 30)
for (let i = 0; i < 144; i++) {
    const orb = new THREE.Mesh(geometry2, material)
    orb.position.x = (Math.random() - 0.5) * 350
    orb.position.y = (Math.random() - 0.5) * 350
    orb.position.z = (Math.random() - 0.5) * 350
    // orb.rotation.z = 3
    orb.rotation.x = Math.random() * Math.PI
    orb.rotation.y = Math.random() * Math.PI
    const scale = Math.random() + 0.20
    orb.scale.set(scale, scale, scale)
    if (generate == 3) {
        scene.add(orb);
    }
}

// Object Transparency 
material.transparent = true

const mesh = new THREE.Mesh(geometry, material);
if (generate < 3) {
    scene.add(mesh);
}

// Window Sizes
function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // set render target sizes here
}
const light1 = new THREE.PointLight(0xff80C0, 2, 0);
light1.position.set(200, 100, 300);
scene.add(light1);

// Camera
const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
camera.position.z = 400;
// camera.position.y = 400;

const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    /* 
     *  Rotating Objects Algorithm
     *  x,y & z can be effected by time
     */
    mesh.rotation.x = .25 * elapsedTime
    mesh.rotation.y = .5 * elapsedTime

    if (generate == 3) {
        camera.position.x = Math.tan(elapsedTime / 4) * 20
        camera.position.y = Math.sin(elapsedTime) * 10
        camera.position.z = Math.cos(elapsedTime) * 10
    }
    // Render three.js Scene
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
const editorElem = document.querySelector("#editor");
document.querySelectorAll('button').forEach(elem => {
    elem.addEventListener('click', () => {
        editorElem.style.flexBasis = elem.dataset.size;
    });
});
const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
resizeObserver.observe(renderer.domElement, { box: 'content-box' });