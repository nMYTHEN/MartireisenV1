<template>
  <div  class="page-scroll card bg-white  mt-2">
    <div v-if="hotel && hotel.rating" class="single-content-item " >
        <iframe :src="'https://review.holidaycheck.com/de/traffics/'+hotel.rating.hotelId"  style="width:100%; height:700px; border:none;"></iframe>
    </div>
  </div>
</template>

<script>

export default {
  props : ['hotel']
}
</script>