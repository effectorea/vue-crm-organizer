<template>
  <div class="category-create">
    <div class="col s12 m6">
      <div>
        <div class="page-subtitle">
          <h4>{{'categoryCreate' | localize}}</h4>
        </div>

        <form @submit.prevent="submitHandler">
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
              {{ 'enterCategoryName' | localize }}
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
            {{'categoryCreate' | localize}}
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {required, minValue} from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.$emit('created', category)
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message('Категория была успешно создана')
      } catch (e) {

      }

    }
  }
}
</script>