<template>
  <div class="card-item card-item-list">
    <div class="card-img">
      <a  href="javascript:;" @click="go(hotel.giata.hotelId,hotel.name_sef)" class="d-block">
       <img v-if="hotel.mediaData" v-bind:src="image" alt="hotel-img" />
      </a>
      <span class="badge d-none">Bestseller</span>
      <div
        class="add-to-wishlist icon-element"
        data-toggle="tooltip"
        data-placement="top"
        title="Bookmark"
        @click="likeHotel"
      >
        <i v-if="liked" class="la la-heart"></i>
        <i v-else class="la la-heart-o"></i>
      </div>
    </div>
    <div class="card-body p-3 p-lg-4">
      <h3 class="card-title">
        <a href="javascript:;"  @click="go(hotel.giata.hotelId,hotel.name_sef)">{{hotel.name}}</a>
      </h3>
      <p class="card-meta">{{ hotel.location.name }}, ({{ hotel.location.region.name}})</p>
      <div class="card-rating pt-1">
        <span class="ratings d-flex align-items-center">
          <i class="la la-star" v-for="i in parseInt(hotel.category) || 0" :key="i"></i>
        </span>
      </div>
      <div
        class="card-facility d-lg-flex align-items-center justify-content-between"
      >
        
        <div>
          <HotelFacility :keyword_list="hotel.keywordList" :show_modal_button="true" :hotel_code="hotel.code"/>
        </div>

        <div class="text-center d-none d-lg-block" v-if="hotel.rating">
          <p class="font-weight-bold text-center my-1">{{$t('hotels.score')}}</p>
          <div class="">
            <h5><i class="la la-smile text-warning"></i>{{ hotel.rating.overall }}<span>/100</span></h5>
            <p>Exzellent</p>
            <span>{{ hotel.rating.recommendation }} {{$t('hotels.review')}}</span>
          </div>
        </div>

        <div class="mt-3 mt-lg-0">
          <div class="px-4 py-1 bg-rgb-3">
            <p v-if="hotel.offerList" class="font-weight-bold my-2">{{ offer ?  offer.travelDate.duration : ''}} {{$t('common.days')}} , All İnclusive</p>
            <button
              @click="go(hotel.giata.hotelId,hotel.name_sef)"
              class="rounded theme-btn theme-btn-blue text-white my-2 w-100 font-weight-bold"
            >
              <small>ab</small> € {{ $n(hotel.bestPricePerPerson.value) }}
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
import { mapActions } from 'vuex';
export default {
  
  props: ['hotel'],
  data() {
    return {
      likedHotels: [],
      cookieHotelObj: {
        name: null,
        category: null,
        hotelId: null,
        name_sef: null,
        region_name: null,
        location_name: null,
        pictureUrl: null
      },
      liked: false,
    }
  },
  methods : {
    go(id,sef){
      this.$emit('searchHotel',id,sef)
    },
    likeHotel(){
      this.doLikeHotel(this.cookieHotelObj);
      this.likedHotels = this.favHotels;
      if(this.likedHotels?.find((h) => h.hotelId==this.hotel.giata.hotelId) != null){
        this.liked = true;
      }else{
        this.liked = false;
      }
    },
    ...mapActions({
      doLikeHotel: 'doLikeHotel',
    }),
  },
  computed: {
    offer(){
      return this.hotel.offerList ? this.hotel.offerList[0] : null;
    },
    image(){
      return this.hotel.mediaData.pictureUrl?.replace('150','300');
    },
    favHotels: {
      get() {
        return this.$store.getters["likedHotelsList"];
      }
    },
  },
  watch:{
    favHotels (newValue, oldValue) {
      this.likedHotels = this.favHotels;
      if(this.likedHotels?.find((h) => h.hotelId==this.hotel.giata.hotelId) != null){
        this.liked = true;
      }else{
        this.liked = false;
      }
    }
  },
  mounted(){
    this.cookieHotelObj.name = this.hotel.name;
    this.cookieHotelObj.category = this.hotel.category;
    this.cookieHotelObj.hotelId = this.hotel.giata.hotelId;
    this.cookieHotelObj.name_sef = this.hotel.name_sef;
    this.cookieHotelObj.region_name = this.hotel.location.region.name;
    this.cookieHotelObj.location_name = this.hotel.location.name;
    this.cookieHotelObj.pictureUrl = this.hotel.mediaData?.pictureUrl;

    this.$store.dispatch("setLikedHotels");
    this.likedHotels = this.favHotels;
    if(this.likedHotels?.find((h) => h.hotelId==this.hotel.giata.hotelId) != null){
      this.liked = true;
    }else{
      this.liked = false;
    }
  }
}
</script>