<template>
  <div class="edibles-index">
    <div class="columns is-multiline is-mobile">
      <div
        class="column is-one-quarter "
        v-for="edible in edibles"
        v-bind:key="edible.id"
      >
        <div class="tile is-ancestor">
          <div class="tile">
            <div class="card card-edible">
              <header class="card-header">
                <p class="card-header-title">
                  {{ edible.name }}
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  Vegetarian: {{ edible.is_vegetarian }}
                  <br />
                  Vegan: {{ edible.is_vegan }}
                  <br />
                </div>
              </div>
              <footer class="card-footer">
                <router-link v-bind:to="`/edibles/${edible.id}`"
                  >More Info</router-link
                >
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-edible {
  width: 100%;
  margin: 0.5em;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      edibles: []
    };
  },
  created: function() {
    axios.get("/api/edibles").then(response => {
      this.edibles = response.data;
    });
  },
  methods: {}
};
</script>
