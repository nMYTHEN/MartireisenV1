<template>
  <section
    class="
      hotel-area
      section-bg section-padding
      overflow-hidden
      padding-right-100px padding-left-100px
    "
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-heading text-center">
            <h2 class="sec__title line-height-55">
             {{ $t('search.most_popular') }}
            </h2>
          </div>
          <!-- end section-heading -->
        </div>
        <!-- end col-lg-12 -->
      </div>
      <!-- end row -->
      <div class="row padding-top-50px">
        <div class="col-lg-12">
          <div class="hotel-card-wrap">
            <div v-if="loader.hotels" class="d-flex">
              <LoaderPopularHotel class="w-25" v-for="i in 4" :key="i"/>
            </div>
            <swiper
              class="hotel-card-carousel"
              :modules="modules"
              :slides-per-view="1"
              :space-between="30"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
              :pagination="{ clickable: true }"
              :breakpoints ="{ 1024 :  { slidesPerView : 4} }"
            >
              <swiper-slide
                class="card-item mb-0"
                v-for="(hotel,index) in hotels"
                v-bind:key="index"
              >
                <div class="card-img">
                  <a :href="'/hotel/'+hotel.name_sef" class="d-block">
                    <img v-if="hotel.mediaData" v-bind:src="image(hotel)" alt="hotel-img" />
                  </a>
                </div>
                <div class="card-body">
                  <h3 class="card-title">
                    <a :href="'/hotel/'+hotel.name_sef"
                      >{{hotel.name}}</a
                    >
                  </h3>
                  <p class="card-meta">{{ hotel.location.name }}, ({{ hotel.location.region.name}})</p>
                  <div class="card-rating">
                    <span class="badge text-white">4.4/5</span>
                    <span class="review__text">Average</span>
                    <span class="rating__text">(30 Reviews)</span>
                  </div>
                  <div
                    class="
                      card-price
                      d-flex
                      align-items-center
                      justify-content-between
                    "
                  >
                    <p>
                      <span class="price__from">ab.</span>
                      <span class="price__num">$88.00</span>
                      <span class="price__text">Per night</span>
                    </p>
                    <a :href="'/hotel/'+hotel.name_sef" class="btn-text"
                      >{{$t('common.read_more')}}<i class="la la-angle-right"></i
                    ></a>
                  </div>
                </div>
              </swiper-slide>

              <!-- end card-item -->
            </swiper>
          </div>
        </div>
        <!-- end col-lg-12 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container-fluid -->
  </section>
  <!-- end hotel-area -->
</template>


<script>
// import { Pagination, Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper-bundle.min.css";


export default {
  components: {
   // Swiper,
   //SwiperSlide,
  },
  props: ["banners"],
  data() {
    return {
      show: false,
      hotels : [],
      loader : {
        hotels : true
      }
    };
  },
  methods: {

    getResult() {

       let vue = this;
       $fetch("/api/engine/hotel/get",{ method: 'POST', body: this.searchData }).then(function(result){
         
          if(!result.status) {
            return false;
          }
          vue.hotels = result.data.response.hotelList;
          vue.loader.hotels = false;
      })
    },
    offer(){
      return this.hotel.offerList ? this.hotel.offerList[0] : null;
    },
    image(hotel){
      return hotel.mediaData.pictureUrl.replace('150','300');
    }
  },
  
  mounted() {
    this.getResult()
  },
  setup() {
    const onSwiper = (swiper) => {
      ("test");
    };
    const onSlideChange = () => {
      ("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [ Navigation],
    };
  },
};
</script>