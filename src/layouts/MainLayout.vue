<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else class="app-main-layout">
      <NavBar @openSidebar="isOpen = !isOpen"/>

      <SideBar v-model="isOpen"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import messages from "@/utils/messages";

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  components: {
    NavBar, SideBar
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}

</script>
