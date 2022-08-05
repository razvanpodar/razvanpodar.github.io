import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
const canvas = document.querySelector('canvas.scene')
const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(window.innerWidth / -100,
    window.innerWidth / 100, window.innerHeight / 100, window.innerHeight / -100,
    1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
	antialias: true,
})

// const clearColor = new THREE.Color(0x3d4154);
// const clearColor = new THREE.Color(0x42414f);
const clearColor = new THREE.Color(0x47464a);
renderer.setClearColor(clearColor)

// const pixelRatio = window.innerWidth / window.innerHeight
// console.log("Pixel ratio: " + pixelRatio)
renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setPixelRatio(pixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const nrStars = 300
// const starColor = new THREE.Color(0xc2c1b8)
const starColor = new THREE.Color(0xfffef5)
var stars = []
var starsOffsetX = []

function generateStars()
{
    const startWidth = window.innerWidth / -100
    const endWitdh = (window.innerWidth / 100) * 3
    const startHeight = window.innerHeight / 100
    const endHeight = window.innerHeight / -100
    const startScale = 0.025;
    const endScale = 0.05;


    for (let i = 0; i < nrStars; i++)
    {
        // Math.floor(Math.random() * (max - min) ) + min;
        let x = (Math.random() * (endWitdh - startWidth)) + startWidth;    
        let y = (Math.random() * (endHeight - startHeight)) + startHeight;    
        
        // Orthogrphic camera doesn't care for depth
        // So scale is used to create the illusion of depth 
        let scale = Math.random() * (endScale - startScale) + startScale;    
        console.log(scale)
        // let star = new THREE.Vector3(x, y, z);

        // const light = new THREE.PointLight(0xff0000, 1, 100);
        // light.position.set(x, y, 10)
        // scene.add(light)
        // var sphere = new THREE.SphereGeometry(scale, 32, 32)
        // var starGeometry = new THREE.SphereGeometry(scale, 32, 32)
        var starGeometry = new THREE.OctahedronGeometry(scale)
        var material = new THREE.MeshBasicMaterial( {color: starColor});
        var star = new THREE.Mesh(starGeometry, material)

        star.position.set(x, y, -10)
        scene.add(star)

        stars.push(star)
        starsOffsetX.push(star.position.x)
    }
}

generateStars()

// const ambientLight = new THREE.AmbientLight(0x404040, 100)
// scene.add(ambientLight)
// renderer.render(scene, camera)

const directionalLight = new THREE.DirectionalLight(0xfffadb, 1);
directionalLight.position.set(-100, 5, 100)
scene.add(directionalLight);

// Workaround to illuminate Saturn's rings better
const light = new THREE.PointLight(0xfffadb, 1, 25, 2)
light.position.set(145, 5, 0)
scene.add(light)

var scroll_amount = 0
var scroll = 0

var earth = new THREE.Object3D()
var mars = new THREE.Object3D()
var jupiter = new THREE.Object3D()
var saturn = new THREE.Object3D()
var saturn_rings = new THREE.Object3D()
var uranus = new THREE.Object3D()

loader.load('models/earth.glb', (gltf) => {
    const obj = gltf.scene.getObjectByName("Sphere")
    obj.position.set(0, 0, -10)
    obj.scale.set(3, 3, 3)
    earth = obj
    scene.add(earth)
})

loader.load('models/mars.glb', (gltf) => {
    const obj = gltf.scene.getObjectByName("Sphere")
    obj.position.set(50, 0, -10)
    obj.scale.set(3, 3, 3)
    mars = obj
    scene.add(mars)
})

loader.load('models/jupiter.glb', (gltf) => {
    const obj = gltf.scene.getObjectByName("Sphere")
    obj.position.set(100, 0, -10)
    obj.scale.set(3.5, 3.5, 3.5)
    jupiter = obj
    scene.add(jupiter)
})

loader.load('models/saturn.glb', (gltf) => {
    const obj = gltf.scene.getObjectByName("Sphere")
    obj.position.set(150, 0, -10)
    obj.scale.set(4, 4, 4)
    saturn = obj
    scene.add(saturn)

    const rings = gltf.scene.getObjectByName("Rings")
    rings.position.set(150, 0, -10)
    rings.scale.set(2, 2, 2)
    saturn_rings = rings
    scene.add(saturn_rings)
})

loader.load('models/uranus.glb', (gltf) => {
    const obj = gltf.scene.getObjectByName("Sphere")
    obj.position.set(200, 0, -10)
    obj.scale.set(3, 3, 3)
    uranus = obj
    scene.add(uranus)
})

const X_LOW = 0
const X_HIGH = 20
const X_STEP = 5

addEventListener('wheel', (event) => {
    let x = event.deltaY / 100

    if (x > X_LOW)
    {
        if (scroll_amount < X_HIGH)
        {
            scroll_amount += 1
        }
    }

    if (x < X_LOW)
    {
        if (scroll_amount > X_LOW)
        {
            scroll_amount -= 1
        }
    }

    if (scroll_amount % X_STEP == 0)
    {
        scroll = scroll_amount
    }
})

addEventListener("keyup", (event) => {
    if (event.key == "ArrowLeft")
    {
        if (scroll > X_LOW)
        {
            scroll -= X_STEP
        }
    }
    if (event.key == "ArrowRight")
    {
        if (scroll < X_HIGH)
        {
            scroll += X_STEP
        }
    }
    console.log(scroll)
})

function animateCamera()
{
    if ((scroll - (camera.position.x / 10) > 0.1) || 
        (scroll - (camera.position.x / 10) < -0.1))
    {
        const target = new THREE.Vector3(scroll * 10, 0, 0)
        const cameraPos = new THREE.Vector3(camera.position.x,
            camera.position.y, camera.position.z)
        camera.position.lerp(target, 0.025)
        animateStars()
    }
    else
    {
        // Display information from html sections for each planet
    }
}

function animateStars()
{
    for (let i = 0; i < nrStars; i++)
    {
        let target = new THREE.Vector3((scroll * 10 * 0.85) + starsOffsetX[i],
            stars[i].position.y, stars[i].position.z)
        stars[i].position.lerp(target, 0.025)
    }
}

window.addEventListener('resize', (event) =>
{
    // Update camera
    // camera.left = window.innerWidth / -100
    // camera.right = window.innerWidth / 100
    // camera.top = window.innerHeight / 100
    // camera.top = window.innerHeight / -100

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)

    var pixelRatioResize = window.innerWidth / window.innerHeight
    // renderer.setPixelRatio(pixelRatioResize)
    renderer.setPixelRatio(window.devicePixelRatio)
    console.log("Pixel ratio: " + pixelRatioResize)
})

function rotate(obj, rot)
{
    obj.rotation.y += rot
}

function animate()
{
	requestAnimationFrame(animate)
    animateCamera()
    // animateStars()
    rotate(earth, 0.005)
    rotate(mars, 0.0075)
    rotate(jupiter, 0.0075)
    rotate(saturn, 0.005)
    rotate(uranus, 0.008)
    rotate(saturn_rings, 0.01)
	renderer.render(scene, camera)
}

animate()