<template>
  <div class="filter-wrap mt-2 mb-2">
   
    <!-- end filter-top -->
    <div class="input-group mb-3 d-lg-none">
      <select class="form-select p-1" v-model="value" @change="set()">
        <option class="dropdown-content" :value="item.code" v-for="(item,index) in sort" :key="index"> {{item.label}}</option>
      </select>
      <span class="input-group-text">
        <a @click="filter_clicked" data-bs-toggle="modal" data-bs-target="#filter-modal" class="text-start btn border-none font-size-14 font-weight-bold line-height-20  d-lg-none justify-content-between w-100 d-flex " >
            <i class="la la-filter font-size-24 py-0"></i>
        </a>
      </span>
    </div>
    <div class="row">
      <div class="col-8">
        <div class="filter-bar-filter d-flex flex-wrap align-items-center">
          <div class="filter-option">
            <h3 class="title font-size-16">{{ count}} {{ $t('search.results') }}</h3>
          </div>
        </div>
      </div>
      <div class="col-4 flex-wrap align-items-center d-lg-flex d-none">
        <select class="form-select p-1" v-model="value" @change="set()">
          <option class="dropdown-content" :value="item.code" v-for="(item,index) in sort" :key="index"> {{item.label}}</option>
        </select>
      </div>
      <div class="col-12"> 
        <div class="d-lg-block d-none">
          <div class="filter-option  p-2 rounded-md" v-show="visible">
            <div class="dropdown dropdown-contain">
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('star')" v-if="searchData.star">Hotelkategorie <b>{{ searchData.star}}</b> <i class="la la-close"></i></a>
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('reviewRate')" v-if="searchData.reviewRate">Min <b>{{ searchData.reviewRate}} %</b> <i class="la la-close"></i></a>
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('pansion')" v-if="searchData.pansion "> {{ getLabel('boardTypeList',searchData.pansion)}}  <i class="la la-close"></i></a>
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('room')" v-if="searchData.room "> {{ getLabel('roomTypeList',searchData.room)}}  <i class="la la-close"></i> </a>
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('city')" v-if="searchData.city ">  {{ getLabel('locationList',searchData.city)}}  <i class="la la-close"></i> </a>
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('directness')" v-if="searchData.directness ">DirektFlug <i class="la la-close"></i> </a>
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('transfer')" v-if="searchData.transfer ">mit Transfer <i class="la la-close"></i> </a>
              <a class="rounded btn bg-3 text-white border btn-sm rounded me-2 mb-2"  @click="reset('keywordList')" v-if="searchData.keywordList && searchData.keywordList.length > 0 ">Keywords : {{ getKeywordLabel(searchData.keywordList)}} <i class="la la-close"></i> </a>

              <a class="rounded btn btn-light rounded me-2 border mb-2 btn-sm"  v-show="visible" @click="reset()" >Alle Filter Löschen  <i class="la la-close"></i> </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '/utils/search'

export default {
  components: {
    search 
  },
  props : ['count','filter_data'],
  data() {
    return {
      visible : false,
      searchData :{},
      sort : [
        {'code' : "" , 'label' : this.$t('common.beliebig')},
        {'code' : "TOP" , 'label' : this.$t('search.sort_top')},
        {'code' : "PRICE" , 'label' : this.$t('search.sort_price_asc')},
        {'code' : "PRICE_ZA" , 'label' :  this.$t('search.sort_price_desc')},
      ], 
      popular_filters : [
        {
          'code' : 'ado',
          'name' : 'Nur für Erwachsene',
        },
        {
          'code' : 'bea',
          'name' : 'Direkte Strandlage',
        },
        {
          'code' : 'ben',
          'name' : 'Sandstrand',
        },
        {
          'code' : 'pol',
          'name' : 'Pool',
        },
        {
          'code' : 'fwi',
          'name' : 'WLAN',
        }
      ],
      value :  ""
    }
  },
  methods : {
    set(){
      this.searchData.sort = this.value;
      //location.href = '/search/hotels?f='+JSON.stringify(this.searchData)
      location.href = '/search/hotels?'+search.jsonToUrl(this.searchData)
    },
    reset(key){
      if(key){
         if(key == 'keywordList'){
          this.searchData['keywordList'] = [];
         }
         else{
          delete this.searchData[key];
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
      }
      //this.$router.push({ path: this.$route.path, query: { f: JSON.stringify(this.searchData)} })
      let params = search.jsonToUrl(this.searchData).toString();
      let paramsJson = JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
      this.$router.push({ path: this.$route.path, query: paramsJson})
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

    filter_clicked(){
      let modal_body= document.querySelectorAll('#filter-modal .modal-body')[0];
      let top_of_filters= document.getElementById('top-of-filters');
      modal_body.scrollTo(0,(top_of_filters.offsetTop - 10));
    }
  },
  computed:{
    visible(){
        return this.searchData.pansion || this.searchData.star || this.searchData.room || this.searchData.city || this.searchData.reviewRate || (this.searchData.keywordList && this.searchData.keywordList.length > 0) || this.searchData.directness || this.searchData.transfer
    }
  },
  watch: {
    '$route.query'() {
        this.searchData = search.getSearchObj();
    }
     
  },
  mounted(){
    this.searchData = search.getSearchObj();
    this.value = this.searchData.sort  || this.value;
  }
}

</script>
