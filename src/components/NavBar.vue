<template>
  <div>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('openSidebar')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ date | date('datetime') }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
            >
              {{ name }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>{{'profileTitle' | localize}}
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>{{'logout' | localize}}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      console.log('User has just already logged out')
      await this.$router.push('/login?message=logout')
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    })
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>