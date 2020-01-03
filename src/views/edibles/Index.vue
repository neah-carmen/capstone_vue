<template>
  <div class="edibles-index">
    <h1>{{ message }}</h1>
  </div>
</template>

<style>
</style>

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