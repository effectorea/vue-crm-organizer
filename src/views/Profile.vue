<template>
  <div>
    <div>
      <div class="page-title">
        <h3>{{'profileTitle' | localize}}</h3>
      </div>

      <form class="form" @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
            id="description"
            type="text"
          >
          <label for="description">Имя</label>
          <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid">Поле не может быть пустым</span>
        </div>

        <div class="switch">
          <label>
            English
            <input type="checkbox"
            v-model="isRuLocale"/>
            <span class="lever"></span>
            Русский
          </label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: {required},
  },
  mounted() {
    this.isRuLocale = this.info.locale === 'ru-RU'
    this.name = this.info.name
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {
        
      }
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}

</style>