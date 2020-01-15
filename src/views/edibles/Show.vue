<template>
  <div class="edibles-show">
    <h1>{{ message }}</h1>
    <div>
      <h2>{{ edible.name }}</h2>
      {{ edible.isVegetarian }}
      <br />
      {{ edible.isVegan }}
      <br />
      <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
        <div>
          <h2>{{ ingredient.name }}</h2>
          Vegetarian? {{ ingredient.isVegetarian }}
          <br />
          Vegan? {{ ingredient.isVegan }}
          <br />
        </div>
      </div>
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
      edible: {},
      ingredients: {}
    };
  },
  created: function() {
    axios.get("/api/v1/edibles/" + this.$route.params.id).then(response => {
      this.edible = response.data;
      this.ingredients = response.data.Ingredients;
    });
  },
  methods: {}
};
</script>
