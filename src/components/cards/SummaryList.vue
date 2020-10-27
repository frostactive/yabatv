<template>
  <section-header
    :header="header">
    <v-col
      cols="12"
      class="table"
      block>
      <summary-item
        :key="`${item.id}_${index}`"
        :item="item"
        v-for="(item, index) in cart_items"
        @item-change="updateCart" />
    </v-col>
  </section-header>
</template>
<script>
import Summary from '@/components/cards/Summary'
import SectionHeader from '@/components/cards/SectionHeader'
export default {
  name: 'SummaryList',
  components: {
    'summary-item': Summary,
    'section-header': SectionHeader,
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cart_items: []
    }
  },
  methods: {
    updateCart() {
      this.$emit('item-change')
    },
  },
  watch: {
    items: {
      handler () {
        this.cart_items = this.items
      },
      immediate: true,
    }
  }
}
</script>
<style lang="scss" scoped>
.table {
  > :nth-child(odd) {
    background: #161616;
  }
}
</style>
