<template>
  <div>
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <HistoryTable />
      </section>
    </div>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";

export default {
  name: 'history',
  data: () => ({
    loading: true,
    type: 'income',
    records: [],
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

  },
  components: {
    HistoryTable
  }
}
</script>