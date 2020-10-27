<template>
  <v-app id="keep">
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon
        v-if="isInner"
        @click="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon
        v-else
        @click="drawer = !drawer" />
      <span class="title ml-3 mr-5">
        Yaba&nbsp;<span class="font-weight-light">TV</span>
      </span>
      <!-- <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      /> -->
      <v-spacer />
      <v-spacer />
      <v-menu offset-y bottom transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-chip class="nav-pill v-chip--active" pill v-on="on">
            <v-avatar class="nav-avatar" color="primary" size="36">
              <span class="white--text subtitle1">{{ avatarChar }}</span>
            </v-avatar>
            {{ user.fname }} {{ user.lname }}
            <v-icon right>arrow_drop_down</v-icon>
          </v-chip>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view
        @inner="setNavArrow()"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  props: {
    source: String
  },
  data() {
    return {
      drawer: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isInner: 'global/isInner'
    }),
    avatarChar() {
      return this.user.fname.charAt(0).toUpperCase()
    }
  },
  methods: {
    logout() {
      localStorage.clear('jwt')
      this.$router.push({ name: 'login' })
    },
    goHome() {
      this.$router.push({ name: 'home' })
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
#keep .v-navigation-drawer__border {
  display: none;
}

.v-list--dense .v-list-item .v-list-item__icon {
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
<style lang="scss" scoped>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background: #000;
}
.v-toolbar {
  box-shadow: none;
  border-bottom: none;
  .logo {
    width: 160px;
    transform: translateY(3px);
    display: inline-block;
  }
}

.v-application .title {
  width: 180px;
  font-size: 1.4rem !important;
}

.v-navigation-drawer .nav-link {
  text-decoration: none;
}

.v-navigation-drawer .nav-link.active {
  background: #7f9fb438;
  display: block;
}

.v-navigation-drawer .nav-link.active .v-list-item__title,
.v-navigation-drawer .nav-link.active .v-icon {
  color: #0066ff !important;
}

.nav-pill {
  padding-left: 0;
  &::before {
    background: rgb(24, 103, 192);
  }
  .nav-avatar {
    margin-right: 10px;
    * {
      margin-top: -2px;
      font-size: 18px;
    }
  }
}

.v-menu__content {
  width: 200px;
  margin-top: 8px;
  .v-list-item {
    min-height: auto;
    height: 34px;
    v-list-item-icon {
      margin-right: 8px;
    }
    .v-list-item__title {
      font-size: 14px;
    }
  }
  .v-list-item__icon {
    margin: 5px 10px 5px 0;
  }
}
</style>
