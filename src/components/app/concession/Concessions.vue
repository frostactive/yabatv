<template>
  <v-container fluid>
    <div v-if="isLoading">
      <loader message="Loading concessions ..." />
    </div>
    <empty-state
      v-else-if="isEmpty"
      message="No concessions available."
      hint="Please check back later.">
      <div class="text-center">
        <v-icon style="font-size: 48px;">fastfood</v-icon>
      </div>
    </empty-state>      
    <div
      class="pt-4"
      v-else>
      <v-row justify-space-between class="align-center">
        <v-col class="pb-0">
          <h1 class="title">Concessions</h1>
        </v-col>
        <v-col class="text-right pb-0">
          <v-btn
            small
            class="primary"
            :disabled="concessionSize === 0"
            @click="checkout">
            Confirm Selection <span v-if="concessionSize > 0">({{concessionSize}} Items)</span>
          </v-btn>
        </v-col>
      </v-row>
      <section-header
        v-for="(concessions, group) in concessionGroups"
        :key="group"
        :header="group">
        <concession-card
          :key="concession.id"
          :concession="concession"
          v-for="concession in concessions"
          @selected="selectConcession" />
      </section-header>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/cards/Loader'
import EmptyState from '@/components/cards/EmptyState'
import ConcessionCard from '@/components/cards/ConcessionCard'
import SectionHeader from '@/components/cards/SectionHeader'
export default {
  name: 'Concession',
  components: {
    'loader': Loader,
    'empty-state': EmptyState,
    'concession-card': ConcessionCard,
    'section-header': SectionHeader,
  },
  data() {
    return {
      selectedConcessions: {},
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      concessionGroups: 'concession/concessions',
      film: 'film/currentFilm',
    }),
    isEmpty() {
      return (Object.keys(this.concessionGroups).length === 0)
    },
    concessionSize() {
      return Object.keys(this.selectedConcessions).length
    }
  },
  created() {
    this.$store
      .dispatch('concession/getConcessions')
      .then(() => {
        this.isLoading = false
      })
  },
  mounted() {
    this.$store.dispatch('global/setIsInner', true)
  },
  methods: {
    selectConcession(item) {
      if (this.selectedConcessions[item.id]) {
        delete this.selectedConcessions[item.id]
        this.selectedConcessions = Object.assign({}, this.selectedConcessions)
        return
      }
      this.selectedConcessions = Object.assign({}, this.selectedConcessions, { [item.id]: item })
    },
    checkout() {
      // get cart content
      cart = JSON.parse(localStorage.getItem('cart'))
      // write token to ls
      let cart = Object.assign(
        {}, 
        cart, 
        {
          [this.film.id]: {
            ...cart[this.film.id],
            concession: this.selectedConcessions
          }
        }
      )
      // save to ls
      localStorage.setItem('cart', JSON.stringify(cart))
      // set cart in store
      this.$store.dispatch('global/setCart', cart)
      // go to checkout page
      this.$router.push({ name: 'checkout' })
    }
  },
  beforeDestroy() {
    this.$store.dispatch('global/setIsInner', false)
  },
}
</script>
