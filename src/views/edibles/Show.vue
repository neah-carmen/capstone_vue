<template>
  <div class="edibles-show">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-three-quarters">
        <div class="card">
          <div class="card-content">
            <header class="card-header">
              <p class="card-header-title">
                {{ edible.name }}
              </p>
            </header>
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
              Vegetarian: {{ edible.isVegetarian }}
              <br />
              Vegan: {{ edible.isVegan }}
              <br />
              Ingredients:
              <span
                v-for="(ingredient, index) in ingredients"
                v-bind:key="ingredient.id"
              >
                <span>{{ ingredient.name }}</span
                ><span v-if="index + 1 < ingredients.length">, </span>
              </span>
              <footer class="card-footer">
                <router-link to="/edibles/">Back</router-link>
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
