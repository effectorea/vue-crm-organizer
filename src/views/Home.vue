<template>
  <div>
    <div>
      <div class="page-title">
        <h3>{{'menuBill' | localize}}</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <Loader v-if="loading"/>

      <div v-else class="row">

        <HomeBill
        :rates="currency.rates"
        />

        <HomeCurrency
          :rates="currency.rates"
          :date="currency.date"
        />

      </div>
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  metaInfo() {
    return {
      title: this.$title('menuBill')
    }
  },
  name: 'home',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill, HomeCurrency
  },
  async mounted() {
    this.currency = await this.$store.dispatch('loadCurrency')
    console.log(this.currency);
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('loadCurrency')
      this.loading = false
    }
  }
}
</script>

