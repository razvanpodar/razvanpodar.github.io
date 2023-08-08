import "./style.css";
import * as THREE from "three";
import { Planet } from "./planet";

const canvas = document.querySelector("canvas.scene");
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.OrthographicCamera(-window.innerWidth,
    window.innerWidth, window.innerHeight, -window.innerHeight,
    1, 1000);
// const camera = new THREE.PerspectiveCamera(20,
//     window.innerWidth / window.innerHeight, 10, 7500);

camera.position.set(0, 0, 500);
// camera.position.set(0, 0, 5000);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

const cosmicBgColor = new THREE.Color(0x2c2a30);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Star generation

const DEVIATION = 10
const SCROLL_DEVIATION = 1

const NR_PLANETS = 5
const X_LOW = 0
const X_STEP = 4
const X_HIGH = (X_STEP * NR_PLANETS) - X_STEP

const nrStars = 300
const starColor = new THREE.Color(0xfffef5)
var stars = []
var starsOffsetX = []

function generateStars()
{
    const startWidth = -window.innerWidth;
    const endWitdh = window.innerWidth;
    const startHeight = window.innerHeight;
    const endHeight = -window.innerHeight;
    const startScale = 1;
    const endScale = 5;

    for (let i = 0; i < nrStars; i++)
    {
        let x = (Math.random() * (endWitdh - startWidth)) + startWidth;    
        let y = (Math.random() * (endHeight - startHeight)) + startHeight;    
        
        // Orthogrphic camera doesn't care for depth
        // So scale is used to create the illusion of depth 
        let scale = Math.random() * (endScale - startScale) + startScale;  
        // console.log(scale)

        var starGeometry = new THREE.OctahedronGeometry(scale);
        var material = new THREE.MeshBasicMaterial({ color: starColor });
        var star = new THREE.Mesh(starGeometry, material);

        star.position.set(x, y, -10);
        scene.add(star);

        stars.push(star);
        starsOffsetX.push(star.position.x);
    }
}

const sunScale = 500;
// const sunPosition = new THREE.Vector3(-window.innerWidth, -300, -5);
// const sunGeometry = new THREE.CircleGeometry(1, 64);
// // const sunGeometry = new THREE.TorusGeometry(1, 1, 3, 64);
// // const sunGeometry = new THREE.SphereGeometry(1, 32, 64);
// const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xe6db43,
//     transparent: false, opacity: 0 });
// const sunHoverMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// var sun = new THREE.Mesh(sunGeometry, sunMaterial);

// const earthScale = 100;
// const earthPosition = new THREE.Vector3(-200, -300, -5);
// // const planetGeometry = new THREE.SphereGeometry(1, 20, 20);
// const planetGeometry = new THREE.RingGeometry(0.9, 1, 100, 20);
// const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const hoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
// // const planetGeometry = new THREE.CircleGeometry(1, 32);
// var earth = new THREE.Mesh(planetGeometry, material);


// const planetGeometry = new THREE.RingGeometry(0.9, 1, 100, 20);

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const directionalLight = new THREE.DirectionalLight(0xfffadb, 1);
// directionalLight.position.set(-WIDTH, -300, 20);
directionalLight.position.set(-WIDTH / 2, 0, 500);

scene.add(directionalLight);

// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new THREE.AmbientLight(color, intensity);
// scene.add(light);

const planetY = -300;
const planetZ = -5;

const planets = []

planets.push(new Planet(new THREE.Vector3(-WIDTH, -300, -5), sunScale,
                        new THREE.MeshBasicMaterial({ color: 0xe3b50e }),
                        new THREE.MeshBasicMaterial({ color: 0xff00ff })));

planets.push(new Planet(new THREE.Vector3(-0.5 * WIDTH, -300, -5), 90,
                        new THREE.MeshStandardMaterial({ color: 0x9fc164 }),
                        new THREE.MeshBasicMaterial({ color: 0xff00ff })));

