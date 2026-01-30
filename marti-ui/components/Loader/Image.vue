<template>
 <content-loader
    viewBox="0 0 520 370"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="10" y="10" rx="2" ry="2" width="500" height="350" />
  </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
export default {
    components: { ContentLoader }
}
</script>
