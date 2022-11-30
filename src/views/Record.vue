<template>
  <div>
    <div>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>

      <Loader v-if="loading"/>

      <p v-else-if="!categories.length"
         class="center"
      >Категорий не найдено. <router-link to="/categories">Добавить новую категорию</router-link></p>

      <form v-else class="form" @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="category">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          >
          <label for="amount">Сумма</label>
          <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid">Минимальное значение {{$v.amount.$params.minValue.min}}</span>
        </div>

        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
          >
          <label for="description">Описание</label>
          <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid">Описание не может быть пустым</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from "vuelidate/lib/validators";

export default {
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'income',
    description: '',
    amount: 1
  }),
  validations: {
    description: {required},
    amount: {minValue: minValue(100)}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)

  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {


      } catch (e) {
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}

</script>