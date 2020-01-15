<template>
  <div class="edibles-show">
    <div>
      <h2>{{ edible.name }}</h2>
      Vegetarian: {{ edible.isVegetarian }}
      <br />
      Vegan: {{ edible.isVegan }}
      <br />
      <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">{{ ingredient.name }}</div>
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
