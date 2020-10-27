<template>
  <v-row
    class="summary-container"
    :class="{'deleted': cartItem.deleted}">
    <v-col
      class="summary-title">{{ cartItem.title }}</v-col>
    <v-col
      cols="3"
      class="control-holder">
      <v-btn-toggle
        dark
        class="control"
        v-show="!cartItem.deleted">
        <v-btn small class="control-settings"
          @click="remove()">
          <v-icon>remove</v-icon>
        </v-btn>
        <v-btn small min-width="40px">{{ cartItem.quantity }}</v-btn>
        <v-btn small class="control-settings"
          @click="add()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-col
      cols="2"
      class="text-right summary-cost">
      ₦{{ cartItem.getSubTotal() }}
    </v-col>
    <v-col
      cols="1"
      class="text-right">
      <v-btn
        x-small
        primary
        class="trash-btn mr-3"
        icon
        v-if="cartItem.deletable"
        v-show="!cartItem.deleted"
        @click="trash()">
        <v-icon>delete_outline</v-icon>
      </v-btn>
      <v-btn
        x-small
        primary
        class="restore-btn mr-3"
        icon
        v-if="cartItem.deletable"
        @click="restore()"
        v-show="cartItem.deleted">
        <v-icon>settings_backup_restore</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import CartItemDTO from '@/entities/CartItemDTO'
export default {
  name: 'Summary',
  props: {
    item: {
      type: CartItemDTO,
      required: true
    },
  },
  computed: {
    cartItem() {
      return this.item
    }
  },
  methods: {
    notifyParent() {
      this.$emit('item-change')
    },
    add() {
      this.cartItem.quantity += 1
      this.notifyParent()
    },
    remove() {
      this.cartItem.quantity = (this.cartItem.quantity == 1) ? 1 : this.cartItem.quantity - 1
      this.notifyParent()
    },
    trash() {
      if (!confirm('Are you sure you want to remove this item?')) return
      this.cartItem.deleted = true
      this.notifyParent()
    },
    restore() {
      this.cartItem.deleted = false
      this.notifyParent()
    },
  }
}
</script>
<style lang="scss" scoped>
.summary-container {
  padding-top: 5px;
  .trash-btn {
    opacity: 0.2;
  }

  .restore-btn {
    opacity: 0.8;
  }

  &:hover {
    .trash-btn, .restore-btn {
      opacity: 1
    }
  }

  &.deleted {
    .summary-title, .summary-cost{
      opacity: 0.2;
    }

    .summary-cost{
      text-decoration: line-through;
    }
  }

  .control-holder{
    height: 52px;
    .control {
      transform: translateY(-3px);
    }
    .control-settings {
      padding-left: 10px;
      padding-right: 10px;
      min-width: initial;
      width: 30px;
      .v-icon{
        font-size: 14px;
      }
    }
  }
}
</style>
