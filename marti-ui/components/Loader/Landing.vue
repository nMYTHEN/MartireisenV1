<template>
  <div class=" my-2 ">
 <content-loader
    viewBox="0 0 1280 500"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="40" rx="3" ry="3" width="1280" height="15" /> 
    <rect x="0" y="65" rx="3" ry="3" width="1280" height="15" /> 
    <rect x="0" y="90" rx="3" ry="3" width="1280" height="15" />

    <rect x="0" y="155" rx="3" ry="3" width="1280" height="20" /> 
    <rect x="0" y="190" rx="3" ry="3" width="1280" height="20" /> 
  </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
export default {
  components: { ContentLoader },
};
</script>
