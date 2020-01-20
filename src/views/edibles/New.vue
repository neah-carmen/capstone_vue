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
          <div>
            Ingredients:
            <div v-for="ingredient in newIngredients">
              <input
                type="text"
                v-model="ingredient.name"
                v-on:change="checkIngredient(ingredient)"
                list="ingredient-names"
              />
              <datalist id="ingredient-names">
                <option v-for="oneIngredient in allIngredients">{{
                  oneIngredient.name
                }}</option>
              </datalist>
              <select v-model="ingredient.is_vegetarian">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select v-model="ingredient.is_vegan">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
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
        <br />
        <br />
        <form v-on:submit.prevent="createIngredient()">
          <div>
            <input type="text" v-model="ingredientName" />
            <select v-model="is_vegetarian">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <select v-model="is_vegan">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button type="submit">
            Create ingredient
          </button>
        </form>
        <br />
        {{ selectedIngredientIds }}
        <div v-for="ingredient in allIngredients" v-bind:key="ingredient.id">
          <input
            type="checkbox"
            v-bind:value="ingredient.id"
            v-model="selectedIngredientIds"
          />
          <label v-bind:value="ingredient.name">{{ ingredient.name }}</label>
          <select v-model="ingredient.is_vegetarian">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select v-model="ingredient.is_vegan">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

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
      images: "",
      jwt: null,
      allIngredients: [],
      newIngredients: [
        { name: "", is_vegetarian: null, is_vegan: null },
        { name: "", is_vegetarian: null, is_vegan: null },
        { name: "", is_vegetarian: null, is_vegan: null }
      ],
      selectedIngredientIds: [],
      is_vegetarian: "",
      is_vegan: ""
    };
  },
  created: function() {
    this.jwt = localStorage.jwt;

    axios.get("/api/ingredients").then(response => {
      this.allIngredients = response.data;
      console.log("allIngredients", this.allIngredients);
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
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
      console.log("checkIngredient", ingredient);
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
      var formData = new FormData();
      formData.append("name", this.edibleName);
      formData.append("image", this.image);
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
    createIngredient: function() {
      var ingredientFormData = {
        name: this.ingredientName,
        is_vegetarian: this.is_vegetarian,
        is_vegan: this.is_vegan
      };
      axios
        .post("/api/ingredients", ingredientFormData)
        .then(response => {
          var newIngredient = response.data;
          this.allIngredients.push(newIngredient);
          this.ingredientName = "";
          this.is_vegetarian = "";
          this.is_vegan = "";
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>
