<template>
  <div class="sidebar mt-0 d-none d-lg-block">

    <!-- end sidebar-widget -->
    <div class="sidebar-widget" v-if="!detail && resource_data && resource_data.locationList.length > 0">
      <h3 class="title stroke-shape">
        <i class="la la-map-marker text-color-4 me-2"></i>Ort
      </h3>
      <div class="sidebar-category" v-if="resource_data">
        <div class="custom-checkbox" v-for="(location, index) in resource_data.locationList" v-bind:key="index"
          v-show="index < (loadMore.location ? 15 : 5)">
          <input type="checkbox" :id="'f' + index" v-model="filter.city" :true-value="location.code" false-value=""
            v-on:change="set('city')" />
          <label :for="'f' + index">{{ location.name }}</label>
        </div>
        <a class="btn-text" role="button" aria-controls="facilitiesMenu">
          <span class="show-more" @click="loadMore.location = true" v-show="!loadMore.location">{{
      $t('common.show_more') }} <i class="la la-angle-down"></i></span>
          <span class="show-less" @click="loadMore.location = false" v-show="loadMore.location">{{
      $t('common.show_less') }} <i class="la la-angle-up"></i></span>
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
            <i class="la" :class="{ 'la-star': filter.star >= i, 'la-star-o': (!filter.star || filter.star < i) }"></i>
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
          <a v-for="i in [70, 80, 90, 100]" v-bind:key="i" @click="filter.reviewRate = i; set('reviewRate')"
            :class="{ 'theme-btn-orange': filter.reviewRate == i }"
            class="btn btn-light mx-1 btn-sm rounded font-size-14">
            {{ i }}%
          </a>
        </div>

      </div>
    </div>
    <div class="sidebar-widget " v-if="!detail">
      <h3 class="title stroke-shape ">
        <i class="la la-plane-arrival text-color-4 me-2"></i>{{ $t('search.filter_direct_title') }}
      </h3>
      <div class="sidebar-category">
        <div class="custom-checkbox">
          <input type="checkbox" :id="'fl'" v-model="filter.directness" true-value="1" false-value=""
            v-on:change="set('directness')" />
          <label :for="'fl'">{{ $t('search.filter_direct') }}</label>
        </div>
        <div class="custom-checkbox">
          <input type="checkbox" id="transfer" v-model="filter.transfer" true-value="1" false-value=""
            v-on:change="set('transfer')" />
          <label for="transfer">{{ $t('search.filter_transfer') }}</label>
        </div>
      </div>
    </div>
    <div class="sidebar-widget" v-if="!detail">
      <h3 class="title stroke-shape">
        <i class="la la-heart text-color-4 me-2"></i>{{ $t('search.filter_amenities_title') }}
      </h3>
      <div class="sidebar-category">
        <div class="custom-checkbox" v-for="(item, index) in popular_filters" v-bind:key="index">
          <input type="checkbox" :id="'k' + index" v-model="filter.keywordList" :value="item.code"
            v-on:change="set('keywordList')" />
          <label :for="'k' + index">{{ item.name }}</label>
        </div>

      </div>
    </div>
    <!-- end sidebar-widget -->
    <div class="sidebar-widget">
      <h3 class="title stroke-shape">
        <i class="la la-concierge-bell text-color-4 me-2"></i>{{ $t('search.filter_pansion') }}
      </h3>
      <div class="sidebar-category" v-if="resource_data">
        <div class="custom-checkbox" v-for="(boardType, index) in resource_data.boardTypeList" v-bind:key="index"
          v-show="index < (loadMore.boardType ? 15 : 5)">
          <input type="checkbox" :id="'b' + index" v-model="filter.pansion" :true-value="boardType.code" false-value=""
            v-on:change="set('pansion')" />
          <label :for="'b' + index">{{ $t('search.pansion' + (index + 1)) }}</label>
        </div>

        <a class="btn-text" role="button">
          <span class="show-more" @click="loadMore.boardType = true"
            v-show="!loadMore.boardType && resource_data.boardTypeList.length > 5">{{ $t('common.show_more') }} <i
              class="la la-angle-down"></i></span>
          <span class="show-less" @click="loadMore.boardType = false" v-show="loadMore.boardType">{{
      $t('common.show_less') }} <i class="la la-angle-up"></i></span>
        </a>
      </div>
    </div>
    <div class="sidebar-widget">
      <h3 class="title stroke-shape">
        <i class="la la-bed text-color-4 me-2"></i>{{ $t('search.filter_room_type') }}
      </h3>
      <div class="sidebar-category" v-if="resource_data">
        <div class="custom-checkbox" v-for="(roomType, index) in resource_data.roomTypeList" v-bind:key="index"
          v-show="index < (loadMore.roomType ? 15 : 5)">
          <input type="checkbox" :id="'r' + index" v-model="filter.room" :true-value="roomType.code" false-value=""
            v-on:change="set('room')" />
          <label :for="'r' + index">{{ $t('search.room' + (index + 1)) }}</label>
        </div>
        <a class="btn-text" role="button">
          <span class="show-more" @click="loadMore.roomType = true"
            v-show="!loadMore.roomType && resource_data.roomTypeList.length > 5">{{ $t('common.show_more') }} <i
              class="la la-angle-down"></i></span>
          <span class="show-less" @click="loadMore.roomType = false" v-show="loadMore.roomType">{{
      $t('common.show_less') }} <i class="la la-angle-up"></i></span>
        </a>
      </div>
    </div>
    <div class="sidebar-widget" v-if="detail">
      <h3 class="title stroke-shape">
        <i class="la la-user-alt text-color-4 me-2"></i>{{ $t('search.operators') }}
      </h3>
      <div class="sidebar-category" v-if="resource_data">
        <div class="custom-checkbox" v-for="(operator, index) in resource_data.tourOperatorList" v-bind:key="index"
          v-show="index < (loadMore.operator ? 15 : 5)">
          <input type="checkbox" :id="'o' + index" v-model="filter.operators" :true-value="operator.code" false-value=""
            v-on:change="set('operators')" />
          <label :for="'o' + index">{{ operator.name }}</label>
        </div>

        <a class="btn-text" role="button">
          <span class="show-more" @click="loadMore.operator = true"
            v-show="!loadMore.operator && resource_data.tourOperatorList.length > 5">{{ $t('common.show_more') }} <i
              class="la la-angle-down"></i></span>
          <span class="show-less" @click="loadMore.operator = false" v-show="loadMore.operator">{{
      $t('common.show_less') }} <i class="la la-angle-up"></i></span>
        </a>
      </div>
    </div>
    <!-- end sidebar-widget -->

    <!-- end sidebar-widget -->
  </div>
  <!-- end sidebar -->
