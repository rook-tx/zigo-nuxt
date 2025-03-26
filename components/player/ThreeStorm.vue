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
    window.removeEventListener('mousemove', this.momo, { passive: true })
    document.removeEventListener('visibilitychange', this.visibilityChange)
  },

  methods: {
    setupScene() {
      this.scene.fog = new FogExp2(this.fogColor, 0.0018)

      const clutter = new Object3D()
      // this.geometry = new THREE.Geometry();

      this.rings = []
      // this.geometry = geo;
      const geo = new TetrahedronGeometry(0.5)

      const mat = new MeshPhysicalMaterial({
        // color: '#fff',
        roughness: 0.5,
        metalness: 1,
        // side: DoubleSide,
        transparent: true,
        opacity: 0.75,
        // reflectivity: 0.9
      })

      // const mesh = new THREE.Mesh(geo, mat);

      // this.scene.add(mesh);

      const r = 6
      const ringGeo = new Object3D()
      const n = this.diameter / 12
      // const d = 300

      for (let i = 0; i < n; i++) {
        const mesh = new Mesh(geo, mat)

        mesh.position.x = (Math.random() - 0.5) * this.diameter
        mesh.position.y = (Math.random() - 0.5) * this.diameter
        mesh.position.z = (Math.random() - 0.5) * this.diameter

        // this.scene.add(mesh)

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

      // this.geometry = new THREE.Geometry();

      // var i;

      // this.materials = [];

      // var sprite = new THREE.TextureLoader().load(texture);

      // for (i = 0; i < 360; i++) {
      // 	var vertex = new THREE.Vector3();
      // 	vertex.x = (Math.random() - 0.5) * 2000;
      // 	vertex.y = (Math.random() - 0.5) * 2000;
      // 	vertex.z = (Math.random() - 0.5) * 2000;
      // 	this.geometry.vertices.push(vertex);
      // }

      // for (i = 0; i < 6; i++) {
      // 	this.materials[i] = new THREE.PointsMaterial({ size: i + 1, alphaTest: 0.1, map: sprite });
      // 	var particles = new THREE.Points(this.geometry, this.materials[i]);

      // 	particles.rotation.x = Math.random() * Math.PI * 2;
      // 	particles.rotation.y = Math.random() * Math.PI * 2;
      // 	particles.rotation.z = Math.random() * Math.PI * 2;

      // 	this.scene.add(particles);
      // }

      // var geometryS = new THREE.SphereGeometry(618, 32, 16);
      // var materialS = new THREE.MeshLambertMaterial({ wireframe: true });
      // this.sphere = new THREE.Mesh(geometryS, materialS);

      // this.scene.add(this.sphere);
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
      light.position.set(0, 1000, 4000)
      light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0x680002)
      light.position.set(-2000, -100, -4000)
      light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xba9544)
      light.position.set(1500, -1000, 3000)
      light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xe92076)
      light.position.set(-1500, -1500, 3000)
      light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xe92076)
      light.position.set(-1500, 1500, -1000)
      light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xb86405)
      light.position.set(-1000, 1000, 4000)
      light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0xb86405)
      light.position.set(1000, 1000, -4000)
      light.intensity = 50
      this.scene.add(light)

      light = new SpotLight(0x79d0f9)
      light.position.set(1000, 1000, 5000)
      light.intensity = 50
      this.scene.add(light)
      // window.addEventListener('resize', () => this.resize());

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
