<template>
  <v-row
    style="height:400px"
    class="fill-height text-center"
    align-content="center"
    justify="center"
  >
    <v-col class="subtitle-1" cols="12">
      <div><slot></slot></div>
      {{ message }}
    </v-col>
    <v-col cols="2">
      <v-progress-circular
        :size="40"
        :width="3"
        color="deep-purple accent-4"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
