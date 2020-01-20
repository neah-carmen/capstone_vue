<template>
  <div id="app">
    <nav
      class="navbar is-success"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <img src="../src/assets/nav-image.png" height="48" width="48" />
      </div>

      <div id="navbar" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/edibles/">Home</router-link>
          </a>
          <div class="buttons">
            <a class="button">
              <router-link to="/edibles/new">New Edible</router-link>
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Register
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                <router-link to="/auth/signup">
                  <!-- <router-link to="/auth/signup" v-if="!jwt"> -->
                  Signup</router-link
                >
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                <router-link to="/auth/login">
                  <!-- <router-link to="/auth/login" v-if="!jwt"> -->
                  Login</router-link
                >
              </a>
              <a class="navbar-item">
                <router-link to="/auth/logout">
                  <!-- <router-link to="/auth/logout" v-if="jwt"> -->
                  Logout</router-link
                ></a
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      jwt: null
    };
  },
  created: function() {
    this.jwt = localStorage.jwt;
  }
};
</script>
<style>
body {
  background-image: url("./assets/congruent_pentagon.png");
}
</style>
