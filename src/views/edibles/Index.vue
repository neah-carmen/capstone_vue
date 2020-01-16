<template>
  <div class="edibles-index">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-four-fifths">
        <div class="tile is-ancestor">
          <div class="tile" v-for="edible in edibles" v-bind:key="edible.id">
            <div class="card">
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
                  Vegetarian: {{ edible.isVegetarian }}
                  <br />
                  Vegan: {{ edible.isVegan }}
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
      <div class="column"></div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      edibles: []
    };
  },
  created: function() {
    axios.get("/api/v1/edibles").then(response => {
      this.edibles = response.data;
    });
  },
  methods: {}
};
</script>
