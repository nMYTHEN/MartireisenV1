<template>
  <div  class="page-scroll card bg-white p-4 mt-2">
    <div v-if="hotel" class="single-content-item padding-top-30px padding-bottom-40px" >
        <iframe :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyAVGNwbvigFHm8VnSxPUCoKk_EOlDtPfPM&q='+hotel.location.latitude+','+hotel.location.longitude"  style="width:100%;border:none; height:500px"></iframe>
    </div>
  </div>
</template>

<script>

export default {
  props : ['hotel']
}
</script>