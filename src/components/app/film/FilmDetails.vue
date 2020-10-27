<template>
  <div v-if="isLoading">
    <loader message="Loading content ..." />
  </div>
  <empty-state
    v-else-if="!film.id"
    message="Unable to retrive film."
    hint="Please check back later.">
    <div class="text-center">
      <v-icon style="font-size: 48px;">movie_filter</v-icon>
    </div>
  </empty-state>      
  <div
    v-else>
    <v-row class="justify-center">
      <v-col class="col-8">
        <h1 class="my-4">{{film.title}}</h1>
        <media-player 
          :options="videoOptions" />
      </v-col>
    </v-row>
    <!-- <film-detail
      :film="film">
    </film-detail>
    <film-show-times
      class="showtimes"
      :film-id="id"
      @continue="continueToConcession">
    </film-show-times> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import FilmDetail from '@/components/cards/FilmDetail'
// import FilmShowTimes from '@/components/cards/FilmShowTimes'
import MediaPlayer from '@/components/cards/MediaPlayer'
import Loader from '@/components/cards/Loader'
import EmptyState from '@/components/cards/EmptyState'
export default {
  name: 'FilmDetails',
  components: {
    // 'film-detail': FilmDetail,
    // 'film-show-times': FilmShowTimes,
    'loader': Loader,
    'empty-state': EmptyState,
    'media-player': MediaPlayer,
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showtimes: [],
      isLoading: true,
      videoOptions: {
				autoplay: true,
        controls: true,
        fluid: true,
        height: 480,
				sources: [
					{
						src: "https://yabatv.simplifyd.app/v1/media/5f79e13958802cc5e6931bab/stream/playlist.m3u8",
            type: "application/x-mpegURL",
					}
				],
			}
    }
  },
  mounted() {
    this.$store.dispatch('global/setIsInner', true)
  },
  computed: {
    ...mapGetters({
      film: 'film/currentFilm'
    })
  },
  methods: {
    getFilm() {
      this.$store
        .dispatch('film/getVideo', this.id)
        .catch(() => {
          this.isLoading = false
        })
    },
    continueToConcession (item) {
      // write token to ls
      let cart = Object.assign(
        {}, 
        JSON.parse(localStorage.getItem('cart')), 
        {
          [this.film.id]: {
            selectedMovie: this.film,
            selectedShowTime: item
          }
        }
      )
      // save to ls
      localStorage.setItem('cart', JSON.stringify(cart))
      this.$router.push({ name: 'concessions' })
    }
  },
  watch: {
    film: {
      handler() {
        !this.film.id && this.id && this.getFilm()
        if(this.film.id) {
          this.isLoading = false
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.$store.dispatch('global/setIsInner', false)
  }
}
</script>
<style scoped>
.showtimes {
  max-width: 400px;
  width: 400px;
  position: fixed;
  top: 200px;
  right: 100px;
  z-index: 1000;
}
</style>
