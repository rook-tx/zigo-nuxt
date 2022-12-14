import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {

  state: () => ({
    playing: false,
    position: 0
  }),

  actions: {
    playpause(playing = this.playing) {
      this.playing = !playing
    },

    play() {
      this.playing = true
    },

    pause() {
      this.playing = false
    },

    playreport(e) {
      const position = e.srcElement ? (e.srcElement.currentTime / e.srcElement.duration) : 0
      this.position = position
    }
  }

})
