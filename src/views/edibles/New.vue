<template>
  <div class="edibles-new">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-three-quarters">
        <form v-on:submit.prevent="createEdible()">
          <h2>Add a new edible:</h2>
          <div>Name: <input type="text" v-model="edibleName" /></div>
          <div>
            Image:
            <input type="file" v-on:change="setFile($event)" ref="fileInput" />
            <br />
            <img id="output" width="50%" />
          </div>
          <div
            v-for="ingredient in scannedIngredients"
            v-bind:key="scannedIngredients.indexOf(ingredient)"
          >
            {{ ingredient }}
          </div>
          <div v-if="analyzing">
            <img
              src="../../assets/eatstreet-loading.gif"
              height="120"
              width="160"
            />
          </div>
          <!-- <div>
            <button v-on:click.prevent="removeFromNewIngredients()">
              - ingredient</button
            ><input type="number" v-model="selectedIngredientIndex" />
          </div> -->
          <div>
            Ingredients:
            <div
              v-for="ingredient in newIngredients"
              v-bind:key="newIngredients.indexOf(ingredient)"
            >
              <input
                type="text"
                v-model="ingredient.name"
                v-on:change="checkIngredient(ingredient)"
                list="ingredient-names"
              />
              <datalist id="ingredient-names">
                <option
                  v-for="oneIngredient in allIngredients"
                  v-bind:key="allIngredients.indexOf(oneIngredient)"
                  >{{ oneIngredient.name }}</option
                >
              </datalist>
              <select v-model="ingredient.is_vegetarian">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select v-model="ingredient.is_vegan">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <button v-on:click.prevent="removeFromNewIngredients(ingredient)">
                x
              </button>
            </div>
            <div>
              <button v-on:click.prevent="addNewIngredient()">
                + ingredient
              </button>
            </div>
          </div>
          <div>
            <input type="submit" value="Create edible" />
          </div>
        </form>
        <router-link to="/edibles/">Back</router-link>
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
      edibleName: "",
      ingredientName: "",
      image: "",
      image_url: null,
      jwt: null,
      allIngredients: [],
      selectedIngredientIndex: "",
      newIngredients: [
        { name: "", is_vegetarian: null, is_vegan: null },
        { name: "", is_vegetarian: null, is_vegan: null },
        { name: "", is_vegetarian: null, is_vegan: null }
      ],
      scannedIngredients: [],
      analyzing: false
    };
  },
  created: function() {
    this.jwt = localStorage.jwt;

    axios.get("/api/ingredients").then(response => {
      this.allIngredients = response.data;
      // console.log("allIngredients", this.allIngredients);
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.analyzing = true;
        this.image = event.target.files[0];
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
        // Upload the image to backend for analysis
        var formData = new FormData();
        formData.append("image", this.image);
        axios.post("/api/label_reader", formData).then(response => {
          this.image_url = response.data.image_url;
          console.log(response.data);
          this.scannedIngredients = response.data.label_lines;
          this.newIngredients = response.data.ingredients;
          this.analyzing = false;
        });
      }
    },
    addNewIngredient: function() {
      this.newIngredients.push({
        name: "",
        is_vegetarian: null,
        is_vegan: null
      });
    },
    checkIngredient: function(ingredient) {
      // console.log("checkIngredient", ingredient);
      const foundIngredient = this.allIngredients.find(
        item => item.name === ingredient.name
      );
      if (foundIngredient) {
        ingredient.is_vegetarian = foundIngredient.is_vegetarian;
        ingredient.is_vegan = foundIngredient.is_vegan;
      } else {
        ingredient.is_vegetarian = null;
        ingredient.is_vegan = null;
      }
    },
    createEdible: function() {
      const formData = new FormData();
      formData.append("name", this.edibleName);
      formData.append("image", this.image_url || this.image);
      this.newIngredients.forEach(ingredient => {
        formData.append("ingredients[]", ingredient.name);
        formData.append("is_vegetarian[]", ingredient.is_vegetarian);
        formData.append("is_vegan[]", ingredient.is_vegan);
      });

      axios
        .post("/api/edibles", formData)
        .then(response => {
          this.edibleName = "";
          this.upc = "";
          this.user_id = localStorage.jwt.user_id;
          this.$refs.fileInput.value = "";
          this.$router.push(`/edibles/${response.data.id}`);
        })
        .catch(error => console.log(error.response));
    },
    removeFromNewIngredients: function(ingredient) {
      let indexToRemove = this.newIngredients.indexOf(ingredient);
      this.newIngredients.splice(indexToRemove, 1);

      // let indexToRemove = this.selectedIngredientIndex;
      // this.newIngredients.splice(indexToRemove, 1);
      // this.selectedIngredientIndex = "";
    }
  }
};
</script>
