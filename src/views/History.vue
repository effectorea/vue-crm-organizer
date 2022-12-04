<template>
  <div>
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      <div class="history-chart">
        <canvas></canvas>
      </div>

      <Loader v-if="loading"/>

      <p v-else-if="!records.length"
         class="center"
      >Записей пока нет. <router-link to="/record">Добавить новую запись</router-link></p>

      <section v-else>

        <HistoryTable :records="items" />

        <Paginate
          v-model="page"
          :pageCount="pageCount"
          :clickHandler="pageChangeHandler"
          :prevText="'Назад'"
          :nextText="'Вперед'"
          :containerClass="'pagination'"
          :page-class="'waves-effect'"
        />

      </section>
    </div>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: 'history',
  data: () => ({
    loading: true,
    type: 'income',
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    }))
    this.loading = false
  },
  components: {
    HistoryTable
  },
  mixins: [paginationMixin]
}
</script>