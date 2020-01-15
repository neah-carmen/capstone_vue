<template>
  <div class="edibles-index">
    <div v-for="edible in edibles" v-bind:key="edible.id">
      <div>
        <h2>{{ edible.name }}</h2>
        Vegetarian: {{ edible.isVegetarian }}
        <br />
        Vegan: {{ edible.isVegan }}
        <br />
        <router-link v-bind:to="`/edibles/${edible.id}`">More Info</router-link>
      </div>
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
