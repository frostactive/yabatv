<template>
  <v-col cols="3">
    <v-card
      :class="{'selected': selected}"
      @click="selectConcession">
      <v-img
        class="white--text align-end"
        height="200px"
        :src="concession.image">
        <v-card-title
          v-text="concession.name"></v-card-title>
        <v-card-subtitle>₦{{ concession.cost }}</v-card-subtitle>
        <v-fab-transition>
          <v-btn
            absolute
            right bottom
            primary
            class="selected-btn"
            icon
            color="orange"
            v-show="selected">
            <v-icon>check_circle</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-img>
    </v-card>
  </v-col>
</template>
<script>
import ConcessionDTO from "@/entities/ConcessionDTO";
export default {
  name: 'ConcessionCard',
  props: {
    concession: {
      type: ConcessionDTO,
      required: true
    }
  },
  data() {
    return {
      selected: false
    }
  },
  methods: {
    selectConcession() {
      this.selected = !this.selected
      this.$emit('selected', this.concession)
    }
  }
}
</script>
<style lang="scss">
$null: 0;
.selected::after {
  content: '';
  position: absolute;
  top: $null;
  left: $null;
  right: $null;
  bottom: $null;
  border: 2px solid #ff9900;
  border-radius: 5px;
}
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
