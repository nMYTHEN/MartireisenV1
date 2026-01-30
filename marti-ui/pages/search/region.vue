<template>
   <BreadCrumbSmall :step="['Alle Reiseziele']" />
  <section class="breadcrumb-area before-none bread-bg-11 py-2 d-none d-lg-block">
    <div class="breadcrumb-wrap">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="my-5">
              <SearchEngine />
            </div>
          </div>
          <!-- end col-lg-12 -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end breadcrumb-wrap -->
  </section>

  <section class="card-area py-lg-3 py-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <SearchMobileFilter/>

          <HotelResultBar :count="count" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <HotelFilter  :filter_data="filter_data" class="d-none d-lg-block" />
        </div>
        
        <div class="col-lg-9" v-if="regions">
           <div v-show="loader.region"> 
            <LoaderRegion class="mb-3" v-for="i in 5" v-bind:key="i"/>
          </div>
          <SearchNotFound v-if="regions?.length == 0 && loader.region == false"/>
          <div class="single-content-item" v-show="!loader.region">
            <div class="accordion"  id="accordionPanelsStayOpenExample">
                <RegionItem @search="search" v-for="(region,index) in regions" :region="region" :key="index" :index="index"/>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </section>
</template>

<script>
import searchData from '/utils/search'

export default {
  data() {
    return {
      regions: [],
      filter_data : null,
      loader : {
        region : true
      },
      error : false,
      filters : {},
      count : 0
    };
  },
  components : { searchData },
  methods: {

    getResult() {

       let vue = this;
       vue.error = false;
       vue.loader.region = true;

       $fetch("/api/engine/region/get",{ method: 'POST', body: searchData.get() }).then(function(result){
         
          if(!result.status) {
            vue.error = true;
            return false;
          }
          vue.regions = result.data.response.top.concat(result.data.response.data)
          vue.count = result.data.response.raw.totalResultCount;
         
          vue.loader.region = false;
      })
    },
    search(destination){

        this.filters = searchData.get();
        
        this.filters.destination = {
          type : 'region',
          code : destination.code,
          name : destination.name
        }

        //location.href= '/search/hotels?f='+JSON.stringify(this.filters)
        location.href= '/search/hotels?'+search.jsonToUrl(this.filters)

    },

    getFilters(){

       let vue = this;
       $fetch("/api/engine/statics/get",).then(function(result){
         
          if(!result.status) {
            return false;
          }
          vue.filter_data = result.data.response;
      })
    }
  },
   watch: {
    '$route.query'() {
      this.getResult();
    }
  },

  mounted() {
    this.getResult()
    this.getFilters()
    this.filters = searchData.get();
  },
  setup() {
    
   
    
  },
};
</script>
