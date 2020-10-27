<template>
  <v-col
    v-bind="$attrs">
    <v-card
      @click="viewFilm">
      <v-img
        class="white--text align-end"
        height="200px"
        :src="film.getFilmBanner()">
        <v-card-title
          v-text="film.title"></v-card-title>
        <v-card-subtitle>
          <v-chip small outlined>{{ film.rating }}</v-chip>
          <span class="ml-2 caption">{{ film.length }} mins &bull; {{ film.getFilmGenre() }}</span>
        </v-card-subtitle>
      </v-img>
    </v-card>
  </v-col>
</template>
<script>
import FilmDTO from "@/entities/FilmDTO";
export default {
  name: 'FilmCard',
  props: {
    film: {
      type: FilmDTO,
      required: true
    }
  },
  methods: {
    viewFilm() {
      this.$store.dispatch('global/setIsInner', true)
      this.$store.dispatch('film/setCurrentFilm', this.film)
      this.$router.push({
        name: 'film', 
        params: { id: this.film.id }
      })
    }
  }
}
</script>
<style lang="scss">
$null: 0;
.v-card--link .v-image::after {
  content: '';
  background: #000;
  position: absolute;
  top: $null;
  left: $null;
  bottom: $null;
  right: $null;
  opacity: 0.2;
  z-index: 9;
  transition: 300ms all;
}
.v-responsive__content {
  position: relative;
  z-index: 10;
}
.v-card--link:hover .v-image::after {
  opacity: 0.5;
}
</style>
