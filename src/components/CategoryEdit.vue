<template>
  <div>
    <div class="col s12 m6">
      <div>
        <div class="page-subtitle">
          <h4>{{'editCat' | localize}}</h4>
        </div>

        <form @submit.prevent="submitHandler">
          <div class="input-field">
            <select ref="select" v-model="current">
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
            </select>
            <label>{{'chooseCat' | localize}}</label>
          </div>

          <div class="input-field">
            <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
            />
            <label for="name">{{'categoryName' | localize}}</label>
            <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
            >
              {{'enterCategoryName' | localize}}
            </span>
          </div>

          <div class="input-field">
            <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            />
            <label for="limit">{{'categoryLimit' | localize}}</label>
            <span
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              class="helper-text invalid">{{'catMinValue' | localize}} {{$v.limit.$params.minValue.min}}</span>
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            {{'updateName' | localize}}
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { minValue, required } from "vuelidate/lib/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$v.$reset()
        this.$message('Категория была успешно изменена')
        this.$emit('updated', categoryData)
      } catch (e) {
      }
    }
  }
}
</script>