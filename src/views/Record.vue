<template>
  <div>
    <div>
      <div class="page-title">
        <h3>{{'menuNewRecord' | localize}}</h3>
      </div>

      <Loader v-if="loading"/>

      <p v-else-if="!categories.length"
         class="center"
      >{{ 'noCatFound' | localize }}. <router-link to="/categories">{{'addNewCat' | localize}}</router-link></p>

      <form v-else class="form" @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="category">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
          </select>
          <label>{{'chooseCat' | localize}}</label>
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
            <span>{{'income' | localize}}</span>
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
            <span>{{'outcome' | localize}}</span>
          </label>
        </p>

        <div class="input-field">
          <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          >
          <label for="amount">{{'amount' | localize}}</label>
          <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid">{{'catMinValue' | localize}} {{$v.amount.$params.minValue.min}}</span>
        </div>

        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
          >
          <label for="description">{{'description' | localize}}</label>
          <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid">{{'desEmpty' | localize}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'categoryCreate' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$title('menuNewRecord')
    }
  },
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'income',
    description: '',
    amount: 10
  }),
  validations: {
    description: {required},
    amount: {minValue: minValue(10)}
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
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON(),
            type: this.type
          })
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись была успешно создана')
          this.$v.$reset()
          this.amount = 10
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
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