<template>
  <section class="room-detail-bread">
    <swiper
      class="full-width-slider carousel-action"
      :modules="modules"
      :slides-per-view="2"
      :space-between="5"
      navigation
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :pagination="{ clickable: true }"
      :breakpoints="{ 1024: { slidesPerView: 5 } }"
    >
      <swiper-slide
        class="full-width-slide-item"
        v-for="(image, index) in images"
        v-bind:key="index"
      >
        <div
          @click="showImg(index)"
          class="hotel-responsive-image"
          
          v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
        ></div>
      </swiper-slide>
    </swiper>
    <vue-easy-lightbox
      :visible="visible"
      :imgs="largeImages"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
    <!-- end full-width-slider -->
  </section>
  <!-- end room-detail-bread -->
</template>

<script>
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  components: {
     Swiper,
    SwiperSlide,
    VueEasyLightbox,
  },
  props: ["images"],
  data() {
    return {
      show: false,
      visible : false,
      index : 0,
      largeImages :[]
    };
  },
  methods: {
    resize(image,size) {
      return image.replace("180",size);
    },
    showImg(index) {
        this.index = index
        this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  },
  mounted(){
    for(var i = 0 ; i < this.images.length; i++) {
      let image = this.images[i];
      this.images[i] = this.resize(image,"300");
      this.largeImages.push(this.resize(image,"300"))
    }
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
      modules: [Navigation],
    };
  },
};
</script>
