<template>
  <div class="edibles-show">
    <h1>{{ message }}</h1>
    <div>
      <h2>{{ edible.name }}</h2>
      {{ edible.isVegetarian }}
      <br />
      {{ edible.isVegan }}
      <br />
      <router-link to="/edibles/">Back</router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Edibles show view",
      edible: {}
    };
  },
  created: function() {
    axios.get("/api/v1/edibles/" + this.$route.params.id).then(response => {
      this.edible = response.data;
    });
  },
  methods: {}
};
</script>
