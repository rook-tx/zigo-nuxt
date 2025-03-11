<template>
  <canvas ref="canvas" />
</template>

<script>

import { mapState } from 'pinia'
import { useDeviceStore } from '@/stores/device'

import {
  Vector2,
  WebGLRenderer,
  Scene,
  Fog,
  PerspectiveCamera,
  Raycaster,
  SpotLight,
  // TextureLoader,
  Object3D,
  TetrahedronGeometry,
  MeshPhysicalMaterial,
  // DoubleSide,
  Mesh,
} from 'three'

export default {
  data() {
    return {
      running: false,
      mousepos: [0, 0],
      accel: new Vector2(0, 0),
      rot: new Vector2(0, 0),
      lastMouse: new Vector2(0, 0),
      mouseDir: new Vector2(0, 0),
      targets: [],
      rotating: [],
			mouseDown: false
    }
  },

  computed: {
    ...mapState(useDeviceStore, ['win', 'winWidth', 'winHeight']),
  },

  watch: {
    win: {
      handler() {
        this.resize()
      },
    },
  },

  mounted() {
    this.setup()
    this.resize()
    this.start()

    window.addEventListener('mousedown', this.mousedown)

    window.addEventListener('mouseup', this.mouseup)

    window.addEventListener('mousemove', this.mousemove)

    this.$nextTick(this.render)
  },

  beforeUnmount() {
    this.stop()
  },

  methods: {
    setup() {
      if (!window.WebGLRenderingContext) {
        return
      }

      this.renderer = new WebGLRenderer({
				alpha: true,
        // antialias: false,
        canvas: this.$refs.canvas,
      })

      this.renderer.setClearColor(0x000000, 0)
      this.renderer.setPixelRatio(
        window.devicePixelRatio ? window.devicePixelRatio : 1,
      )

      this.scene = new Scene()

      this.scene.fog = new Fog(0xe92076, 1, 250);

      this.camera = new PerspectiveCamera()
      this.camera.position.z = 10.9
      // this.camera.lookAt(0, 0, 0)

      this.raycaster = new Raycaster()
      // this.scene.add(new AmbientLight(0xeeeeee));

      const light1 = new SpotLight(0x0805d5)
      light1.position.set(0, 1, 10)
			light1.intensity = 25
      this.scene.add(light1)

      const light2 = new SpotLight(0x680002)
      light2.position.set(2, -1, 40)
			light2.intensity = 25
      this.scene.add(light2)

      const light3 = new SpotLight(0xba9544)
      light3.position.set(15, -10, 30)
			light3.intensity = 25
      this.scene.add(light3)

      const light4 = new SpotLight(0xe92076)
      light4.position.set(-15, -15, 30)
			light4.intensity = 25
      this.scene.add(light4)

      const light5 = new SpotLight(0xe92076)
      light5.position.set(-15, 15, 10)
			light5.intensity = 25
      this.scene.add(light5)

      const light6 = new SpotLight(0xb86405)
      light6.position.set(-10, 10, 40)
			light6.intensity = 25
      this.scene.add(light6)

      const light7 = new SpotLight(0xb86405)
      light7.position.set(10, 10, 40)
			light7.intensity = 25
      this.scene.add(light7)

      const light8 = new SpotLight(0x79d0f9)
      light8.position.set(10, 10, 50)
			light8.intensity = 25
      this.scene.add(light8)

      this.addGeometries()
    },

    addGeometries() {
      const pi = Math.PI
      // let atexture = new TextureLoader().load(require('../images/amap.png'));

      const clutter = new Object3D()

      this.geometry = new TetrahedronGeometry(0.703)
      const geo = this.geometry

      const mat = new MeshPhysicalMaterial({
        // color: 0xffffff,
        // alphaMap: atexture,
        roughness: 0.4,
        metalness: 0.9,
        // side: DoubleSide,
        transparent: true,
        opacity: 0.5,
        // thickness: 0.1,
        // reflectivity: 0.9,
				dispersion: 0.6,
				// iridescence: 0.5,
      })

      const n = 60

      for (let r = 0; r < 10; r++) {
        for (let i = 0; i < n; i++) {
          const mesh = new Mesh(geo, mat)

          mesh.position.x = i * (1.1547 / 2)
          mesh.position.z = 0

          if (r % 2 === i % 2) {
            mesh.position.y = r - 1 / 3
            mesh.rotation.y = pi / -4
            mesh.rotation.x = pi / -5.104
            mesh.even = false
          } else {
            mesh.position.y = r
            mesh.rotation.y = pi / 4
            mesh.rotation.x = pi / 5.104
            mesh.even = true
          }

          const lower = n / 2 - (r >= 5 ? 9 - r : r) - 4
          const upper = n / 2 + (r >= 5 ? 9 - r : r) + 4

          if (r > 0 && r < 9 && i > lower && i < upper) {
            mesh.centre = true
          } else {
            mesh.centre = false
          }

          this.targets.push(mesh)
          clutter.add(mesh)
        }
      }

      this.mesh = clutter
      this.mesh.position.x = -15 * 1.1547
      this.mesh.position.y = -4.3333333

      this.scene.add(this.mesh)
    },

    update() {
      const tpos = new Vector2(
        (this.mousepos[0] / this.winWidth) * 2 - 1,
        (this.mousepos[1] / this.winHeight) * 2 - 1,
      )

      // const ty = tpos.x * Math.PI * 0.01;
      // const tx = tpos.y * Math.PI * -0.01;

      // this.camera.rotation.y += (ty - this.camera.rotation.y) / 50;
      // this.camera.rotation.x += (tx - this.camera.rotation.x) / 50;

      this.raycaster.setFromCamera(tpos, this.camera)

      const intersects = new Set(
        this.raycaster.intersectObjects(this.targets).map((i) => i.object),
      )
      const mSpeed = this.mouseDir.clone().multiplyScalar(0.02)

      for (const obj of intersects) {
        const rObj = this.rotating.find((o) => o.obj === obj)

        if (rObj) {
          rObj.speed.add(mSpeed)
        } else {
          this.rotating.push({
            obj,
            speed: mSpeed,
            idx: obj.even,
            centre: obj.centre,
          })
        }
      }

      this.rotating = this.rotating.filter((o) => o.speed.length() > 1e-4)
      this.rotating.forEach(({ obj, speed, idx, centre }) => {
        if (centre) {
          obj.rotation.y -= speed.x * 0.1
          obj.rotation.x -= speed.y * 0.1
        } else if (!centre && idx) {
          obj.rotation.y = Math.PI / 4 - speed.x * 0.3
          obj.rotation.x = Math.PI / 5.104 - speed.y * 0.3
        } else {
          obj.rotation.y = -(Math.PI / 4 - speed.x * 0.3)
          obj.rotation.x = -(Math.PI / 5.104 - speed.y * 0.3)
        }

        // obj.rotation.y = Math.PI / 4 - speed.x * 0.3;
        // obj.rotation.z = Math.PI - speed.y * 0.3;

        speed.x -= speed.x / 50
        speed.y -= speed.y / 50
      })

      // this.camera.lookAt(0, 0, 0)
    },

    render() {
      if (!this.running) {
        return
      }

      this.update()
      this.renderer.render(this.scene, this.camera)

      requestAnimationFrame(this.render)
    },

    resize() {
      const w = this.winWidth
      const h = this.winHeight

      if (this.camera) {
        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
      }

			if (this.$refs.canvas) {
				this.$refs.canvas.width = w
				this.$refs.canvas.height = h
			}

      if (this.renderer) {
	      this.renderer.setSize(w, h)
			}
    },

    stop() {
      this.running = false
    },

    start() {
      this.running = true
    },

		mousedown(e) {
      this.lastMouse.x = e.clientX
      this.lastMouse.y = e.clientY
      this.mouseDown = true
    },

		mouseup() {
      this.mouseDown = false
    },

		mousemove(e) {
      this.mousepos = [e.clientX, this.winHeight - e.clientY]

      const deltaX = this.lastMouse.x - e.clientX
      const deltaY = this.lastMouse.y - e.clientY

      this.mouseDir.x = deltaX
      this.mouseDir.y = deltaY

      this.lastMouse.x = e.clientX
      this.lastMouse.y = e.clientY

      if (this.mouseDown) {
        this.accel.x += (deltaX / this.winWidth) * 0.1
        this.accel.y += (deltaY / this.winHeight) * 0.1
      }
    }
  },
}
</script>
