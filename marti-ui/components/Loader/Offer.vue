<template>
  <div class="card my-2 testimonial-card">
    <content-loader
      class="card-body"
      viewBox="0 0 930 130"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="5" y="13" rx="3" ry="3" width="920" height="15" />
      <rect x="5" y="44" rx="3" ry="3" width="920" height="15" />
      <rect x="5" y="75" rx="3" ry="3" width="920" height="15" />
      <rect x="5" y="101" rx="3" ry="3" width="920" height="15" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
export default {
  components: { ContentLoader },
};
</script>
