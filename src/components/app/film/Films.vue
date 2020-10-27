<template>
  <v-container fluid>
    <div v-if="isLoading">
      <loader message="Loading films ..." />
    </div>
    <empty-state
      v-else-if="films.length == 0"
      message="No films available."
      hint="Please check back later.">
      <div class="text-center">
        <v-icon style="font-size: 48px;">movie_filter</v-icon>
      </div>
    </empty-state>      
    <div
      class="pt-4"
      v-else>
      <h1 class="title">Films</h1>
      <v-row dense>
        <film-card
          cols="3"
          :key="film.id"
          :film="film"
          v-for="film in films" />
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import FilmCard from '@/components/cards/FilmCard'
import Loader from '@/components/cards/Loader'
import EmptyState from '@/components/cards/EmptyState'
export default {
  name: 'Home',
  components: {
    'film-card': FilmCard,
    'loader': Loader,
    'empty-state': EmptyState
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      films: 'film/films'
    })
  },
  created() {
    this.$store
      .dispatch('film/getVideos')
      .then(() => {
        this.isLoading = false
      })
  },
}
</script>