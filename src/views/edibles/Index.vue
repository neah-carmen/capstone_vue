<template>
  <div class="edibles-index">
    <h1>{{ message }}</h1>
    <div v-for="edible in edibles" v-bind:key="edible.id">
      <div>
        <h2>{{ edible.name }}</h2>
        Vegetarian? {{ edible.is_vegetarian }}
        <br />
        Vegan? {{ edible.is_vegan }}
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
      message: "Edibles index view",
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
