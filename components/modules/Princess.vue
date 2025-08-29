<script setup>
// import { useDeviceStore } from '@/stores/device'

import {
  Scene,
  WebGLRenderer,
  ACESFilmicToneMapping,
  PerspectiveCamera,
  Vector3,
  PlaneGeometry,
  TextureLoader,
  RepeatWrapping,
  PMREMGenerator,
  MathUtils,
  // BoxGeometry,
  // MeshStandardMaterial,
  // Mesh,
  FogExp2,
} from 'three'
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Water } from 'three/addons/objects/Water.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const deviceStore = useDeviceStore()

const canvas = useTemplateRef('canvas')

async function init() {
  // Scene
  const renderer = new WebGLRenderer({
    canvas: canvas.value,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.6

  const scene = new Scene()

  const camera = new PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000,
  )
  camera.position.set(20, 18, 90)

  // Sun
  const sun = new Vector3()

  // Water
  const waterGeometry = new PlaneGeometry(100, 3000)

  const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new TextureLoader().load(
      'static/waternormals.jpg',
      function (texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping
      },
    ),
    sunDirection: new Vector3(),
    sunColor: 0xeeeeee,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  })

  water.rotation.x = -Math.PI / 2

  scene.add(water)

  // Skybox

    const sky = new Sky()
    sky.scale.setScalar(70)
    scene.add(sky)
    const skyUniforms = sky.material.uniforms

    sky.position.y = 9
  
    skyUniforms['turbidity'].value = 50
    skyUniforms['rayleigh'].value = 4
    skyUniforms['mieCoefficient'].value = 0.005
    skyUniforms['mieDirectionalG'].value = 0.8

    const parameters = {
      elevation: 0.5,
      azimuth: 180,
    }

    const pmremGenerator = new PMREMGenerator(renderer)
    const sceneEnv = new Scene()

    let renderTarget

    function updateSun() {
      const phi = MathUtils.degToRad(90 - parameters.elevation)
      const theta = MathUtils.degToRad(parameters.azimuth)

      sun.setFromSphericalCoords(1, phi, theta)

      sky.material.uniforms['sunPosition'].value.copy(sun)
      water.material.uniforms['sunDirection'].value.copy(sun).normalize()

      if (renderTarget !== undefined) renderTarget.dispose()

      sceneEnv.add(sky)
      renderTarget = pmremGenerator.fromScene(sceneEnv)
      scene.add(sky)

      scene.environment = renderTarget.texture
    }

    updateSun()

  // Boat

  // const geometry = new BoxGeometry(10, 12, 50)
  // const material = new MeshStandardMaterial({ roughness: 0 })

  // mesh = new Mesh(geometry, material)
  // scene.add(mesh)

  const loader = new GLTFLoader().setPath( 'static/models/' )

  const model = await loader.loadAsync( 'scene.gltf' )

  model.scene.scale.set(.85, .85, .85)
  model.scene.rotation.y = Math.PI / 2

  scene.add(model.scene)

  scene.fog = new FogExp2( 0x331144, 0.0001 );

  // Controls
  // const controls = new OrbitControls(camera, renderer.domElement)
  // controls.maxPolarAngle = Math.PI * 0.495
  // controls.target.set(0, 10, 0)
  // controls.minDistance = 50.0
  // controls.maxDistance = 200.0
  // controls.update()


  renderer.setAnimationLoop(animate)

  function animate() {
    render()
    // stats.update();
  }

  // let time = 10

  function render() {
    const time = performance.now() / 1000 

    const beat = time * (60 / 108)

    water.material.uniforms['time'].value = time
    model.scene.position.y = Math.sin(beat * 2) * 0.6 + 6.3
   
    // const travel = time * 0.00001
    // sky.position.z -= travel
    // model.scene.position.z -= travel

    const circleTime = beat / 16
    const r = 108
    camera.position.x = Math.sin(circleTime) * r
    camera.position.z = model.scene.position.z + Math.cos(circleTime) * r
    camera.position.y = Math.cos(circleTime * 2 - Math.PI) * 8 + 22

    const el = 3
    parameters.elevation =  Math.cos(circleTime * 2 - Math.PI) * el + el + 0.2
    updateSun()

    camera.lookAt(model.scene.position)

    renderer.render(scene, camera)
  }

  //

  // stats = new Stats();
  // container.appendChild( stats.dom );

  // GUI

  // const gui = new GUI();

  // const folderSky = gui.addFolder( 'Sky' );
  // folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
  // folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
  // folderSky.open();

  // const waterUniforms = water.material.uniforms;

  // const folderWater = gui.addFolder( 'Water' );
  // folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
  // folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
  // folderWater.open();

  //
  
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize)
}
  
onMounted(() => {
  init()
})

// onBeforeMount(() => {
//   window.removeEventListener('resize', onWindowResize)
// })

// "Ship JJ" (https://skfb.ly/oMKWO) by gogiart is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
</script>

<template>
  <canvas ref="canvas" />
</template>
