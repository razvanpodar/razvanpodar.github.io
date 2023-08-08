import './style.css'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
const canvas = document.querySelector('canvas.scene')
const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(window.innerWidth / -10,
    window.innerWidth / 10, window.innerHeight / 10, 
    window.innerHeight / -10, 1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
	antialias: true,
})

const clearColor = new THREE.Color(0x2c2a30)
renderer.setClearColor(clearColor)

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const DEVIATION = 10
const SCROLL_DEVIATION = 1

const NR_PLANETS = 5
const X_LOW = 0
const X_STEP = 4
const X_HIGH = (X_STEP * NR_PLANETS) - X_STEP

const nrStars = 3000
const starColor = new THREE.Color(0xfffef5)
var stars = []
var starsOffsetX = []

function generateStars()
{
    const startWidth = (window.innerWidth / -10) - DEVIATION;
    const endWitdh = (window.innerWidth / 10) * 3;
    const startHeight = window.innerHeight / 10;
    const endHeight = window.innerHeight / -10;
    const startScale = 0.2;
    const endScale = 0.25;

    for (let i = 0; i < nrStars; i++)
    {
        let x = (Math.random() * (endWitdh - startWidth)) + startWidth;    
        let y = (Math.random() * (endHeight - startHeight)) + startHeight;    
        
        // Orthogrphic camera doesn't care for depth
        // So scale is used to create the illusion of depth 
        let scale = Math.random() * (endScale - startScale) + startScale;  
        console.log(scale)

        var starGeometry = new THREE.OctahedronGeometry(scale);
        var material = new THREE.MeshBasicMaterial( {color: starColor});
        var star = new THREE.Mesh(starGeometry, material);

        star.position.set(x, y, -10);
        scene.add(star);

        stars.push(star);
        starsOffsetX.push(star.position.x);
    }
}

generateStars()

const directionalLight = new THREE.DirectionalLight(0xfffadb, 1);
directionalLight.position.set(-200, 100, 150);
scene.add(directionalLight);

// var earth = new THREE.Object3D()
// var mars = new THREE.Object3D()
// var jupiter = new THREE.Object3D()
// var saturn = new THREE.Object3D()
// var saturn_rings = new THREE.Object3D()
// var uranus = new THREE.Object3D()

const earthScale = 3;
const marsScale = 2.75;
const jupiterScale = 5;
const saturnScale = 3.5;
const uranusScale = 1.75;
const neptuneScale = 1.75;

const earthPosition = new THREE.Vector3(-40, 0, -10);
const marsPosition = new THREE.Vector3(-20, 0, -10);
const jupiterPosition = new THREE.Vector3(0, 0, -10);
const saturnPosition = new THREE.Vector3(20, 0, -10);
const uranusPosition = new THREE.Vector3(40, 0, -10);
const neptunePosition = new THREE.Vector3(60, 0, -10);

const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(1, 20, 20);
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

var earth = new THREE.Mesh();
var mars = new THREE.Mesh();
var jupiter = new THREE.Mesh();
var saturn = new THREE.Mesh();
// var saturn_rings = new THREE.SphereGeometry(3, 5, 5)
var uranus = new THREE.Mesh();
var neptune = new THREE.Mesh();

var earthTextureLoaded = false;
var marsTextureLoaded = false;
var jupiterTextureLoaded = false;
var saturnTextureLoaded = false;
var uranusTextureLoaded = false;

const earthTexture = textureLoader.load('models/Earth_Diffuse_8k.jpg', (load) => {
    // scene.add(earth);
    earthTextureLoaded = true;
    setupPlanets();
});
const marsTexture = textureLoader.load('models/Mars_Diffuse_6k.jpg', (load) => {
    // scene.add(mars);
    marsTextureLoaded = true;
    setupPlanets();
});
const jupiterTexture = textureLoader.load('models/Jupiter_Diffuse_4k.jpg', (load) => {
    // scene.add(jupiter);
    jupiterTextureLoaded = true;
    setupPlanets();
});
const saturnTexture = textureLoader.load('models/Saturn_Diffuse_4k.jpg', (load) => {
    // scene.add(saturn);
    saturnTextureLoaded = true;
    setupPlanets();
});
const uranusTexture = textureLoader.load('models/Uranus_Diffuse_2k.jpg', (load) => {
    // scene.add(uranus);
    uranusTextureLoaded = true;
    setupPlanets();
});

