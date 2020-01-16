<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
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
              User
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
    <router-view />
  </div>
</template>

<style></style>
