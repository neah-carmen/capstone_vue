<template>
  <div class="edibles-show">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image">
              <div v-for="image in images" v-bind:key="image.id">
                <img v-bind:src="image.url" />
              </div>
            </figure>
          </div>
        </div>

        <div class="content">
          <h2>{{ edible.name }}</h2>
          Vegetarian: {{ edible.isVegetarian }}
          <br />
          Vegan: {{ edible.isVegan }}
          <br />
          <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
            {{ ingredient.name }}
          </div>
          <br />
          <router-link to="/edibles/">Back</router-link>
        </div>
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
      edible: {},
      ingredients: {},
      images: {}
    };
  },
  created: function() {
    axios.get("/api/v1/edibles/" + this.$route.params.id).then(response => {
      this.edible = response.data;
      this.ingredients = response.data.Ingredients;
      this.images = response.data.LabelImages;
    });
  },
  methods: {}
};
</script>
