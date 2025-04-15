<template>
  <div class="canvas-wrap">
    <div ref="inner" class="inner-wrap">
      <canvas ref="canvas" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'
import { usePlayerStore } from '@/stores/player'
import { useDeviceStore } from '@/stores/device'

import {
  FogExp2,
  Mesh,
  Object3D,
  TetrahedronGeometry,
  MeshPhysicalMaterial,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  SpotLight,
} from 'three'

export default {
  data() {
    const mouse = {
      pos: {
        x: 0,
        y: 0,
      },
    }

    const diameter = 250

    return {
      rate: 1,
      diameter,
      mouse,
      inited: false,
      stopped: false,
    }
  },

  computed: {
    ...mapState(useDeviceStore, ['win', 'winWidth', 'winHeight']),
    ...mapState(usePlayerStore, ['playing']),
    ...mapState(useDiscoStore, ['obj']),

    fogColor() {
      return `#${this.obj.color ?? '000000'}`
    },

    factor() {
      return this.playing ? 4 : 1
    },
  },

  watch: {
    win: {
      immediate: true,
      handler() {
        this.resize()
      },
    },
  },

  mounted() {
    window.addEventListener('mousemove', this.momo, { passive: true })
    document.addEventListener('visibilitychange', this.visibilityChange)

    if (!this.inited) {
      this.init()
    }
    this.start()
  },

  beforeUnmount() {
    this.stop()
    window.removeEventListener('mousemove', this.momo)
    document.removeEventListener('visibilitychange', this.visibilityChange)
  },

  methods: {
    setupScene() {
      this.scene.fog = new FogExp2(this.fogColor, 0.18)

      const clutter = new Object3D()
      
      this.rings = []
      const geo = new TetrahedronGeometry(.6)

      const mat = new MeshPhysicalMaterial({
        // color: '#fff',
        roughness: 0.5,
        metalness: 1,
        // side: DoubleSide,
        // transparent: true,
        // opacity: 0.75,
        // reflectivity: 0.9
      })

      const r = 6
      const ringGeo = new Object3D()
      const n = this.diameter / 10

      for (let i = 0; i < n; i++) {
        const mesh = new Mesh(geo, mat)

        mesh.position.x = (Math.random() - 0.5) * this.diameter
        mesh.position.y = (Math.random() - 0.5) * this.diameter
        mesh.position.z = (Math.random() - 0.5) * this.diameter

        ringGeo.add(mesh)
      }

      for (let i = 0; i < r; i++) {
        const ring = ringGeo.clone()

        ring.rotation.x = Math.random() * Math.PI * 2
        ring.rotation.y = Math.random() * Math.PI * 2
        ring.rotation.z = Math.random() * Math.PI * 2

        this.rings.push(ring)
        clutter.add(ring)
      }

      this.scene.add(clutter)
    },

    update() {
      this.scene.fog.color.setHex(this.fogColor)

      this.camera.position.x +=
        (this.mouse.pos.x - this.camera.position.x) * 0.02
      this.camera.position.y -=
        (this.mouse.pos.y + this.camera.position.y) * 0.02

      this.camera.lookAt(this.scene.position)

      this.rate += (this.factor - this.rate) * 0.0005

      const time = performance.now() * this.rate * 0.000008

      this.rings.forEach((r, i) => {
        r.rotation.y = time * (i < 10 ? i + 1 : -(i + 1))
      })

      // this.sphere.scale.set(this.orbScale, this.orbScale, this.orbScale);
      // this.sphere.rotation.y = Number(-time);
    },

    init() {
      if (!window.WebGLRenderingContext) {
        return
      }

      this.renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        canvas: this.$refs.canvas,
      })

      this.renderer.setClearColor(0x000000, 0)
      this.renderer.setPixelRatio(
        window.devicePixelRatio ? window.devicePixelRatio : 1,
      )

      this.scene = new Scene()

      this.camera = new PerspectiveCamera(85, 1, 1, 1000)
      this.camera.position.z = 100

      this.resize()
      this.setupScene()

      let light = new SpotLight(0x0805d5)
      light.position.set(0, 10, 40)
      // light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0x680002)
      light.position.set(-20, -1, -40)
      // light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xba9544)
      light.position.set(15, -10, 30)
      // light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xe92076)
      light.position.set(-15, -15, 30)
      // light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xe92076)
      light.position.set(-15, 15, -10)
      // light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xb86405)
      light.position.set(-10, 10, 40)
      // light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xb86405)
      light.position.set(10, 10, -40)
      // light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0x79d0f9)
      light.position.set(10, 10, 50)
      // light.intensity = 50
      this.scene.add(light)

      this.inited = true
    },

    render() {
      if (!this.renderer) {
        return
      }

      this.update()
      this.renderer.render(this.scene, this.camera)

      if (!this.stopped) {
        requestAnimationFrame(() => this.render())
      }
    },

    start() {
      console.log('start')
      this.stopped = false
      this.render()
    },

    stop() {
      console.log('stop')
      this.stopped = true
    },

    momo(e) {
      // if (this.debounce()) { return }

      // if (Math.abs(e.clientX - this.mouse.x) > 1 || Math.abs(e.clientY - this.mouse.y) > 1) {
      // const mouse = {
      //   x: e.clientX,
      //   y: e.clientY
      // }
      const delta = {
        x: (e.clientX / this.winWidth) * 2 - 1,
        y: (e.clientY / this.winHeight) * 2 - 1,
      }
      // this.momoActive = true

      // const momo = {
      //   x: delta.x,
      //   y: delta.y,
      //   mouse: {
      //     x: mouse.x,
      //     y: mouse.y
      //   }
      // }

      // console.log(momo.x, momo.y)

      this.mouse = {
        pos: {
          // x: mouse[0] / 2 * this.Wwidth,
          // y: mouse[1] / 2 * this.Wheight
          x: delta.x * (this.diameter / 6),
          y: delta.y * (this.diameter / 6),
        },
      }
      // }
    },

    // momo(mouse) {
    //   this.mouse = {
    //     pos: {
    //       // x: mouse[0] / 2 * this.Wwidth,
    //       // y: mouse[1] / 2 * this.Wheight
    //       x: mouse.mouse.x / 2,
    //       y: mouse.mouse.y / 2
    //     }
    //   }
    // },

    resize() {
      this.diameter = Math.max(this.winHeight, this.winWidth) * 0.15

      if (this.camera) {
        this.camera.aspect = this.winWidth / this.winHeight
        this.camera.updateProjectionMatrix()
      }

      if (this.renderer) {
        this.renderer.setSize(this.winWidth, this.winHeight)
      }
    },

    visibilityChange() {
      if (document.hidden) {
        this.stop()
      } else {
        this.start()
      }
    },
  },
}
</script>

<style lang="stylus">

.canvas-wrap {
	height 100%
	left 0
	overflow hidden
	position absolute
	top 0
	transition opacity 1s linear
	width 100%
	z-index 1

	&.v-enter-from {
		opacity 0
	}

	.inner-wrap, canvas {
		height 100%
		left 0
		position absolute
		top 0
		width 100%
	}
}
</style>
