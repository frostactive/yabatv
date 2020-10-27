<template>
  <v-container fluid>
    <div v-if="isLoading">
      <loader message="Loading checkout ..." />
    </div>
    <empty-state
      v-else-if="isEmpty"
      message="Empty cart."
      hint="Try adding movies first.">
      <div class="text-center">
        <v-icon style="font-size: 48px;">remove_shopping_cart</v-icon>
      </div>
    </empty-state>      
    <div
      class="pt-4"
      v-else>
      <h1 class="title">Checkout</h1>
      <v-row
        :key="id"
        v-for="(cart, id) in carts">
        <v-col cols="6">
          <v-card class="mt-3 pa-3" outlined>
            <h4>Summary</h4>
            <summary-list
              v-for="(items, group, index) in cart.cart"
              :key="`${group}_${index}`"
              :header="group"
              :items="items"
              @item-change="updateCart" />
            <v-divider />
            <v-row>
              <v-col cols="8"><span class="text--disabled">Sub Total</span></v-col>
              <v-col
                cols="3"
                class="text-right">₦{{ cart.getSubTotal() }}</v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="8"><span class="text--disabled">Delivery charge</span></v-col>
              <v-col
                cols="3"
                class="text-right">₦{{ cart.getDelivery() }}</v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="8"><span class="text--disabled">Vat ({{cart.vat}})%</span></v-col>
              <v-col
                cols="3"
                class="text-right">₦{{ cart.getVat() }}</v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="8"><span class="text--disabled">Total</span></v-col>
              <v-col
                cols="3"
                class="text-right text-accent-color"><b>₦{{ cart.getTotal() }}</b></v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  block
                  color="warning"
                  large
                  class="continue-btn"
                  @click="completeCheckout"
                  :disabled="isCheckoutDisabled">
                  Checkout
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="4">
              <v-card>
                <v-img
                  class="white--text align-end rounded"
                  height="120px"
                  :src="cart.film.getFilmBanner()" />
              </v-card>
            </v-col>
            <v-col cols="8">
              <h3 class="text-accent-color pt-2">{{ cart.film.title }}</h3>
              <v-list-item-title v-text="`${cart.showtime.getDay()} ${cart.showtime.getTime()}`"></v-list-item-title>
              <v-list-item-title><b>₦{{ cart.showtime.amount }}</b></v-list-item-title>
            </v-col>
          </v-row>
          <v-divider />
          <v-row>
            <v-col>
              <v-textarea
                outlined
                rows="3"
                label="Delivery Address"
                name="address"
                required
                v-model="address"
                @blur="$v.address.$touch()"
                :error-messages="addressErrors"
                ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import Loader from '@/components/cards/Loader'
import EmptyState from '@/components/cards/EmptyState'
import SummaryList from '@/components/cards/SummaryList'
import FilmDTO from '@/entities/FilmDTO'
import ShowtimeDTO from '@/entities/ShowtimeDTO'
import ConcessionDTO from '@/entities/ConcessionDTO'
import CartItemDTO from '@/entities/CartItemDTO'
import CartDTO from '@/entities/CartDTO'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Checkout',
  mixins: [validationMixin],
  components: {
    'loader': Loader,
    'empty-state': EmptyState,
    'summary-list': SummaryList
  },
  data() {
    return {
      carts: {},
      address: '',
      isLoading: false
    }
  },
  computed: {
    isEmpty() {
      return (Object.keys(this.carts).length === 0)
    },
    addressErrors() {
      if (this.$v.address.$dirty && !this.$v.address.required) {
        return ['Address is required']
      }
      return []
    },
    isCheckoutDisabled() {
      return this.$v.$invalid
    }
  },
  created() {
    // get data from ls
    const cart = JSON.parse(localStorage.getItem('cart'))
    // process cart
    Object.keys(cart).forEach(item => {
      const film = new FilmDTO(cart[item].selectedMovie)
      const showtime = new ShowtimeDTO(cart[item].selectedShowTime)
      let concession = {}
      let concessionCart = []
      Object.keys(cart[item].concession).forEach(object => {
        concession[object.id] = new ConcessionDTO(cart[item].concession[object])
        concessionCart.push(new CartItemDTO({
          id: cart[item].concession[object].id,
          title: cart[item].concession[object].name,
          amount: cart[item].concession[object].cost
        }))
      })

      const cart_item = {
        'tickets': [
          new CartItemDTO({
            id: film.id,
            title: 'Personnal Ticket',
            amount: showtime.amount,
            deletable: true
          }),
          new CartItemDTO({
            id: film.id,
            title: 'Gift Ticket',
            amount: showtime.amount
          }),
        ],
        'concession': concessionCart
      }

      this.carts[item] = new CartDTO({
        film,
        showtime,
        concession,
        cart: cart_item
      })
    })
  },
  methods: {
    updateCart() {
      this.carts = Object.assign({}, this.carts)
    },
    completeCheckout() {
      console.log('completing checkout ...')
    },
  },
  validations: {
    address: {
      required,
    },
  }
}
</script>
<style lang="scss" scoped>
.text-accent-color {
  color: #ff9900
}
</style>
<style lang="scss">
.v-card--outlined .section {
  padding-top: 30px;
  .section-title {
    font-size: 12px;
    background: #1E1E1E;
  }
}
</style>
