<template>
  <div id="app">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-four-fifths">
        <nav
          class="navbar is-success"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="navbar-brand">
            <img src="../src/assets/nav-image.png" height="50" width="50" />
          </div>

          <div id="navbar" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">
                <router-link to="/edibles/">Home</router-link>
              </a>
              <a class="navbar-item">
                Documentation
              </a>
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
                    <router-link to="/auth/signup">Signup</router-link>
                  </a>
                  <hr class="navbar-divider" />
                  <a class="navbar-item">
                    <router-link to="/auth/login">Login</router-link>
                  </a>
                  <a class="navbar-item"
                    ><router-link to="/auth/logout">Logout</router-link></a
                  >
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="column"></div>
    </div>
    <router-view />
  </div>
</template>

<style></style>
