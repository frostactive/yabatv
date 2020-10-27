<template>
  <v-row
    style="height:400px"
    class="fill-height empty-state"
    align-content="center"
    justify="center"
  >
    <v-col cols="2">
      <slot></slot>
    </v-col>
    <v-col class="text-center" cols="12">
      <p class="font-weight-medium headline empty-state-caption">{{ message }}</p>
      <p class="text--disabled body-2" ng-if="hint">{{ hint }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    message: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      required: false
    }
  }
}
</script>