planets.push(new Planet(new THREE.Vector3(-0.25 * WIDTH, -300, -5), 80,
                        new THREE.MeshStandardMaterial({ color: 0xbd5a3a }),
                        new THREE.MeshBasicMaterial({ color: 0xff00ff })));

planets.push(new Planet(new THREE.Vector3(0 * WIDTH, -300, -5), 100,
                        new THREE.MeshStandardMaterial({ color: 0x4d74b3 }),
                        new THREE.MeshBasicMaterial({ color: 0xff00ff })));

planets.push(new Planet(new THREE.Vector3(0.25 * WIDTH, -300, -5), 75,
                        new THREE.MeshStandardMaterial({ color: 0xc97739 }),
                        new THREE.MeshBasicMaterial({ color: 0xff00ff })));

planets.push(new Planet(new THREE.Vector3(0.5 * WIDTH, -300, -5), 120,
                        new THREE.MeshStandardMaterial({ color: 0xc3924f }),
                        new THREE.MeshBasicMaterial({ color: 0xff00ff })));

planets.push(new Planet(new THREE.Vector3(0.75 * WIDTH, -300, -5), 100,
                        new THREE.MeshStandardMaterial({ color: 0x46bdad }),
                        new THREE.MeshBasicMaterial({ color: 0xff00ff })));


const planetSLGeometry = new THREE.ConeGeometry(1, 3, 32);
const planetSLMaterial = new THREE.MeshBasicMaterial({ color: 0x67e6e6,
    transparent: true, opacity: 0.35 });
const planetSL = new THREE.Mesh(planetSLGeometry, planetSLMaterial);

// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
 
// Planets
// const planet1Scale = 90;
// const planet1Position = new THREE.Vector3(-0.5 * WIDTH , -300, -5);
// const planet1Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const planet1HoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

// var planet1 = new THREE.Mesh(planetGeometry, planet1Material);

// const planet2Scale = 80;
// const planet2Position = new THREE.Vector3(-0.25 * WIDTH, -300, -5);
// const planet2Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const planet2HoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

// var planet2 = new THREE.Mesh(planetGeometry, planet2Material);

// const planet3Scale = 100;
// const planet3Position = new THREE.Vector3(0 * WIDTH, -300, -5);
// const planet3Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const planet3HoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

// var planet3 = new THREE.Mesh(planetGeometry, planet3Material);

// const planet4Scale = 75;
// const planet4Position = new THREE.Vector3(0.25 * WIDTH, -300, -5);
// const planet4Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const planet4HoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

// var planet4 = new THREE.Mesh(planetGeometry, planet4Material);

// const planet5Scale = 120;
// const planet5Position = new THREE.Vector3(0.5 * WIDTH, -300, -5);
// const planet5Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const planet5HoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

// var planet5 = new THREE.Mesh(planetGeometry, planet5Material);

// const planet6Scale = 100;
// const planet6Position = new THREE.Vector3(0.75 * WIDTH, -300, -5);
// const planet6Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const planet6HoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

// var planet6 = new THREE.Mesh(planetGeometry, planet5Material);


// const sections_id = ["animation", "intro", "experience", "projects", "skills",
//                      "education", "contact"]

const sectionsID = ["animation", "intro", "experience", "projects", "skills",
                     "education", "contact"]

var activeSection = 0;

window.addEventListener('mousemove', (event) => {
    var mousePosition = new THREE.Vector3();

    var offsetX = window.innerWidth / 2;
    var offsetY = window.innerHeight / 2;

    var x = (event.clientX) - offsetX;
    var y = -((event.clientY) - offsetY);

    mousePosition.set(x, y, -10);

    const tutorial = document.getElementById('tutorial');
    tutorial.innerText = mousePosition.x.toString() + ", "
                        + mousePosition.y.toString();
    
    for (let i = 0; i < planets.length; i++)
    {
        let isHover = false;
        isHover = planets[i].checkHover(mousePosition);

        if (isHover)
        {
            displaySectionHeader(i);
            
            // displaySpotLight(i);
        }
        else
        {
            hideSectionHeader(i);
            // planetSL.visible = false;
        }
    }
});

