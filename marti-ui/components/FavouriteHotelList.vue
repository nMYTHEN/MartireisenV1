<template>
    <div class="container" v-show="loader">
        <!-- <LoaderLanding v-if="likedHotels?.length > 0"/> -->
          <div v-if="!likedHotels || likedHotels?.length == 0" class="alert alert-secondary" role="alert">
            {{ $t('hotels.liked_empty') }}
          </div>
    </div>
    <client-only>
        <ul>    
            <li v-for="(item, index) in likedHotels" :key="index">
                <HotelFavouriteHotelCard :hotel="item" @removeFav="removeFav"/>
            </li>
        </ul>
    </client-only>  
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
        likedHotels: [],
        loader: true,
    }
  },
  methods:{
    removeFav(hotel){        
      this.doLikeHotel(hotel);
      this.likedHotels = this.favHotels;
    },
    ...mapActions({
      doLikeHotel: 'doLikeHotel',
    }),
  },
  computed: {
    favHotels: {
      get() {
        return this.$store.getters["likedHotelsList"];
      }
    },
  },
  mounted(){    
    this.$store.dispatch("setLikedHotels");
    this.likedHotels = this.favHotels;
  },
  watch:{
    favHotels (newValue, oldValue) {
      this.likedHotels = this.favHotels;
    }
  },
};
</script>