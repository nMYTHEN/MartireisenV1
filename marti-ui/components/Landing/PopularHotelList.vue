<template>
    <div class="container-fluid">
    <div class="row">
        <section class="blog-area padding-top-30px">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-heading text-center">
                            <div v-show="error" class="card">
                                <div class="card-body">
                                    <b>Error</b> Data not retrieved from OTA Api
                                </div>
                            </div>
                        
                            <h2 class="text-center my-4 font-size-24">{{ $t('search.most_popular') }}</h2>
                            <div v-show="loader.hotels">
                                <LoaderHotel class="mb-3" v-for="i in 5" v-bind:key="i" />
                            </div>
                        </div><!-- end section-heading -->
                    </div><!-- end col-lg-12 -->
                </div><!-- end row -->
                <div class="row">
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
                            <!-- <swiper-slide v-show="hotel.hotel.mediaData" v-for="(hotel, i) in hotels" v-bind:key="i">
                                {{ hotel.hotel.mediaData }}
                            </swiper-slide> -->
                            <swiper-slide v-show="hotel.mediaData" v-for="(hotel, i) in hotels" v-bind:key="i">
                                <HotelCardSmall @searchHotel="searchHotel" v-bind:hotel="hotel" v-if="hotel.mediaData"></HotelCardSmall>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div><!-- end row -->
            </div><!-- end container -->
        </section><!-- end blog-area -->
    </div>
    
    </div>
</template>

<script>
import search from '/utils/search';
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";


export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            error: false,
            loader: {
                hotels: false,
            },
            hotels: [],
            searchData: {},
            favourites: {},
        }
    },
    methods: {

        getResult() {
            let query  = search.getSearchObj();
            let vue = this;
            vue.loader.hotels = true;
            
            $fetch('/api/engine/Favourite/get').then((r) => {
                vue.favourites = r.data;
                let favourites_gids = vue.favourites.map(x => x.gid_id);
                query['giataIdList']= favourites_gids;
                query['destination'] = [];
                query['departure']= {"code": "VIE", "name": "Wien" };
                $fetch("/api/engine/hotel/get", { method: 'POST', body: query }).then(function (result) {
                    vue.loader.hotels = false;
                    if (!result.status) {
                        vue.error = true;

                        return false;
                    }
                    vue.hotels = result.data.response.hotelList;

                })
                query['giataIdList']= [];
                query['departure']= {"code": "", "name": "Beliebig" };
            })
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
            //location.href = '/hotel/'+sef+'?f='+ JSON.stringify(query2)
            location.href = '/hotel/'+sef+'?'+ search.jsonToUrl(query2)
            query2['giataIdList']=[];
        },
    },
    mounted(){
        let query  = search.getSearchObj();
        query['destination'] = {
            code : "651",
            type : 'country', 
            name : ''
            }
            this.getResult();
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