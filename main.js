import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// const canvas = document.querySelector('.scene')
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, 
//     window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
// 	antialias: true,
// })

// renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setSize(window.innerWidth, window.innerHeight)

// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.enableZoom = false

// camera.position.setZ(100)
// const light = new THREE.PointLight(0xff0000, 1, 100)
// light.position.set(50, 50, 50)
// scene.add(light)

// const ambientLight = new THREE.AmbientLight(0x404040, 100)
// scene.add(ambientLight)
// renderer.render(scene, camera)

// // const loader = new GLTFLoader();

// // // loader.load('obj/cactus.glb', function(gltf) {
// // //   const cactus = gltf.scene.children[0];
// // //   cactus.scale.set(0.5, 0.5, 0.5);
// // //   scene.add(gltf.scene);
// // //   renderer.render(scene, camera);
// // // });

// const geometry = new THREE.IcosahedronGeometry(10, 0)
// const material = new THREE.MeshBasicMaterial({ color: 0x76FF23 })
// const icosahedron = new THREE.Mesh(geometry, material)

// scene.add(icosahedron)

// // const sizes = {
// //     width: window.innerWidth,
// //     height: window.innerHeight
// // }

// // window.addEventListener('resize', () =>
// // {
// //     // Update sizes
// //     sizes.width = window.innerWidth
// //     sizes.height = window.innerHeight

// //     // Update camera
// //     camera.aspect = sizes.width / sizes.height
// //     camera.updateProjectionMatrix()

// //     // Update renderer
// //     renderer.setSize(sizes.width, sizes.height)
// //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// // })

// function animate()
// {
// 	requestAnimationFrame(animate)
// 	controls.update()
// 	icosahedron.rotation.x += 0.01
// 	icosahedron.rotation.y += 0.005
// 	icosahedron.rotation.z += 0.01
// 	renderer.render(scene, camera)
// }

// animate()