var earthMaterial   = new THREE.MeshStandardMaterial({ map: earthTexture });
var marsMaterial    = new THREE.MeshStandardMaterial({ map: marsTexture });
var jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
var saturnMaterial  = new THREE.MeshStandardMaterial({ map: saturnTexture });
var uranusMaterial  = new THREE.MeshStandardMaterial({ map: uranusTexture });

var earth = new THREE.Mesh(planetGeometry, earthMaterial);
var mars = new THREE.Mesh(planetGeometry, marsMaterial);
var jupiter = new THREE.Mesh(planetGeometry, jupiterMaterial);
var saturn = new THREE.Mesh(planetGeometry, saturnMaterial);
// var saturn_rings = new THREE.SphereGeometry(3, 5, 5)
var uranus = new THREE.Mesh(planetGeometry, uranusMaterial);
var neptune = new THREE.Mesh(planetGeometry);

function setupPlanets()
{
    if (earthTextureLoaded && marsTextureLoaded && jupiterTextureLoaded &&
        saturnTextureLoaded && uranusTextureLoaded)
    {
        // earth.position.set(0, 0, -10);
        earth.scale.set(earthScale, earthScale, earthScale);
        earth.position.copy(earthPosition);
        scene.add(earth);
    
        // mars.position.set(X_STEP * 10, 0, -10);
        mars.position.copy(marsPosition);
        mars.scale.set(marsScale, marsScale, marsScale);
        scene.add(mars);
    
        // jupiter.position.set(2 * X_STEP * 10, 0, -10);
        jupiter.position.copy(jupiterPosition);
        jupiter.scale.set(jupiterScale, jupiterScale, jupiterScale);
        scene.add(jupiter);
    
        // saturn.position.set(3 * X_STEP * 10, 0, -10);
        saturn.position.copy(saturnPosition);
        saturn.scale.set(saturnScale, saturnScale, saturnScale);
        scene.add(saturn);
    
        // uranus.position.set(4 * X_STEP * 10, 0, -10);
        uranus.position.copy(uranusPosition);
        uranus.scale.set(uranusScale, uranusScale, uranusScale);
        scene.add(uranus);

        neptune.position.copy(neptunePosition);
        neptune.scale.set(neptuneScale, neptuneScale, neptuneScale);
        scene.add(neptune);
    }
}

// setupPlanets()

// loader.load('models/earth.glb', (gltf) => {
//     const obj = gltf.scene.getObjectByName("Sphere")
//     obj.position.set(0, 0, -10)
//     obj.scale.set(3, 3, 3)
//     earth = obj
//     scene.add(earth)
// })

// loader.load('models/mars.glb', (gltf) => {
//     const obj = gltf.scene.getObjectByName("Sphere")
//     obj.position.set(X_STEP * 10, 0, -10)
//     obj.scale.set(2.75, 2.75, 2.75)
//     mars = obj
//     scene.add(mars)
// })

// loader.load('models/jupiter.glb', (gltf) => {
//     const obj = gltf.scene.getObjectByName("Sphere")
//     obj.position.set(2 * X_STEP * 10, 0, -10)
//     obj.scale.set(4, 4, 4)
//     jupiter = obj
//     scene.add(jupiter)
// })

// loader.load('models/saturn.glb', (gltf) => {
//     const obj = gltf.scene.getObjectByName("Sphere")
//     obj.position.set(3 * X_STEP * 10, 0, -10)
//     obj.scale.set(3.5, 3.5, 3.5)
//     saturn = obj
//     scene.add(saturn)

//     const rings = gltf.scene.getObjectByName("Rings")
//     rings.position.set(3 * X_STEP * 10, 0, -10)
//     rings.scale.set(1.75, 1.75, 1.75)
//     saturn_rings = rings
//     scene.add(saturn_rings)
// })

// loader.load('models/uranus.glb', (gltf) => {
//     const obj = gltf.scene.getObjectByName("Sphere")
//     obj.position.set(4 * X_STEP * 10, 0, -10)
//     obj.scale.set(3, 3, 3)
//     uranus = obj
//     scene.add(uranus)
// })

function detectMouseOver()
{

}

