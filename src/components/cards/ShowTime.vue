<template>
  <div>
    <v-divider />
    <v-list-item
      @click="selectShowtime">
      <v-list-item-content>
        <v-row>
          <v-col
            cols="3"
            class="show-time__time">
            <v-list-item-title v-text="showtime.getTime()"></v-list-item-title>
          </v-col>
          <v-col
            cols="3">
            <v-list-item-title v-text="showtime.getDay()"></v-list-item-title>
          </v-col>
          <v-col
            cols="3"
            class="text-right">
            <v-list-item-title><b>₦{{ showtime.amount }}</b></v-list-item-title>
          </v-col>
          <v-col
            cols="3"
            class="text-right"
            style="height: 30px;">
            <v-btn
              x-small
              primary
              class="select-btn"
              icon>
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn
              x-small
              primary
              class="selected-btn"
              icon
              color="orange">
              <v-icon>check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import ShowtimeDTO from '@/entities/ShowtimeDTO'
export default {
  name: 'ShowTime',
  props: {
    showtime: {
      type: ShowtimeDTO,
      required: true
    }
  },
  methods: {
    selectShowtime() {
      this.$emit('click', this.showtime)
    }
  }
}
</script>
<style lang="scss" scoped>
.show-time__time {
  color: #f90;
}
.select-btn, .selected-btn {
  transform: translateY(-2px);
  display: none;
}
.v-list-item:hover {
  .select-btn {
    display: initial;
  }
}
.v-list-item.v-list-item--active {
  .select-btn {
    display: none;
  }
  .selected-btn {
    display: initial;
  }
}
</style>