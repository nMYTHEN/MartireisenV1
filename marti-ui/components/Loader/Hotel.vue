<template>
<content-loader
    viewBox="0 0 930 230"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="324" y="13" rx="3" ry="3" width="610" height="15" /> 
    <rect x="11" y="7" rx="0" ry="0" width="290" height="220" /> 
    <rect x="115" y="92" rx="0" ry="0" width="0" height="1" /> 
    <rect x="325" y="44" rx="3" ry="3" width="610" height="15" /> 
    <rect x="326" y="157" rx="3" ry="3" width="610" height="15" /> 
    <rect x="326" y="189" rx="3" ry="3" width="610" height="15" /> 
    <rect x="327" y="77" rx="3" ry="3" width="200" height="15" />
  </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
export default {
    components: { ContentLoader }
}
</script>