const LEFT_CLICK = 0;
var state = 0;

window.addEventListener('mousedown', (event) => {
    if (event.button == LEFT_CLICK)
    {
        var mousePosition = new THREE.Vector3();

        var offsetX = window.innerWidth / 2;
        var offsetY = window.innerHeight / 2;
    
        var x = (event.clientX) - offsetX;
        var y = -((event.clientY) - offsetY);
    
        mousePosition.set(x, y, -10);

        for (let i = 0; i < planets.length; i++)
        {
            let isHover = false;
            isHover = planets[i].checkHover(mousePosition);
    
            if (isHover)
            {
                console.log("Planet " + i + "clicked.");
                state = i;
                hideSectionHeader(i);
                // displaySectionHeader(i);
                displaySection(i);
                // displaySpotLight(i);
            }
            else
            {
                hideSectionHeader(i);
                hideSection(i);
                // planetSL.visible = false;
            }

        // camera.position.set(0, 0, 100);
        // camera.left = -500;
        // camera.right = 500;
        // camera.bottom = 500;
        // camera.top = -500;
        // camera.updateProjectionMatrix();
        // cube.position.set(-500, -500, -5);
        }
    }
});

// TODO: update renderer when resize happens
//       or don't allow resizing

function displaySectionHeader(id)
{
    let section = document.getElementById(sectionsID[id] + "-header");

    // section.classList.remove("invisible");
    // section.classList.add("visible");
    section.setAttribute("class", "visible");

    section.style.display = "block";

    for (let i = 0; i < sectionsID.length; i++)
    {
        if (i != id)
        {
            let other_section = document.getElementById(sectionsID[i]);
            other_section.style.display = "none";
        }
    }
}

function displaySection(id)
{
    let section = document.getElementById(sectionsID[id]);

    // section.classList.remove("invisible");
    // section.classList.add("visible");
    section.setAttribute("class", "visible");

    section.style.display = "block";

    for (let i = 0; i < sectionsID.length; i++)
    {
        if (i != id)
        {
            let other_section = document.getElementById(sectionsID[i]);
            other_section.style.display = "none";
        }
    }
}

function hideSectionHeader(id)
{
    // let id = Math.floor(scroll / X_STEP);
    let past_section = document.getElementById(sectionsID[id] + "-header");

    // console.log(id);

    past_section.setAttribute("class", "invisible");
    // past_section.classList.remove("visible");
    // past_section.classList.add("invisible");
}

function hideSection(id)
{
    // let id = Math.floor(scroll / X_STEP);
    let past_section = document.getElementById(sectionsID[id]);

    // console.log(id);

    past_section.setAttribute("class", "invisible");
    // past_section.classList.remove("visible");
    // past_section.classList.add("invisible");
}

// function displaySpotLight(id)
// {
//     let positionSL = planets[id].position;
//     let scaleSLTemp = planets[id].defaultScale;
//     let scaleSL = new THREE.Vector3().copy(scaleSLTemp).multiplyScalar(0.8);
//     planetSL.scale.copy(scaleSL);
//     planetSL.position.set(positionSL.x, positionSL.y + (scaleSL.y * 2), 250);
//     // planetSL.visible = true;
// }

function setup()
{
    renderer.setClearColor(cosmicBgColor);

    for (let i = 0; i < planets.length; i++)
    {
        scene.add(planets[i]);
    }

    // sun.scale.set(sunScale, sunScale, sunScale);
    // sun.position.copy(sunPosition);
    // scene.add(sun);

    // scene.add(planetSL);
    // cube.visible  = true;
    // cube.scale.set(100, 100, 100);
    // cube.position.set(-500, 300, -5);
    // scene.add(cube);
    // cube.visible  = true;
}

function animate()
{
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

generateStars();
setup();

// renderer.setAnimationLoop(animate);
animate();
