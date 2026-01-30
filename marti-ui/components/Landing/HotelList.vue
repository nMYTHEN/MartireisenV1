<template>
    <div>
        <div v-show="error" class="card">
            <div class="card-body">
                <b>Error</b> Data not retrieved from OTA Api
            </div>
        </div>
       
        <h2 class="text-center my-4 font-size-24">{{ title }}</h2>
         <div v-show="loader.hotels">
            <LoaderHotel class="mb-3" v-for="i in 5" v-bind:key="i" />
        </div>
        <div class=" my-4" v-show="!loader.hotels">
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
              <swiper-slide v-show="hotel.mediaData" v-for="(hotel, i) in hotels" v-bind:key="i">
                 <HotelCardSmall @searchHotel="searchHotel" v-bind:hotel="hotel" v-if="hotel.mediaData"></HotelCardSmall>
              </swiper-slide>
              </swiper>
        </div>
    </div>
</template>

<script>
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";


export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            title : '',
            error: false,
            loader: {
                hotels: false,
            },
            hotels: [],
            searchData: {},
        }
    },
    methods: {

        getResult(query,title,related_ids) {
            let vue = this;
            vue.loader.hotels = true;
            query['giataIdList']= related_ids;
            query['departure']= {"code": "VIE", "name": "Wien" };
            $fetch("/api/engine/hotel/get", { method: 'POST', body: query }).then(function (result) {

                vue.loader.hotels = false;
                if (!result.status) {
                    vue.error = true;

                    return false;
                }
                vue.hotels = result.data.response.hotelList;
                vue.title = title;

            })
            query['giataIdList']= [];
            query['departure']= {"code": "", "name": "Beliebig" };
        },
        // searchHotel(id, sef) {

        //     this.searchData['destination'] = {
        //         'code': id,
        //         'type': 'hotel'
        //     };
        //     this.searchData['departure']= {
        //         'code': 'VIE', 
        //         'name': 'Wien'
        //     };
        //     location.href = '/hotel/' + sef + '?f=' + JSON.stringify(this.searchData)
        // },
        searchHotel(id, sef) {
            let query2  = search.getSearchObj();
            query2['destination'] = {
                'code': id,
                'type': 'hotel'
            };
            query2['departure']= {
                'code': 'VIE', 
                'name': 'Wien'
            };
            query2['giataIdList']=[id];
            //location.href = '/search/hotels' + '?f=' + JSON.stringify(query2)
            //location.href = '/hotel/'+sef+'?f='+ JSON.stringify(query2);
            location.href = '/hotel/'+sef+'?'+ search.jsonToUrl(query2);
            query2['giataIdList']= [];
        },
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
            modules: [Navigation,Pagination],
        };
    },
}
</script>