</template>

<script>
import search from '/utils/search'


export default {
  props: {
    filter_data: {
      type: Object,
      default: null,
    },
    detail: {
      type: Object,
      default: false
    }
  },
  components: {
    search
  },
  data() {
    return {
      resource_data: null,
      filter: {
        pansion: '',
        city: '',
        star: '',
        room: '',
        reviewRate: '',
        operators: [],
        keywordList: [],
      },
      loadMore: {
        location: false,
        operator: false,
        boardType: false,
        roomType: false,
      },
      searchData: {},
      popular_filters: [
        {
          'code': 'ado',
          'name': this.$t('facility.ado'),
        },
        {
          'code': 'bea',
          'name': this.$t('facility.bea'),
        },
        {
          'code': 'ben',
          'name': this.$t('facility.ben'),
        },
        {
          'code': 'pol',
          'name': this.$t('facility.pol'),
        },
        {
          'code': 'fwi',
          'name': this.$t('facility.fwi'),
        }
      ],

    };
  },
  methods: {
    set(key) {
      this.searchData[key] = this.filter[key];
      //this.$router.push({ path: this.$route.path, query: { f: JSON.stringify(this.filter)} })
      let params = search.jsonToUrl(this.filter).toString();
      let paramsJson = JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
      this.$router.push({ path: this.$route.path, query: paramsJson })
      //this.$router.push({ path: this.$route.path, query: search.urlParamsToJson(this.filter)})
    }
  },
  watch: {
    '$route.query'() {
      this.filter = search.get();
    },
    filter_data() {
      this.resource_data = this.resource_data || this.filter_data
    }

  },
  mounted() {
    this.filter = search.getSearchObj();
  },
};
</script>