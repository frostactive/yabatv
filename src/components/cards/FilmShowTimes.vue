<template>
  <v-card
    :loading="isLoading">
    <empty-state
      v-if="!isLoading && showTimes.length === 0"
      message="Showtimes unavailable"
      hint="Please check back later.">
      <div class="text-center">
        <v-icon style="font-size: 48px;">movie_filter</v-icon>
      </div>
    </empty-state>
    <div
      v-else>
      <v-list dense>
        <v-subheader class="pl-4">
          <v-icon class="mr-2">movie_filter</v-icon>
          <span class="ls_2">SHOWTIMES</span>
        </v-subheader>
        <div v-if="isLoading">
          <v-skeleton-loader
            ref="skeleton"
            type="list-item-two-line"
            class="mx-auto" />
        </div>
        <v-list-item-group
          v-model="item"
          color="primary"
          v-else>
          <show-time
            v-for="showtime in showTimes"
            :key="showtime.id"
            :showtime="showtime"
            @click="selectShowtime" />
        </v-list-item-group>
        <v-card-actions
          class="pb-0">
          <v-expand-transition>
            <v-btn
              block
              color="warning"
              large
              class="continue-btn"
              v-show="isNotEmpty"
              @click="continueToConcession">
              Continue to concession
            </v-btn>
          </v-expand-transition>
        </v-card-actions>
      </v-list>
    </div>
  </v-card>
</template>
<script>
import EmptyState from '@/components/cards/EmptyState'
import ShowTime from '@/components/cards/ShowTime'
export default {
  name: 'FilmShowTimes',
  components: {
    'empty-state': EmptyState,
    'show-time': ShowTime,
  },
  props: {
    filmId: {
      type: String,
      required: true
    }
  },
  computed: {
    isNotEmpty() {
      return (Object.keys(this.selectedShowtime).length > 0)
    }
  },
  data() {
    return {
      item: null,
      showTimes: [],
      isLoading: true,
      selectedShowtime: {}
    }
  },
  mounted() {
    // this.$store
    //   .dispatch('film/getFilmShowtimes', this.filmId)
    //   .then(response => {
    //     this.showTimes = response
    //     this.isLoading = false
    //   })
    //   .catch(() => {
    //     this.isLoading = false
    //   })
  },
  methods: {
    selectShowtime(item) {
      if (item.id == this.selectedShowtime.id) {
        this.selectedShowtime = {}
        return
      }
      this.selectedShowtime = item
    },
    continueToConcession () {
      this.$emit('continue', this.selectedShowtime)
    }
  }
}
</script>
<style scoped>
.ls_2 {
  letter-spacing: 3px;
}
.empty-state .empty-state-caption {
  font-size: 24px !important;
}
.continue-btn {
  font-size: 12px;
}
</style>
