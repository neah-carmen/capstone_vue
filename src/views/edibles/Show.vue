<template>
  <div class="edibles-show">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-three-quarters">
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
              <div class="media-content">
                <p class="title is-4">{{ edible.name }}</p>
                Vegetarian: {{ edible.is_vegetarian }}
                <br />
                Vegan: {{ edible.is_vegan }}
                <br />
                Ingredients:
                <span
                  v-for="(ingredient, index) in ingredients"
                  v-bind:key="ingredient.id"
                >
                  <span>{{ ingredient.name }}</span
                  ><span v-if="index + 1 < ingredients.length">, </span>
                </span>
              </div>
            </div>
            <div class="content">
              <footer class="card-footer">
                <div class="content">
                  <button v-on:click="toggleEdibleEditModal(edible)">
                    Edit Edible
                  </button>

                  <div
                    v-bind:class="{ selected: edible === selectedEdible }"
                    v-if="edible === selectedEdible"
                  >
                    <br />Name:
                    <input type="text" v-model="edible.name" />
                    <br />UPC:
                    <input type="text" v-model="edible.upc" />
                    <br />
                    Vegetarian: {{ edible.is_vegetarian }}
                    <br />
                    Vegan: {{ edible.is_vegan }}
                    <br />
                    <button v-on:click="checkEdible(edible)">
                      Check Edible
                    </button>
                    <br />
                    Ingredients:
                    <div
                      v-for="ingredient in ingredients"
                      v-bind:key="ingredient.id"
                    >
                      <input type="text" v-model="ingredient.name" />
                      <select v-model="ingredient.is_vegetarian">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                      <select v-model="ingredient.is_vegan">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <button v-on:click="updateEdible(edible)">
                      Update Edible
                    </button>
                  </div>
                  <br />
                  <router-link to="/edibles/">Back</router-link>
                </div>
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
      images: {},
      ingredients: {},
      selectedEdible: {}
    };
  },
  created: function() {
    axios.get("/api/edibles/" + this.$route.params.id).then(response => {
      this.edible = response.data;
      this.images = response.data.images;
      this.ingredients = response.data.ingredients;
    });
  },
  methods: {
    toggleEdibleEditModal: function(edible) {
      if (this.selectedEdible === edible) {
        this.selectedEdible = {};
      } else {
        this.selectedEdible = edible;
      }
    },
    checkEdible: function(edible) {
      axios.patch("/api/edibles/" + this.$route.params.id).then(response => {
        this.edible = response.data;
        this.selectedEdible = this.edible;
      });
    }
  }
};
</script>
