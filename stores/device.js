import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', {

  state: () => ({
    device: {
      win: {
        x: 1440,
        y: 900
      },
      keys: null,
      mouse: null,
      touch: null
    }
  }),

  getters: {
    win: (state) => state.device.win,
    winWidth: (state) => state.device.win.x,
    winHeight: (state) => state.device.win.y,

    portrait: (state) => state.device.win.y > state.device.win.x,

    smMobile: (state) => state.device.win.x < 600 + 1,
    mobile: (state) => state.device.win.x < 768 + 1,
    tablet: (state) => state.device.win.x < 1024 + 1,
    notebook: (state) => state.device.win.x < 1176 + 1,
    laptop: (state) => state.device.win.x < 1440 + 1
  },

  actions: {
    updateDevice(device) {
      this.device = device
    }
  }

})
