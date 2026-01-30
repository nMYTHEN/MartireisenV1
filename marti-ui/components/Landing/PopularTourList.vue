<template>
    <div class="container mt-3">
      <div class="header-title m-5 text-center"><h3 class="title font-size-26 ">{{ $t('tours.title')}}</h3></div>
      <div class="row" v-if="tours">
      <div class="col-md-3 my-2" v-for="(tour, index) in tours.slice(0, 4)" :key="index">
      <div class="card card-tour rounded-3 border-0 shadow-lg">
        <div class="card-header p-0">
          <div class="card-image">
          <a :href="'/tour/'+tour.seo_url+'?tid='+tour.id" class="d-block"><img :src="'https://webapi.martireisen.at/'+tour.image" :alt="tour.title"></a>
          </div>
        </div>
        <div class="card-body border-0 mt-4">
        <h3 class="card-title"><a :href="'/tour/'+tour.seo_url+'?tid='+tour.id">{{ tour.title }}</a></h3><p>
        <i class="la la-calendar text-color-6 mr-2"></i>{{  tour.period.start_date_pretty }} -
        <i class="la la-calendar text-color-6 mr-2"></i>{{  tour.period.end_date_pretty }}</p>
        <p class="card-meta font-size-12 line-height-20">{{ tour.departure_place }} > {{ tour.destination}}</p>
        </div>
        <div class="card-footer bg-white border-0">
          <div class="mt-0 mt-lg-4 pb-3">
          <span class="price__num font-size-20 me-5 font-weight-bold text-color-9">€ {{  parseInt(tour.price).toFixed(0) }} </span>
           <a v-if="searchData.source == null" :href="'/tour/'+tour.seo_url+'?tid='+tour.id" class="float-end btn theme-btn-blue rounded-2  px-5 text-white">{{ $t('tour.look')}}</a>
          <a v-else :href="'/tour/'+tour.seo_url+'?tid='+tour.id+'&station='+searchData.source" class="float-end btn theme-btn-blue rounded-2  px-5 text-white">{{ $t('tour.look')}}</a>
          </div>
        </div>
      </div>
    </div>
    </div>   
    </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      total : 0,
      limit : 10,
      tours: null,
      loader: true,
      current_page : 1,
      searchData : {
        source: null,
        destination: null,
        date: null,
        sourceList: null,
        destinationList: null,
        dateList: null,
        showAll: false
      },
    };
  },
  methods: {
    getData() {
      let vue = this;
      $fetch("/api/booking/tour/tour/?active=1&ssr=1").then(function (result) {
        if (!result.status) {
          return false;
        }
        vue.tours = result.data;
        vue.loader = false;
      });
    },
    loadSearchResult(searchData){
      this.current_page =1; 
      this.searchData = searchData
      this.getResult()
    },
    getResult() {
      let vue = this;
      vue.searchData.showAll = false;
      $fetch("/api/booking/tour/tour/search?active=1&ssr=1",{ method: 'POST', body: {page : this.current_page, ...vue.searchData} 
          }).then(function(result){
        vue.loader = false;
        if(!result.status) {
          vue.error = true;
          return false;
        }
        vue.searchData.sourceList= result.data.sources;
        vue.searchData.destinationList= result.data.destination;
        vue.searchData.dateList= result.data.dates;
        if(vue.current_page == 1){
          vue.tours = result.data.tours;
          vue.total = result.meta?.total;
        }else{
          vue.tours = vue.tours.concat(result.data.tours)
          vue.total = result.meta?.total;
        }
      })
    },
    loadMore(){
      this.current_page+=1;
      this.getResult();
    },    
  },
  mounted() {
    let vue = this;
    if(vue.$route.name == 'tour')
    {
      if(vue.$route.query.source){
        vue.searchData.source = vue.$route.query.source;
      }
      if(vue.$route.query.destination){
        vue.searchData.destination = vue.$route.query.destination;
      }
      if(vue.$route.query.date){
        vue.searchData.date = vue.$route.query.date;
      }
    }
    this.getResult();
  },
};
</script>