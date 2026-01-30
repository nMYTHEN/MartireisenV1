<template>
  <div class="card-item card-item-list">
    <div class="card-img">
      <a  href="javascript:;" @click="go(hotel.place.id)" class="d-block">
       <img v-if="hotel.place.photo" v-bind:src="image" alt="hotel-img" />
      </a>
      <span class="badge d-none">Bestseller</span>
      <div
        class="add-to-wishlist icon-element"
        data-toggle="tooltip"
        data-placement="top"
        title="Bookmark"
      >
        <i class="la la-heart-o"></i>
      </div>
    </div>
    <div class="card-body p-3 p-lg-4">
      <h3 class="card-title">
        <a href="javascript:;"  @click="go(hotel.place.id)">{{hotel.place.name}}</a>
      </h3>
      <p class="card-meta">{{ hotel.place.location.name }}, ({{ hotel.place.location.subregion}})</p>
      <div class="card-rating pt-1">
        <span class="ratings d-flex align-items-center">
          <i class="la la-star" v-for="i in parseInt(hotel.place.stars) || 0" :key="i"></i>
        </span>
      </div>
      <div
        class="card-facility d-lg-flex align-items-center justify-content-between"
      >
        <div>
          <p class="font-weight-bold  my-1">Beliebteste Merkmale</p>
          <span class="d-lg-block d-inline-block"><i class="la la-check text-success mx-2"></i>{{ hotel.place.holiday_type}}</span>
          <span class="d-lg-block d-inline-block"><i class="la la-check text-success mx-2"></i>{{  offer ?  offer.room.name : '' }}</span>
          <span class="d-lg-block d-inline-block"><i class="la la-check text-success mx-2"></i>{{  offer ?  offer.rate_plan.board_basis_name : '' }}</span>
        </div>

        <div class="text-center d-none d-lg-block" v-if="hotel.rating">
          <p class="font-weight-bold text-center my-1">Gästebewertung</p>
          <div class="">
            <h5><i class="la la-smile text-warning"></i>{{ hotel.rating.overall }}<span>/100</span></h5>
            <p>Exzellent</p>
            <span>{{ hotel.rating.recommendation }} Bewertungen</span>
          </div>
        </div>

        <div class="mt-3 mt-lg-0">
          <div class="px-4 py-1 bg-rgb-3">
            <p v-if="hotel.offerList" class="font-weight-bold my-2">{{ offer ?  offer.travelDate.duration : ''}} {{$t('common.days')}} , All İnclusive</p>
            <button
              @click="go(hotel.place.id)"
              class="rounded theme-btn theme-btn-blue text-white my-2 w-100 font-weight-bold"
            >
              <small>ab</small> € {{hotel.min_price }}
              <i class="la la-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end card-item -->
</template>
<script>

export default {
  
  props: ['hotel'],
  data() {
    return {}
  },
  methods : {
    go(id){
      this.$emit('searchHotel',id)
    }
  },
  computed: {
    offer(){
      return this.hotel.groups ? this.hotel.groups[0].offers[0] : null;
    },
    image(){
      return this.hotel.place.photo;
    }
  }
}
</script>