<template>
<div>
    <div class="section-tab text-center pl-0 pl-lg-4" v-show="!no_header">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" v-on:click="filters.sf = 2">
          <button
            class="nav-link d-flex align-items-center"
            v-bind:class="{ active: filters.sf == 2 }"
          >
            <i class="la la-shopping-bag mx-1 d-none d-lg-block"></i>{{ $t('menu.pauschal')}}
          </button>
        </li>

        <li class="nav-item" v-on:click="filters.sf = 3">
          <button
            class="nav-link d-flex align-items-center"
            v-bind:class="{ active: filters.sf == 3 }"
          >
            <i class="la la-hotel mx-1 d-none d-lg-block"></i>{{ $t('search.only_hotel')}}
          </button>
        </li>

        <li class="nav-item  d-lg-block">
          <NuxtLink
            class="nav-link d-flex align-items-center"
            to="/redirect/flight"
            v-bind:class="{ active: filters.sf == 4 }"
          >
            <i class="la la-globe mx-1 d-none d-lg-block"></i>{{ $t('menu.flights')}}
          </NuxtLink>
        </li>
        <li class="nav-item" v-on:click="filters.sf = 5">
          <button
            class="nav-link d-flex align-items-center"
            v-bind:class="{ active: filters.sf == 5 }"
          >
            <i class="la la-route mx-1 d-none d-lg-block"></i>{{ $t('tour.breadcrumb')}}
          </button>
        </li>
      </ul>
    </div>
    <div></div>
    <!-- end section-tab -->
    <div v-show="filters.sf != 5" class="tab-content search-fields-container" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="hotel"
        role="tabpanel"
        aria-labelledby="hotel-tab"
      >
        <div class="search-form-action contact-form-action">
          <div class="row align-items-center">
            <div class="col-lg-3 pe-0">
              <div class="input-box">
                <label class="label-text">{{ $t('search.destination')}}</label>
                <div class="form-group">
                  <span
                    class="la la-map-marker form-icon text-color-12 z-index-1"
                  ></span>
                    <button type="button" @click="isModal=!isModal" data-bs-target="#destination-modal" class="text-start form-control d-block d-lg-none font-size-16"   :placeholder="$t('common.beliebig')">{{ query || $t('common.beliebig') }}</button>
                    <input type="text" autocomplete="off"  autofocus class="form-control d-none d-lg-block font-size-16" id="destination_input" v-model="query" :placeholder="$t('common.beliebig')"  @keyup="loadSearchResults" data-bs-toggle="dropdown" />

                    <SearchDestinationDropdown  class="desktop-dropdown" @select="select" :source="source"/>
                    
                    <div v-if="isModal" class="autocomplete-popup" style="position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100%;
                        background: #fff;
                        z-index: 999;">
                      <SearchMobileDestinationWithInput class="mobile-dropdown" @select="select" @load="setQuery" :source="source" @isModal="close()"/>
                    </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 pe-0" v-show="filters.sf == 2">
              <div class="input-box">
                <label class="label-text">{{ $t('search.departure') }}</label>
                <div class="form-group">
                  <span
                    class="la la-plane-departure form-icon text-color-12"
                  ></span>
                    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#departure-modal" class="font-size-16 text-start form-control d-block d-lg-none"   >
                    {{ filters.departure.name ||  $t('common.beliebig')}}
                    </button>
                    <SearchMobileDeparture @setDeparture="setDeparture" class="mobile-date-picker" :airports="source.airports"/>
                    <SearchDepartureDropdown @setDeparture="setDeparture" :airports="source.airports" :value="filters.departure"/>
                </div>
              </div>
            </div>
            <!-- end col-lg-3 -->
          
            <div class="col-lg-3"  >
              <ClientOnly>
              <div class="row">
                      <!-- end col-lg-3 -->
                <div class="col-lg-5 pe-0"  >
                    <div class="input-box">
                      <label class="label-text">{{ $t('search.duration')}}</label>
                      <div class="form-group">
                        <span class="la la-calendar form-icon text-color-12 z-index-2 d-block d-lg-none"></span>
                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#duration-modal" class="font-size-16 text-start form-control d-block d-lg-none"   >
                        {{ filters.duration }} {{ $t('common.days')}}
                        </button>
                        <SearchDurationDropDown  class="d-none d-lg-block"  v-model="filters.duration"/>
                        <SearchMobileDuration v-model="filters.duration"/>
                      </div>
                    </div>
                </div>
                <div class="col-lg-7 pe-0">
                  <div class="input-box">
                    <label class="label-text">{{ $t('search.depart_on') }}</label>
                    <div class="form-group">
                      <span class="la la-calendar form-icon text-color-12 z-index-2"></span>
                      <button type="button" data-bs-toggle="offcanvas" data-bs-target="#datepicker-modal" class=" font-size-16  text-start form-control d-block d-lg-none"   >
                        {{ beautifyDate(filters.date.start) +' - ' + beautifyDate(filters.date.end) ||  $t('common.beliebig')}}
                      </button>
                      <SearchDatepickerDropdown @setDate="setDate" @setDuration="setDuration" :value="filters.date" class=" date-range"/>                 
                      <SearchMobileDatePicker @setDate="setDate" @setDuration="setDuration"  :date="filters.date" class="mobile-date-picker"/>
                    </div>
                  </div>
                </div>
              </div>
              </ClientOnly>
            </div>

            <!-- end col-lg-3 -->
            <div class="col-lg-2" >
              <div class="input-box">
                <label class="label-text">{{ $t('search.traveller')}}</label>
                <div class="form-group">
                    <span class="la la-users form-icon text-color-12 z-index-2 d-block d-lg-none"></span>
                    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#traveller-modal" class="font-size-16 text-start form-control d-block d-lg-none"   >
                      {{ filters.adults }} {{ $t('search.adult').substr(0,3)}}  {{ filters.children?.length }} {{ $t('search.children')}}
                      </button>
                    <SearchTravellerDropdown class="d-none d-lg-block"  @select="setTraveller" :adults="filters.adults" :children="filters.children"/>
                    <SearchMobileTraveller @select="setTraveller" :adults="filters.adults" :children="filters.children" />
                </div>
              </div>
            </div>
            <div class="col-lg-2 btn-box">
              <button
              @click="search"
                class="
                  theme-btn theme-btn-orange
                  font-weight-bold
                  px-3
                  mt-4
                  d-none d-lg-flex
                "
                >{{ $t('search.search_offers') }}
              </button>
              <button
                @click="search"
                class="
                  theme-btn theme-btn-orange
                  font-weight-bold
                  px-3
                  mt-4
                  w-100
                  text-center
                  d-lg-none
                "
                >{{ $t('search.search_offers') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <TourSearchEngine :filterList="tourSearchData" v-show="filters.sf == 5"/>

</div>
</template>


<script>

import search from '/utils/search';

export default {
  props : [ 'no_header' ],
  components: {
    search
},
  data() {
    return {
      date : null,
      query: null,
      source : {
        regions : [],
        hotels : [],
        favourites : [],
        airports : [],
      },
      options: [],
      filters: {
        sf: 2,
        departure : {
          code  : '',
          name  : ''
        },
        destination : {
          type : '',
          code : '',
        },
        date : {
          start : '',
          end : '',
        },
        duration : 7,
        adults : 1,
        children : []
      },
      url : '/search/region',
      isModal: false,
      tourSearchData: {},
    };
  },
  methods: {
    
    loadSearchResults() {

      let input =  new bootstrap.Dropdown(document.getElementById('destination_input'))
      input.show();

      if(this.query?.length < 2){
        this.source.hotels = [];
        this.source.regions = [];
         return false;
      }
     
      $fetch(
        `https://webapi.martireisen.at/api/engine/search/suggest/` + this.query
      ).then((res) => {
        this.source.regions = res.data;
      });

      $fetch(
        `https://webapi.martireisen.at/api/engine/search/get/`, { method : "POST" , body : { q: this.query , type : 'pauschal'} }
      ).then((res) => {
        this.source.hotels = res.data.response.giataHotelList;
      });

    },

    loadFavourites(){
       $fetch(
        `https://webapi.martireisen.at/api/engine/search/favourites`
      ).then((res) => {
        this.source.favourites = res.data;
      });
    }, 

    loadAirports(){
       $fetch(
        `https://webapi.martireisen.at/service/airports/get`
      ).then((res) => {

        let airports = [];
        for(var i = 0; i < res.data?.length; i++){
          //airports = airports.concat(res.data[i].items)
        }
        this.source.airports = res.data;
      });
    },

    search(){
       this.createFilter();
       this.filters.destination.name = this.filters.destination.name; //encodeURIComponent();
       const searchQuery = search.jsonToUrl(this.filters,true);
       //location.href= this.url+'?f='+JSON.stringify(this.filters)
       location.href= this.url+'?'+searchQuery
    },
    close(){
      this.isModal = !this.isModal;
    },
    /* arama motoru destination input start */

    select(type,obj){
       this.filters.destination = {
          code : obj.traffics_code || obj.code,
          name : obj.name,
          type : type == 'hotel' ? 'hotel' : (obj.type || 'region'),
      }
      if(type == 'hotel'){
        this.filters['giataIdList'] = obj.code;
        this.url = '/hotel/'+obj.code;
      }else{
        this.url = '/search/hotels'
      }

      this.query = obj.name;
    },

    setDeparture(codes,names){
       this.filters.departure = {
          code : codes.join(','),
          name : names.join(',')
      }
    },

    setDuration(duration){
      this.filters.duration = duration;
      //this.$router.push({ path: this.$route.path, query: { f: JSON.stringify(this.filters)} });
    },

    setTraveller(traveller){
      this.filters.adults = traveller.adults;
      this.filters.children = traveller.children;
    },

    setDate(dateRange){

       this.filters.date = {
          start : this.fromDate(dateRange.start),
          end :   this.fromDate(dateRange.end),
       }
    },

    setQuery(query){
      this.query = query;
      this.loadSearchResults()
    },  

    createFilter(){
      this.filters.departure = {
          code : this.filters.departure.code,
          name : this.filters.departure.name,
      }
     
      this.filters.destination = {
          code : this.filters.destination.code ||  '',
          name : this.filters.destination.name ||  '',
          type : this.filters.destination.type ||  ''
      }
      
      if( this.filters.destination.type == 'hotel'){
        this.url = '/hotel/'+this.filters.destination.code;
      }else if(this.filters.destination.code == ''){
        this.url = '/search/region';
      }else{
        this.url = '/search/hotels'
      }
      

     /* this.filters.date = {
          start : this.fromDate(this.dateRange.start),
          end :   this.fromDate(this.dateRange.end),
      }*/

    },

    fromDate(date){
       return this.$date(date).format('YYYY-MM-DD')
    },
    beautifyDate(date){
       return this.$date(date).format('DD.MM')
    }
  },
  created(){
    this.loadAirports()
    this.loadFavourites()
    try {
       this.filters = search.getSearchObj(true);
       this.query = this.filters.destination.name != '' ? this.filters.destination.name : ''
    }catch(e){

    }
  },
  
};
</script>