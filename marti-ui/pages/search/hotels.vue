<template>
  <BreadCrumbSmall :step="[breadcrumb]" />
  <section class="breadcrumb-area py-2 d-none d-lg-block">
    <div class="breadcrumb-wrap">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="my-5">
              <SearchEngine v-if="!$isMobile"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> 
  <section class="card-area py-0 py-lg-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
         
          <SearchMobileFilter v-if="$isMobile" :filter_data="filter_data"  />
          <HotelResultBar v-if="filter_data" :count="filter_data.totalResultCount" :filter_data="filter_data" />

        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <HotelFilter v-bind:filter_data="filter_data"  class="d-none d-lg-block" />
        </div>
        <div class="col-lg-9">
          <div v-show="error" class="card">
            <div class="card-body">
              <b>Error</b> Data not retrieved from OTA Api 
            </div>
          </div>
          <div v-show="loader.hotels"> 
            <LoaderHotel class="mb-3" v-for="i in 5" v-bind:key="i"/>
          </div>
          <SearchNotFound v-if="hotels?.length == 0 && loader.hotels == false"/>
          <HotelCard @searchHotel="searchHotel" v-for="(hotel,i) in hotels"  v-bind:hotel="hotel" v-bind:key="i"></HotelCard>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="btn-box mt-3 text-end ">
            <button type="button" class="theme-btn theme-btn-orange w-25" v-if="total >   hotels.length" @click="loadMore">
              <i class="la la-refresh me-2"></i>{{ $t('common.show_more')}}
            </button>
          
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import search from '/utils/search'

export default {
  components:{
    search
  },
  data() {
    return {
      total : 0,
      limit : 10,
      current_page : 1,
      hotels: [],
      breadcrumb : '',
      filter_data : null,
      loader : {
        hotels : true
      },
      error : false,
      searchData : {},
    };
  },
  methods: {

    getResult() {

       let vue = this;
       //let searchData = search.get(); 
       let searchData = search.getSearchObj();

       vue.error = false;
       vue.loader.hotels = true;
       vue.breadcrumb = this.searchData.destination?.name;
       if(vue.hotels[0]?.giata?.hotelName){
          vue.breadcrumb = vue.hotels[0].giata.hotelName;
       }

       $fetch("/api/engine/hotel/get",{ method: 'POST', body: {page : this.current_page , ...searchData} }).then(function(result){

          vue.loader.hotels = false;
          if(!result.status) {
            vue.error = true;
            return false;
          }
          if(result.data.response.hasOwnProperty('api_error'))
          {
            vue.error = true;
            return false;
          }
          if(vue.current_page == 1){
            vue.hotels = result.data.response.hotelList;
            vue.total = result.data.response.totalResultCount;
            vue.filter_data = result.data.response;
          }else{
            vue.hotels = vue.hotels.concat(result.data.response.hotelList)
          }

          // Facebook Pixel search
          try {
            vue.$pixel.search(result.data.response.hotelList.map((item) => { return item.giata.hotelId}),searchData.destination.name)
          }catch (e) {
             
          }

          // dataLayer search
          try {
            let obj = result.data.response.hotelList.map((item,index) => {
                return {
                  id: item.giata.hotelId,
                  name : item.giata.hotelName,
                  brand : item.tourOperator.name,
                  category : item.location.name,
                  list_no : index +1
                }
            })
            vue.$dataLayer.search(obj)
          }catch (e) {
             
          }
      })
    },

    loadMore(){
      this.current_page+=1;
      this.getResult();
    },  
    searchHotel(id,sef){

      this.searchData['destination'] = {
        'code' : id ,
        'type' : 'hotel'
      };
      this.searchData = search.createHotelQuery(this.searchData);

      //location.href = '/hotel/'+sef+'?f='+ JSON.stringify(this.searchData)
      location.href = '/hotel/'+sef+'?'+ search.jsonToUrl(this.searchData)
     // this.$router.push({ path: '/hotel/'+sef, query: { f: JSON.stringify(this.searchData)} })
    },
  },
  
   watch: {
    '$route.query'() {
      this.current_page = 1;
      this.getResult();

    }
  },
  
  mounted() {
    //this.searchData = search.get();
    this.searchData = search.getSearchObj();
    this.getResult()
    
  },
  setup() {
    
    

  },
};
</script>