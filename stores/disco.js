import { defineStore } from 'pinia'

import disco from '@/assets/disco.json'

export const useDiscoStore = defineStore('disco', {

  state: () => ({
    album: '',
    track: '',
    idx: 0,
    obj: {
      ui: 'fff',
      src: '/static/tracks/naam-bg.jpg',
      bg: '000',
      bgType: 'cover',
      bgColor: '000',
      color: 'fff'
    },
  }),

  getters: {
    ui: (state) => state.obj.ui,
    color: (state) => `#${state.obj.ui}`
  },

  actions: {
    next(idx = this.idx) {
      this.pag(idx + 1)
    },

    prev(idx = this.idx) {
      this.pag(idx - 1)
    },

    updateTrack({ album, track }) {

      const pathAlbum = album
      const pathTrack = track

      let nowPlaying = {
        ui: 'fff',
        src: '/static/tracks/naam-bg.jpg',
        bg: '000',
        bgType: 'cover',
        bgColor: '000',
        color: 'fff'
      }

      if (pathAlbum) {
        for (const album in disco) {
          if (pathAlbum === disco[album].slug && !pathTrack) {
            nowPlaying = {
              scIdx: disco[album].scIdx,
              ui: disco[album].ui,
              type: 'album',
              src: `/static/tracks/${disco[album].id}-bg.jpg`,
              bgType: 'cover',
              bgColor: disco[album].bg,
              color: disco[album].color
            }

            this.album = pathAlbum
            this.idx = disco[album].scIdx
          }

          for (const track in disco[album].tracks) {
            if (pathTrack === disco[album].tracks[track].slug) {
              nowPlaying = {
                scIdx: disco[album].tracks[track].scIdx,
                ui: disco[album].tracks[track].ui,
                type: 'track',
                src: `/static/tracks/${disco[album].tracks[track].id}-bg.jpg`,
                bgColor: disco[album].tracks[track].bg,
                color: disco[album].tracks[track].color
              }

              if (pathAlbum === 'this-is-how-it-ends') {
                nowPlaying.src = '/static/tracks/tihie-inner-bg.jpg'
                nowPlaying.bgType = 'cover'
              } else if (pathAlbum === 'the-foal' || pathAlbum === 'persuasive') {
                nowPlaying.bgType = 'contain'
              } else {
                nowPlaying.bgType = 'cover'
              }

              this.album = pathAlbum
              this.track = pathTrack
              this.idx = disco[album].tracks[track].scIdx
            }
          }
        }

        this.obj = {
          scIdx: nowPlaying.scIdx || 0,
          ui: nowPlaying.ui || 'fff',
          type: nowPlaying.type || 'track',
          src: nowPlaying.src || '/static/tracks/naam-bg.jpg',
          bgType: nowPlaying.bgType || 'cover',
          bgColor: nowPlaying.bgColor || '000000',
          color: nowPlaying.color || 'fa1178'
        }

      } else {
        this.obj = nowPlaying
        // this.obj = {
        //   ui: 'fff',
        //   src: '/static/tracks/naam-bg.jpg',
        //   bg: '000',
        //   bgType: 'cover',
        //   color: '000000'
        // }
      }
    },

    pag(step) {
      const newIndex = step

      for (const album in disco) {
        if (disco) {
          for (const track in disco[album].tracks) {
            if (disco[album].tracks.length && disco[album].tracks[track].scIdx === newIndex) {
              const router = useRouter() // eslint-disable-line no-undef
              router.push({
                name: 'album-track',
                params: {
                  album: disco[album].slug,
                  track: disco[album].tracks[track].slug
                }
              })
            }
          }
        }
      }
    }
  },

})
