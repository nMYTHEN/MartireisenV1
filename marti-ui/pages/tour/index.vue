<template>
  <div>
    <BreadCrumbSmall :step="[$t('tour.month_title')]" />
    <section class="breadcrumb-area py-2 d-none d-lg-block">
      <div class="breadcrumb-wrap">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="my-5" v-if="!$isMobile">
                <TourSearchEngine :filterList="searchData" @change="loadSearchResult" />
                <!-- <SearchEngine /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="card-area py-4">
      <div class="container">
        <div class="row">
          <template v-if="$isMobile">
            <div class="col-lg-12">
              <div>
                <a data-bs-toggle="modal" data-bs-target="#filter-modal"
                  class="text-start btn border font-size-14 font-weight-bold line-height-20  d-lg-none justify-content-between w-100 d-flex ">
                  <span v-if="filterCount == 0">{{ $t('search.no_filter') }}</span>
                  <span v-if="filterCount > 0">{{ filterCount + $t('search.filter_selected') }}</span>
                  <i class="la la-sliders-h font-size-24 py-2"></i>
                </a>
                <div class="modal" tabindex="-1" id="filter-modal" data-bs-backdrop="static">
                  <div class="modal-dialog  modal-fullscreen ">
                    <div class="modal-content">
                      <div class="modal-header offcanvas-header">
                        <h5 class="modal-title">Reiseziel auswahlen</h5>
                        <button type="button" class="btn-close btn-close-white " data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <TourSearchEngine :filterList="searchData" @change="loadSearchResult" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <h3 class="title font-size-26">{{ $t('tours.title') }}</h3>
        <p>{{ $t('tours.subtitle') }}</p>
        <hr />
        <LoaderRegion v-if="loader" />
        <div class="row" v-if="tours">
          <div class="col-lg-6" v-for="(tour, index) in tours" :key="index">
            <div class="tour-card card-item card-item-list ">
              <div class="card-img">
                <a :href="'/tour/' + tour.seo_url + '?tid=' + tour.id" class="d-block">
                  <img :src="'https://webapi.martireisen.at/' + tour.image" alt="Destination-img"
                    style="height:100%; width: 375px;">
                </a>
              </div>
              <div class="card-body ">
                <h3 class="card-title"><a :href="'/tour/' + tour.seo_url + '?tid=' + tour.id">{{ tour.title }}</a></h3>
                <p><i class="la la-calendar text-color-6 mr-2"></i>{{ tour.period.start_date_pretty }}
                  -
                  <i class="la la-calendar text-color-6 mr-2"></i>{{ tour.period.end_date_pretty }}
                </p>

                <p class="card-meta font-size-12 line-height-20">{{ tour.departure_place }} > {{ tour.destination }}</p>
                <div class="mt-0 mt-lg-4 pb-3 ">
                  <span class="price__num font-size-20 me-5 font-weight-bold text-color-9"> € {{
                    parseInt(tour.price).toFixed(0)
                  }} </span>
                  <a v-if="searchData.source == null" :href="'/tour/' + tour.seo_url + '?tid=' + tour.id"
                    class="float-end btn theme-btn-blue rounded-0  px-5 text-white">{{ $t('tour.look') }}</a>
                  <a v-else :href="'/tour/' + tour.seo_url + '?tid=' + tour.id + '&station=' + searchData.source"
                    class="float-end btn theme-btn-blue rounded-0  px-5 text-white">{{ $t('tour.look') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="btn-box mt-3 text-end ">
              <button type="button" class="theme-btn theme-btn-orange w-25" v-if="total > tours?.length"
                @click="loadMore">
                <i class="la la-refresh me-2"></i>{{ $t('common.show_more') }}
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  props: [],
  data() {
    return {
      total: 0,
      limit: 10,
      tours: null,
      loader: true,
      current_page: 1,
      searchData: {
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
  computed: {
    filterCount() {
      let cnt = 0;
      if (this.searchData.source != null) {
        cnt = cnt + 1;
      }
      if (this.searchData.destination != null) {
        cnt = cnt + 1;
      }
      if (this.searchData.date != null) {
        cnt = cnt + 1;
      }
      return cnt;
    }
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
    loadSearchResult(searchData) {
      this.current_page = 1;
      this.searchData = searchData
      this.getResult()
    },
    getResult() {
      let vue = this;
      vue.searchData.showAll = false;
      $fetch("/api/booking/tour/tour/search?active=1&ssr=1", {
        method: 'POST', body: { page: this.current_page, ...vue.searchData }
      }).then(function (result) {
        vue.loader = false;
        if (!result.status) {
          vue.error = true;
          return false;
        }
        vue.searchData.sourceList = result.data.sources;
        vue.searchData.destinationList = result.data.destination;
        vue.searchData.dateList = result.data.dates;

        if (vue.current_page == 1) {
          vue.tours = result.data.tours;
          vue.total = result.meta?.total;
        } else {
          vue.tours = vue.tours.concat(result.data.tours)
          vue.total = result.meta?.total;
        }
      })
    },
    loadMore() {
      this.current_page += 1;
      this.getResult();
    },

  },
  mounted() {
    let vue = this;
    if (vue.$route.name == 'tour') {
      if (vue.$route.query.source) {
        vue.searchData.source = vue.$route.query.source;
      }
      if (vue.$route.query.destination) {
        vue.searchData.destination = vue.$route.query.destination;
      }
      if (vue.$route.query.date) {
        vue.searchData.date = vue.$route.query.date;
      }
    }
    this.getResult();
  },

};
</script>
