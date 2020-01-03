<template>
  <div class="sessions-destroy"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    this.$router.push("/sessions/create/");
  }
};
</script>