window.addEventListener('mousemove', (event) => {
    var vec = new THREE.Vector3(); // create once and reuse
    var pos = new THREE.Vector3(); // create once and reuse

    // vec.set((event.clientX / (window.innerWidth / 10)) * 2 - 1,
            // -(event.clientY / (window.innerHeight / 10)) * 2 + 1,
            // 0.5);
    // var x = (event.clientX / 10) - (window.innerWidth / 2);
    // var y = (event.clientY / 10) - (window.innerHeight / 2);

    var offsetX = window.innerWidth / 20;
    var offsetY = window.innerHeight / 20;

    var x = (event.clientX / 10) - offsetX;
    var y = (event.clientY / 10) - offsetY;

    vec.set(x, y, -1);

    const tutorial = document.getElementById('tutorial');
    tutorial.innerText = vec.x.toString() + ", " + vec.y.toString();

    console.log(event.clientX);
    console.log(event.clientY);

    console.log(vec.x);
    console.log(vec.y);
    
    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    var distance = -camera.position.z / vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    console.log(pos);
});

window.addEventListener('resize', (event) => {
    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)

    var pixelRatioResize = window.innerWidth / window.innerHeight
    renderer.setPixelRatio(pixelRatioResize)
    camera.updateProjectionMatrix()
});

var scroll_amount = 0
var scroll = 0

const sections_id = ["intro", "projects", "skills", "education", "contact"]
var state = 0
var stateChanged = false

function hideSection()
{
    let id = Math.floor(scroll / X_STEP)
    let past_section = document.getElementById(sections_id[id])
    past_section.classList.add("invisible")
}

addEventListener('wheel', (event) => {
    let x = event.deltaY / 100

    if (x > X_LOW)
    {
        if (scroll_amount < X_HIGH)
        {
            scroll_amount += 1

            if (scroll_amount % X_STEP == 0)
            {
                hideSection()
                scroll = scroll_amount
                stateChanged = true
            }
        }
    }

    if (x < X_LOW)
    {
        if (scroll_amount > X_LOW)
        {
            scroll_amount -= 1

            if (scroll_amount % X_STEP == 0)
            {
                hideSection()
                scroll = scroll_amount
                stateChanged = true
            }
        }
    }
})

addEventListener("keyup", (event) => {
    if (event.key == "ArrowLeft")
    {
        if (scroll > X_LOW)
        {
            hideSection()
            scroll -= X_STEP
            stateChanged = true
            scroll_amount = scroll
        }
    }
    if (event.key == "ArrowRight")
    {
        if (scroll < X_HIGH)
        {
            hideSection()
            scroll += X_STEP
            stateChanged = true
            scroll_amount = scroll
        }
    }
    console.log(scroll)
})

function checkSection()
{
    if (state != Math.floor(scroll / X_STEP) || stateChanged)
    {
        state = Math.floor(scroll / X_STEP)
        displaySection()
        console.log("Display")
        stateChanged = false
    }
}

function displaySection()
{
    let section = document.getElementById(sections_id[state])
    section.classList.remove("invisible")
    section.classList.add("visible")
    section.style.display = "block"
    for (let i = 0; i < sections_id.length; i++)
    {
        if (i != state)
        {
            let other_section = document.getElementById(sections_id[i])
            other_section.style.display = "none"
        }
    }
}

// displaySection()

function animateCamera()
{
    if ((scroll - (camera.position.x / 10) - SCROLL_DEVIATION > 0.1) || 
        (scroll - (camera.position.x / 10) - SCROLL_DEVIATION < -0.1))
    {
        const target = new THREE.Vector3((scroll * 10) - DEVIATION, 0, 0)
        const cameraPos = new THREE.Vector3(camera.position.x,
            camera.position.y, camera.position.z)
        camera.position.lerp(target, 0.035)
        animateStars()
    }
    else
    {
        checkSection()
    }
}

function animateStars()
{
    // Parallax effect.
    for (let i = 0; i < nrStars; i++)
    {
        let target = new THREE.Vector3((scroll * 10 * 0.85) + starsOffsetX[i],
            stars[i].position.y, stars[i].position.z)
        stars[i].position.lerp(target, 0.035)
    }
}

function rotate(obj, rot)
{
    obj.rotation.y += rot
}

function animate()
{
	requestAnimationFrame(animate)

    animateCamera()
    rotate(earth, 0.005)
    rotate(mars, 0.0075)
    rotate(jupiter, 0.0075)
    rotate(saturn, 0.005)
    rotate(uranus, 0.008)
    // rotate(saturn_rings, 0.01)
	renderer.render(scene, camera)
}

animate()