<template>
<content-loader
    viewBox="0 0 400 230"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="15" y="5" rx="3" ry="3" width="360" height="15" /> 
    <rect x="15" y="40" rx="3" ry="3" width="360" height="15" /> 
    <rect x="15" y="80" rx="3" ry="3" width="360" height="15" /> 
    <rect x="15" y="120" rx="3" ry="3" width="360" height="15" />
    <rect x="15" y="160" rx="3" ry="3" width="360" height="15" />
  </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
export default {
    components: { ContentLoader }
}
</script>
