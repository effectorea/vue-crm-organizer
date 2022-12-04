<template>
    <div>
      <Loader v-if="loading"/>
      <div v-else-if="record">
            <div class="breadcrumb-wrap">
              <router-link to="/history" class="breadcrumb">{{'menuHistory' | localize}}</router-link>
              <a @click.prevent class="breadcrumb">
                {{record.type === 'outcome' ? 'Расход' : 'Доход'}}
              </a>
            </div>
            <div class="row">
              <div class="col s12 m6">
                <div class="card"
                :class="[record.type === 'outcome' ? 'red' : 'green']">
                  <div class="card-content white-text">
                    <p>{{'description' | localize}}: {{record.description}}</p>
                    <p>{{'amount' | localize}}: {{record.amount | currency('RUB')}}</p>
                    <p>{{'category' | localize}}: {{record.categoryName}}</p>

                    <small>{{record.date | date}}</small>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <p v-else class="center">{{'recWith' | localize}} id={{$route.params.id}} {{'notFound' | localize}}</p>
    </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
export default {
  metaInfo() {
    return {
      title: this.$title('detail')
    }
  },
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordsById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>