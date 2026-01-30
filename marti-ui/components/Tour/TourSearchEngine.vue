<template>
  <div>
    <div class="tab-content search-fields-container" id="tourSearchEnginT
    ab">
      <div class="tab-pane fade show active" id="hotel" role="tabpanel" aria-labelledby="hotel-tab">
        <div class="row align-items-center">
          <div class="col-lg-3 pe-lg-0">
            <div class="input-box">
              <label class="label-text">{{ $t('tour.station_select') }}</label>
              <div class="form-group relative">
                <!-- <button type="button" @click="isModal=!isModal" data-bs-target="#destination-modal" class="text-start form-control d-block d-lg-none font-size-16"   :placeholder="$t('tour.station_select')">{{ filterList.source || $t('tour.station_select') }}</button> -->
                <input type="text" autocomplete="off" autofocus class="form-control d-block d-lg-block font-size-16"
                  id="source_input" :value="filterList.source" :placeholder="$t('tour.station_select')"
                  data-bs-toggle="dropdown" />
                <SearchCommonDropDown v-if="!$isMobile" class="desktop-dropdown" @select="select_source"
                  :data="source_list_data" />
                <SearchCommonDropDownMobile v-if="$isMobile" class="mobile-dropdown" @select="select_source"
                  :data="source_list_data" />
              </div>
            </div>
          </div>
          <div class="col-lg-3 pe-lg-0">
            <div class="input-box">
              <label class="label-text">{{ $t('tour.rotate_and_city_select') }}</label>
              <div class="form-group relative">
                <!-- <button type="button" @click="isModal=!isModal" data-bs-target="#destination-modal" class="text-start form-control d-block d-lg-none font-size-16"   :placeholder="$t('tour.rotate_and_city_select')">{{ filterList.destination || $t('tour.rotate_and_city_select') }}</button> -->
                <input type="text" autocomplete="off" autofocus class="form-control d-block d-lg-block font-size-16"
                  id="destination_input" :value="filterList.destination"
                  :placeholder="$t('tour.rotate_and_city_select')" data-bs-toggle="dropdown" />

                <SearchCommonDropDown v-if="!$isMobile" class="desktop-dropdown" @select="select_destination"
                  :data="destination_list_data.map(x => ({ title: $t('Tour.' + x.value), value: x.value }))" />
                <SearchCommonDropDownMobile v-if="$isMobile" class="mobile-dropdown" @select="select_destination"
                  :data="destination_list_data.map(x => ({ title: $t('Tour.' + x.value), value: x.value }))" />
              </div>
            </div>
          </div>
          <div class="col-lg-3 pe-lg-0">
            <div class="input-box">
              <label class="label-text">{{ $t('tour.date_select') }}</label>
              <div class="form-group relative">
                <!-- <button type="button" @click="isModal=!isModal" data-bs-target="#destination-modal" class="text-start form-control d-block d-lg-none font-size-16"   :placeholder="$t('tour.date_select')">{{ filterList.date || $t('tour.date_select') }}</button> -->
                <input type="text" autocomplete="off" autofocus class="form-control d-block d-lg-block font-size-16"
                  id="date_input" :value="filterList.date" :placeholder="$t('tour.date_select')"
                  data-bs-toggle="dropdown" />
                <SearchCommonDropDown v-if="!$isMobile" class="desktop-dropdown" @select="select_date"
                  :data="date_list_data.sort((a, b) => new Date(a.value.split('.').reverse().join('-')) - new Date(b.value.split('.').reverse().join('-')))" />


                <SearchCommonDropDownMobile v-if="$isMobile" class="mobile-dropdown" @select="select_date"
                  :data="date_list_data.sort((a, b) => new Date(a.value.split('.').reverse().join('-')) - new Date(b.value.split('.').reverse().join('-')))" />
              </div>
            </div>
          </div>
          <div class="col-lg-2 btn-box">
            <button v-if="isTour_slug || isIndex || !isTour" @click="doSearchTour" class="
                  theme-btn theme-btn-orange
                  font-weight-bold
                  px-3
                  mt-4 d-lg-none d-block w-100
                ">{{ $t('tour.search_offers') }}
            </button>
            <button v-if="isTour_slug || isIndex || !isTour" @click="doSearchTour" class="
                  theme-btn theme-btn-orange
                  font-weight-bold
                  px-3
                  mt-4 d-lg-flex d-none
                ">{{ $t('tour.search_offers') }}
            </button>
            <button v-if="isTour" @click="clear" class="
                  theme-btn theme-btn-orange
                  font-weight-bold
                  px-3
                  mt-4 d-lg-flex d-none
                ">{{ $t('search.clear') }}
            </button>
            <button v-if="isTour" @click="search_mobile" class="
                  theme-btn theme-btn-orange
                  font-weight-bold
                  px-3
                  mt-4 d-lg-none d-block w-100
                ">{{ $t('tour.search_offers') }}
            </button>
            <button v-if="isTour" @click="clear" class="
                  theme-btn theme-btn-orange
                  font-weight-bold
                  px-3
                  mt-4 d-lg-none d-block w-100
                ">{{ $t('search.clear') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  props: ['filterList'],
  data() {
    return {
      isTour: false,
      isTour_slug: false,
      isIndex: false,
    };
  },
  methods: {
    select_source(obj) {
      this.filterList.source = obj.value; // obj = {title,value}
      this.loadSearchResults()
    },
    select_destination(obj) {
      this.filterList.destination = obj.value; // obj = {title,value}
      this.loadSearchResults()
    },
    select_date(obj) {
      this.filterList.date = obj.value; // obj = {title,value}
      this.loadSearchResults()
    },
    loadSearchResults() {
      this.$emit('change', this.filterList)
    },
    clear() {
      this.filterList.source = null
      this.filterList.destination = null
      this.filterList.date = null
      this.source_show = null
      this.$router.replace({ 'query': null });
      this.loadSearchResults()
    },
    search_mobile() {
      // do emit mobile search
      var myModalEl = document.getElementById('filter-modal')
      var modal = bootstrap.Modal.getInstance(myModalEl)
      modal.hide();
      this.loadSearchResults()
    },
    doSearchTour() {
      let query = '';
      if (this.filterList.source != null) {
        query = query + 'source=' + this.filterList.source;
      }
      if (this.filterList.destination != null) {
        if (query != '') {
          query = query + '&';
        }
        query = query + 'destination=' + this.filterList.destination;
      }
      if (this.filterList.date != null) {
        if (query != '') {
          query = query + '&';
        }
        query = query + 'date=' + this.filterList.date;
      }
      location.href = '/tour/?' + query;
    }
  },
  computed: {
    source_list_data() {
      if (!this.filterList.sourceList)
        return []
      return this.filterList.sourceList.map((item) => { return { title: item, value: item } })
    },
    destination_list_data() {
      if (!this.filterList.destinationList)
        return []
      return this.filterList.destinationList.map((item) => { return { title: item, value: item } })
    },
    date_list_data() {
      if (!this.filterList.dateList)
        return []
      return this.filterList.dateList.map((item) => { return { title: item, value: item } })
    }
  },
  mounted() {
    let vue = this;
    $fetch("/api/booking/tour/tour/search?active=1&ssr=1", {
      method: 'POST', body: { page: 1 }
    }).then(function (result) {
      if (!result.status) {
        return false;
      }
      vue.filterList.sourceList = result.data.sources;
      vue.filterList.destinationList = result.data.destination;
      vue.filterList.dateList = result.data.dates;
    })
    if (this.$route.name == 'tour') {
      this.isTour = true;
    }
    if (this.$route.name == 'tour-slug') {
      this.isTour_slug = true;
    }
    if (this.$route.name == 'index') {
      this.isIndex = true;
    }
  },

};
</script>
