<template>
  <div class="auth-signup">
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth"></div>
        <div class="column">
          <form v-on:submit.prevent="submit()">
            <h1>Signup</h1>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Username:</label>
              <input type="text" class="form-control" v-model="username" />
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label>Password:</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="form-group">
              <label>Password confirmation:</label>
              <input
                type="password"
                class="form-control"
                v-model="passwordConfirmation"
              />
            </div>
            <input type="submit" class="btn btn-primary" value="Submit" />
          </form>
        </div>
        <div class="column is-one-fifth"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/auth/login/");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
