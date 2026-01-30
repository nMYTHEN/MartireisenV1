<template>
<content-loader
    viewBox="0 0 930 180"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="1" y="44" rx="3" ry="3" width="900" height="15" /> 
    <rect x="1" y="74" rx="3" ry="3" width="900" height="15" /> 
    <rect x="1" y="104" rx="3" ry="3" width="900" height="15" /> 
    <rect x="1" y="134" rx="3" ry="3" width="900" height="15" /> 
  </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
export default {
    components: { ContentLoader }
}
</script>
