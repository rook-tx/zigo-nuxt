import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', {

  state: () => ({
    device: {
      win: {
        x: 1440,
        y: 900
      }
    },
    utcOffset: 'America/Toronto'
  }),

  getters: {
    win: (state) => state.device.win,
    smMobile: (state) => state.device.win.x < 600 + 1,
    mobile: (state) => state.device.win.x < 768 + 1,
    tablet: (state) => state.device.win.x < 1024 + 1,
    notebook: (state) => state.device.win.x < 1176 + 1,
    laptop: (state) => state.device.win.x < 1440 + 1
  },

  actions: {
    updateDevice(device) {
      this.device = device
    },

    updateUTC(offset) {
      this.utcOffset = offset
    }
  }

})
