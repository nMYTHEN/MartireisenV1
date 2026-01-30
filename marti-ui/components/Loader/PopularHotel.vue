<template>
<content-loader
    viewBox="0 0 450 450"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="420" height="450" /> 
    
  </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
export default {
    components: { ContentLoader }
}
</script>
