<template>
  <v-img
    class="white--text align-end pl-8"
    :src="film.getFilmBanner()">
    <video
      id="player"
      ref="player"
      :class="{'playing': isPlaying}"
      poster="film.getFilmBanner()">
      <source 
        :src="film.trailer" 
        type="video/mp4" />
    </video>
    <div
      class="film-details__info">
      <v-card-title
        class="display-1 font-weight-black mb-0 pb-0"
        v-text="film.title"></v-card-title>
      <v-card-title class="pb-0 pt-0">
        <span class="font-weight-black year body-2">{{ film.getFilmYear() }}</span>
      </v-card-title>
      <v-card-title
        v-if="film.synopsis"
        class="body-2"
        v-text="film.synopsis"></v-card-title>
      <v-card-title class="pb-0">
        <v-chip small outlined>{{ film.rating }}</v-chip>
        <span class="ml-2 body-2">{{ film.length }} mins &bull; {{ film.getFilmGenre() }}</span>
      </v-card-title>
      <v-card-title class="pb-0">
        <span class="ml-2 body-2">
          <span class="text--disabled">Casts</span>
          <span class="ml-2">{{ film.getFilmCast() }}</span>
        </span>
      </v-card-title>
      <v-card-title class="pt-0 pb-0">
        <span class="ml-2 body-2 text--disabled">Directors: </span>
        <span class="ml-2 body-2">{{ film.getFilmDirector() }}</span>
      </v-card-title>
      <v-card-title class="pt-0 pb-8 mb-8">
        <span class="ml-2 body-2 text--disabled">Writers: </span>
        <span class="ml-2 body-2">{{ film.getFilmWriters() }}</span>
      </v-card-title>
    </div>
    <v-expand-x-transition>
      <v-btn
        absolute
        dark
        bottom
        left
        rounded
        large
        color="warning play-trailer-btn"
        v-show="showPlayButton"
        @click="playVideo">
        <v-icon class="mr-2">play_arrow</v-icon> Play Trailer
      </v-btn>
    </v-expand-x-transition>
  </v-img>
</template>
<script>
import FilmDTO from '@/entities/FilmDTO'
let timex = null
export default {
  name: 'FilmDetailCard',
  props: {
    film: {
      type: FilmDTO,
      required: true
    }
  },
  data () {
    return {
      isPlaying: false,
      showPlayButton: false,
      muted: false,
      player: null
    }
  },
  mounted () {
    if(typeof window !== 'undefined'){
      this.player = this.$refs.player
      this.player.load();
      this.player.pause();
      let promise = this.player.play();
      if (promise !== undefined) {
        promise.then(() => {
          this.player.pause();
        }).catch(() => {
          this.showPlayButton = true
        });
      }

      if(timex){ clearTimeout(timex); }
      timex = setTimeout(() => {
        !this.showPlayButton && this.playVideo()
      }, 10000);
    }
  },
  methods: {
    fadeOutVideoAudio () {
      const player = this.$refs.player
      clearTimeout(timex)
      var fadeAudio = setInterval(function () {
        // Only fade if past the fade out point or not at zero already
        if (player.volume > 0) {
          const newVolume = player.volume - 0.1;
          player.volume = newVolume.toFixed(1)
        }
        // When volume at zero stop all the intervalling
        if (player.volume === 0.0) {
          clearInterval(fadeAudio);
          player.pause()
        }
      }, 200);
    },
    stopVideo () {
      this.isPlaying = false
      this.showPlayButton = true
      this.player.pause()
      clearTimeout(timex)
    },
    playVideo () {
      this.player.play()
      this.showPlayButton = false
      this.isPlaying = true
      
      this.$refs.player.addEventListener('ended', () => {
        this.stopVideo()
      },false);
    }
  },
  beforeDestroy() {
    this.fadeOutVideoAudio()
  }
}
</script>
<style lang="scss" scoped>
$null: 0;
.v-image {
  height: calc(100vh - 64px);
}
.year {
  color: #ff9900
}
.snippet {
  max-width: 600px;
}
.v-image::after {
  content: '';
  background: #000;
  position: absolute;
  top: $null;
  left: $null;
  bottom: $null;
  right: $null;
  opacity: 0.4;
  z-index: 9;
  transition: 300ms all;
}
.v-responsive__content {
  position: relative;
  z-index: 10;
}
#player {
  position: fixed;
  background: #000;
  width: 100%;
  height: 100%;
  top: $null;
  left: $null;
  bottom: $null;
  right: $null;
  opacity: 0;
  transition: 1000ms all;
}
#player.playing {
  opacity: 1;
}
.film-details__info {
  width: 600px;
  position: relative;
  z-index: 1;
  padding-bottom: 60px;
}
.play-trailer-btn {
  font-size: 12px;
  z-index: 1000;
  bottom: 40px;
}
</style>
