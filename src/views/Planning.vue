<template>
  <div>
    <div>
      <div class="page-title">
        <h3>{{'menuPlanning' | localize}}</h3>
        <h4>{{info.bill | currency('RUB')}}</h4>
      </div>

      <Loader v-if="loading"/>

      <p v-else-if="!categories.length"
         class="center"
      >{{'noCatFound' | localize}}. <router-link to="/categories">{{'addNewCat' | localize}}</router-link></p>

      <section v-else>
        <div v-for="cat in categories" :key="cat.id">
          <p>
            <strong>{{cat.title}}:</strong>
            {{cat.spent | currency('RUB')}} из {{cat.limit | currency('RUB')}}
          </p>
          <div class="progress" v-tooltip="cat.tooltip" >
            <div
              class="determinate"
              :class="cat.progressColor"
              :style="{width: cat.progressPercent + '%'}"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import currencyFilter from "@/filters/currency.filter";

export default {
  metaInfo() {
    return {
      title: this.$title('menuPlanning')
    }
  },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spent = records.filter(i => i.categoryId === cat.id)
        .filter(i => i.type === 'outcome')
        .reduce((total, record) => {
          return total += record.amount
        }, 0)

      const percent = 100 * spent / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spent
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressColor,
        progressPercent,
        spent,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>