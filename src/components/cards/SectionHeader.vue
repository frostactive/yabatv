<template>
  <div
    v-bind="$attrs"
    class="section">
    <v-divider />
    <h5 class="section-title">{{ header }}</h5>
    <v-row dense="">
      <slot />
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'SectionHeader',
  props: {
    header: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.section {
  padding-top: 40px;
  .section-title {
    transform: translateY(-15px);
    text-transform: uppercase;
    display: inline-block;
    padding-right: 30px;
    background: #121212;
    color: #ff9900;
    letter-spacing: 4px;
  }
}
</style>