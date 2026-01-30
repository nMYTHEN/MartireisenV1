<template>
  <div  class="page-scroll card bg-white p-4 mt-2">
    <div v-if="hotel" class="single-content-item padding-top-30px padding-bottom-40px" v-html="hotel.catalogData.html">
      
    </div>
  </div>
</template>

<script>

export default {
  props : ['hotel']
}
</script>