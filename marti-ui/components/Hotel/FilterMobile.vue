<template>
    <span id="top-of-filters"></span>
    <div class="filter-option p-2 rounded-md d-lg-none d-xl-block" v-show="visible">
      <div class="dropdown dropdown-contain">
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('reviewRate')" v-if="searchData.reviewRate">Min <b>{{ searchData.reviewRate}} %</b> <i class="la la-close"></i></a>
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('pansion')" v-if="searchData.pansion "> {{ getLabel('boardTypeList',searchData.pansion)}}  <i class="la la-close"></i></a>
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('room')" v-if="searchData.room "> {{ getLabel('roomTypeList',searchData.room)}}  <i class="la la-close"></i> </a>
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('city')" v-if="searchData.city ">  {{ getLabel('locationList',searchData.city)}}  <i class="la la-close"></i> </a>
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('directness')" v-if="searchData.directness ">DirektFlug <i class="la la-close"></i> </a>
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('transfer')" v-if="searchData.transfer ">mit Transfer <i class="la la-close"></i> </a>
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('keywordList')" v-if="searchData.keywordList && searchData.keywordList.length > 0 ">Keywords : {{ getKeywordLabel(searchData.keywordList)}} <i class="la la-close"></i> </a>
        <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('star')" v-if="searchData.star">Hotelkategorie <b>{{ searchData.star}}</b> <i class="la la-close"></i></a>

        <a class="rounded btn btn-light rounded me-2 border mb-2 btn-sm"  v-show="visible" @click="reset()" >Alle Filter Löschen  <i class="la la-close"></i> </a>
      </div>
    </div>
    <div class="sidebar mt-0">
        <!-- end sidebar-widget -->
        <div class="sidebar-widget" v-if="!detail && resource_data && resource_data.locationList.length > 0 ">
            <h3 class="title stroke-shape">
            <i class="la la-map-marker text-color-4 me-2"></i>Ort
            </h3>
            <div class="sidebar-category" v-if="resource_data">
            <div
                class="custom-checkbox"
                v-for="(location, index) in resource_data.locationList"
                v-bind:key="index"
                v-show="index < (loadMore.location ? 15 : 5)"
            >
                <input type="checkbox" :id="'f' + index" v-model="filter.city"  :true-value="location.code" false-value="" v-on:change="set('city')" />
                <label :for="'f' + index">{{ location.name }}</label>
            </div>
            <a class="btn-text" role="button" aria-controls="facilitiesMenu">
                <span
                class="show-more"
                @click="loadMore.location = true"
                v-show="!loadMore.location"
                >{{ $t('common.show_more') }} <i class="la la-angle-down"></i
                ></span>
                <span
                class="show-less"
                @click="loadMore.location = false"
                v-show="loadMore.location" 
                >{{ $t('common.show_less') }} <i class="la la-angle-up"></i
                ></span>
            </a>
            </div>
        </div>
        <div class="sidebar-widget pb-1" v-if="!detail">
            <h3 class="title stroke-shape mb-2">
            <i class="la la-smile text-color-4 me-2"></i>{{ $t('search.filter_rating') }}
            </h3>
            <div class="sidebar-review">
            <div class="ratings">
                <a v-for="i in 5" v-bind:key="i" @click="filter.star = i; set('star')" class="btn px-1 font-size-22">
                <i class="la" :class="{'la-star' : filter.star >= i , 'la-star-o' : (!filter.star || filter.star < i) }"></i>
                </a>
            </div>
            
            </div>
        </div>
        <div class="sidebar-widget " v-if="!detail">
            <h3 class="title stroke-shape ">
            <i class="la la-smile text-color-4 me-2"></i>{{ $t('hotels.suggestion') }}
            </h3>
            <div class="sidebar-review">
            <div class="ratings">
                <a v-for="i in [70,80,90,100]" v-bind:key="i" @click="filter.reviewRate = i; set('reviewRate')" :class="{'theme-btn-orange' : filter.reviewRate == i}" class="btn btn-light mx-1 btn-sm rounded font-size-14">
                {{ i }}%
                </a>
            </div>
            
            </div>
        </div>
        <div class="sidebar-widget " v-if="!detail">
            <h3 class="title stroke-shape ">
            <i class="la la-plane-arrival text-color-4 me-2"></i>{{$t('search.filter_direct_title')}}
            </h3>
            <div class="sidebar-category">
            <div class="custom-checkbox">
                <input type="checkbox" :id="'fl'" v-model="filter.directness"  true-value="1" false-value="" v-on:change="set('directness')" />
                <label :for="'fl' ">{{$t('search.filter_direct')}}</label>
            </div>
                <div class="custom-checkbox">
                <input type="checkbox" id="transfer" v-model="filter.transfer"  true-value="1" false-value="" v-on:change="set('transfer')" />
                <label for="transfer">{{$t('search.filter_transfer')}}</label>
            </div>
            </div>
        </div>
        <div class="sidebar-widget" v-if="!detail ">
            <h3 class="title stroke-shape">
            <i class="la la-heart text-color-4 me-2"></i>{{$t('search.filter_amenities_title')}}
            </h3>
            <div class="sidebar-category">
            <div
                class="custom-checkbox"
                v-for="(item, index) in popular_filters"
                v-bind:key="index"
            >
                <input type="checkbox" :id="'k' + index" v-model="filter.keywordList"  :value="item.code" />
                <label :for="'k' + index">{{ item.name }}</label>
            </div>
            
            </div>
        </div>
        <!-- end sidebar-widget -->
        <div class="sidebar-widget" >
            <h3 class="title stroke-shape">
            <i class="la la-concierge-bell text-color-4 me-2"></i>{{ $t('search.filter_pansion') }}
            </h3>
            <div class="sidebar-category" v-if="resource_data">
            <div
                class="custom-checkbox"
                v-for="(boardType, index) in resource_data.boardTypeList"
                v-bind:key="index"
                v-show="index < (loadMore.boardType ? 15 : 5)"
            >
                <input type="checkbox" :id="'b' + index" v-model="filter.pansion" :true-value="boardType.code" false-value="" v-on:change="set('pansion')"  />
                <label :for="'b' + index">{{ boardType.name}}</label>
            </div>
    
            <a class="btn-text" role="button">
                <span
                class="show-more"
                @click="loadMore.boardType = true"
                v-show="!loadMore.boardType && resource_data.boardTypeList.length > 5"
                >{{ $t('common.show_more') }} <i class="la la-angle-down"></i
                ></span>
                <span
                class="show-less"
                @click="loadMore.boardType = false"
                v-show="loadMore.boardType"
                >{{ $t('common.show_less') }} <i class="la la-angle-up"></i
                ></span>
            </a>
            </div>
        </div>
        <div class="sidebar-widget" >
            <h3 class="title stroke-shape">
            <i class="la la-bed text-color-4 me-2"></i>{{ $t('search.filter_room_type') }}
            </h3>
            <div class="sidebar-category" v-if="resource_data">
            <div
                class="custom-checkbox"
                v-for="(roomType, index) in resource_data.roomTypeList"
                v-bind:key="index"
                v-show="index < (loadMore.roomType ? 15 : 5)"
            >
                <input type="checkbox" :id="'r' + index" v-model="filter.room" :true-value="roomType.code" false-value="" v-on:change="set('room')"  />
                <label :for="'r' + index">{{ roomType.name}}</label>
            </div>
    
            <a class="btn-text" role="button">
                <span
                class="show-more"
                @click="loadMore.roomType = true"
                v-show="!loadMore.roomType && resource_data.roomTypeList.length > 5"
                >{{ $t('common.show_more') }} <i class="la la-angle-down"></i
                ></span>
                <span
                class="show-less"
                @click="loadMore.roomType = false"
                v-show="loadMore.roomType"
                >{{ $t('common.show_less') }} <i class="la la-angle-up"></i
                ></span>
            </a>
            </div>
        </div>
        <div class="sidebar-widget" v-if="detail">
            <h3 class="title stroke-shape">
            <i class="la la-user-alt text-color-4 me-2"></i>{{ $t('search.operators') }}
            </h3>
            <div class="sidebar-category" v-if="resource_data">
            <div
                class="custom-checkbox"
                v-for="(operator, index) in resource_data.tourOperatorList"
                v-bind:key="index"
                v-show="index < (loadMore.operator ? 15 : 5)"
            >
                <input type="checkbox" :id="'o' + index" v-model="filter.operators" :true-value="operator.code" false-value=""  v-on:change="set('operators')" />
                <label :for="'o' + index">{{ operator.name}}</label>
            </div>
    
            <a class="btn-text" role="button">
                <span
                class="show-more"
                @click="loadMore.operator = true"
                v-show="!loadMore.operator && resource_data.tourOperatorList.length > 5"
                >{{ $t('common.show_more') }} <i class="la la-angle-down"></i
                ></span>
                <span
                class="show-less"
                @click="loadMore.operator = false"
                v-show="loadMore.operator"
                >{{ $t('common.show_less') }} <i class="la la-angle-up"></i
                ></span>
            </a>
            </div>
        </div>
        <!-- end sidebar-widget -->
        
    </div>
    <span class="p-1"></span>
    <div class="col-lg-2" >
        <button @click="do_filter" class="apply-filter-button theme-btn theme-btn-orange font-weight-bold d-lg-none d-none">{{ $t('search.filter_accept') }}</button>
    </div>
    <!-- end sidebar -->
  </template>
 
  <script>
  import search from '/utils/search'

  export default {
    props: {
      filter_data : {
        type : Object,
        default : null,
      },
      detail : {
        type : Object ,
        default : false
      }
    },
    components : {
      search
    },
    data() {
      return {
        resource_data : null,
        filter : {
          pansion : '',
          city : '',
          star : '',
          room : '',
          reviewRate : '',
          operators : [],
          keywordList : [],
        },
        loadMore: {
          location:  false,
          operator : false,
          boardType: false,
          roomType : false,
        },
        searchData : {},
        popular_filters : [
          {
            'code' : 'ado',
            'name' : this.$t('facility.ado'),
          },
          {
            'code' : 'bea',
            'name' : this.$t('facility.bea'),
          },
          {
            'code' : 'ben',
            'name' : this.$t('facility.ben'),
          },
          {
            'code' : 'pol',
            'name' : this.$t('facility.pol'),
          },
          {
            'code' : 'fwi',
            'name' : this.$t('facility.fwi'),
          }
        ],
       
      };
    },
    methods : {
      set(key){
        //this.searchData[key] = this.filter[key];
        //this.$router.push({ path: this.$route.path, query: { f: JSON.stringify(this.filter)} })
      },
      reset(key){
        if(key){
          if(key == 'keywordList'){
            this.searchData['keywordList'] = [];
            this.filter['keywordList'] = [];
          }
          else{
            delete this.searchData[key];
            delete this.filter[key];
          }
        }else {
          delete this.searchData['reviewRate'];
          delete this.searchData['star'];
          delete this.searchData['pansion'];
          delete this.searchData['room'];
          delete this.searchData['city'];
          delete this.searchData['directness'];
          delete this.searchData['transfer'];
          this.searchData['keywordList'] = [];
          
          delete this.filter['reviewRate'];
          delete this.filter['star'];
          delete this.filter['pansion'];
          delete this.filter['room'];
          delete this.filter['city'];
          delete this.filter['directness'];
          delete this.filter['transfer'];
          this.filter['keywordList'] = [];
        }
        //this.$router.push({ path: this.$route.path, query: { f: JSON.stringify(this.searchData)} })
        this.do_filter()
      },
      getLabel(key,value){
        let a = this.filter_data[key].filter((item)=> {
            return item.code == value
        })
        if(a.length > 0){
          return a[0].name;
        }
        return value;
      },
      getKeywordLabel(value){
        let find = this.popular_filters.filter((item)=> {
          return value.includes(item.code) 
        })
        if(find.length > 0){
          value = find.map((a)=> {
            return a.name
          })
        }
        return value.join(',');
      },
      do_filter(){
          this.$router.push({ path: this.$route.path, query: { f: JSON.stringify(this.filter)} });
          var myModalEl = document.getElementById('filter-modal')
          var modal = bootstrap.Modal.getInstance(myModalEl)
          modal.hide();
      },
    },
    computed:{
      visible(){
          return (this.searchData.pansion || this.searchData.star || this.searchData.room || this.searchData.city || this.searchData.reviewRate || (this.searchData.keywordList && this.searchData.keywordList.length > 0) || this.searchData.directness || this.searchData.transfer)?true:false;
      }
    },
    watch: {
        '$route.query'() {
            this.filter = search.get();
            this.searchData = this.filter;
        },
        filter_data(){
            this.resource_data = this.resource_data || this.filter_data
        }
       
    },
    mounted() {
      this.filter = search.get();
      this.searchData = this.filter;
    },
  };
  </script>