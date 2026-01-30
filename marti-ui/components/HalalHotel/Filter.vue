<template>
  <div class="sidebar mt-0" v-if="filters">
    
    <div class="sidebar-widget pb-1" >
      <h3 class="title stroke-shape mb-2">
        <i class="la la-smile text-color-4 me-2"></i>{{ $t('search.filter_rating') }}
      </h3>
      <div class="sidebar-review">
        <div class="ratings">
          <a v-for="i in 5" v-bind:key="i" @click="filter.stars = i; set('star')" class="btn px-1 font-size-22">
            <i class="la" :class="{'la-star' : filter.stars >= i , 'la-star-o' : (!filter.stars || filter.stars < i) }"></i>
          </a>
        </div>
        
      </div>
    </div>
    <!-- end sidebar-widget -->
    <div class="sidebar-widget" v-for="(group,index) in filters "  :key="index">
      <h3 class="title stroke-shape">
        <i class="la la-concierge-bell text-color-4 me-2"></i>{{ $t('halalbooking.filter.'+group.code) }}
      </h3>
      <div class="sidebar-category" >
        <div
          class="custom-checkbox"
          v-for="(item, index) in group.options"
          v-bind:key="index"
          v-show="index < (loadMore.boardType ? 15 : 5)"
        >
          <input type="checkbox" :id="'b' + group.code + index" v-model="filter[group.code]" :true-value="item.code" false-value="" v-on:change="set(group.code)"  />
          <label :for="'b' +group.code + index">{{ item.name ||  $t('halalbooking.filter.'+group.code+'.'+item.code) }} </label>
        </div>

        <a class="btn-text" role="button">
          <span
            class="show-more"
            @click="loadMore[group.code] = true"
            v-show="!loadMore[group.code] && group.options.length > 5"
            >{{ $t('common.show_more') }} <i class="la la-angle-down"></i
          ></span>
          <span
            class="show-less"
            @click="loadMore[group.code] = false"
            v-show="loadMore[group.code]"
            >{{ $t('common.show_less') }} <i class="la la-angle-up"></i
          ></span>
        </a>
      </div>
    </div>
    

    <!-- end sidebar-widget -->
  </div>
  <!-- end sidebar -->
</template>

<script>
import search from '/utils/search'


export default {
  props: ["filter_data", "detail"],
  components : {
    search
  },
  data() {
    return {
      filter : {
        stars : '',
      },
      loadMore: {
        
      },
      searchData : {},
      filters : null,
    };
  },
  methods : {
    set(key){
      this.searchData[key] = this.filter[key];
      this.$router.push({ path: this.$route.path, query: { f: JSON.stringify(this.filter)} })
    },
    get(){

      let vue = this;
      $fetch("/api/engine/halal-booking/filters").then(function(result){
          if(!result.status) {
            return false;
          }
          vue.filters = result.data;
      })
    }
  },
    watch: {
    '$route.query'() {
        this.filter = search.get();
    }
     
  },
  mounted() {
    this.get();
    this.filter = search.get();
  },
};
</script>