<template>
  <div>
    <!-- <BreadCrumbSmall  v-if="record" :step="[record.title]" /> -->
    <BreadCrumbNew :step="step_new" />
    <section class="breadcrumb-area py-2 d-none d-lg-block">
      <div class="breadcrumb-wrap">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="my-5">
                <!-- <SearchEngine /> -->
                <TourSearchEngine :filterList="searchData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="card-area py-3">
      <div class="container">
        <div class="row">
          <template v-if="$isMobile">
            <div class="col-lg-12">
              <div>
                <a data-bs-toggle="modal" data-bs-target="#filter-modal"
                  class="text-start btn border font-size-14 font-weight-bold line-height-20  d-lg-none justify-content-between w-100 d-flex ">
                  <!-- <span>{{$t('tour.search_offers') }}<br><small>
                      bbbbbbbbbbbbbbbbbbbbbbb
                      </small></span> -->
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
        <div class="row">
          <div class="col-lg-8">
            <LoaderHotel v-if="loader" class="my-5" />
            <div v-if="record" class="single-content-wrap form-box p-3 p-lg-4">
              <div id="description" class="page-scroll">
                <div class="single-content-item pb-3">
                  <h3 class="title font-size-26">
                    {{ record.title }}
                  </h3>

                </div>
                <!-- end single-content-item -->
                <div class="section-block"></div>
                <div class="single-content-item py-4">
                  <div class="row">
                    <div class="col-6 col-lg-4">
                      <div class="
                          single-tour-feature
                          d-flex
                          align-items-center
                          mb-3
                        ">
                        <div class="
                            single-feature-icon
                            icon-element
                            mx-1 mx-lg-3 
                            flex-shrink-0
                          ">
                          <i class="la la-clock-o"></i>
                        </div>
                        <div class="single-feature-titles">
                          <h3 class="title font-size-15 font-weight-medium">
                            {{ $t("tour.duration") }}
                          </h3>
                          <span class="font-size-13">{{ record?.plans.length }}</span>
                        </div>
                      </div>
                      <!-- end single-tour-feature -->
                    </div>
                    <!-- end col-lg-4 -->
                    <div class="col-6 col-lg-4">
                      <div class="
                          single-tour-feature
                          d-flex
                          align-items-center
                          mb-3
                        ">
                        <div class="
                            single-feature-icon
                            icon-element
                            mx-1 mx-lg-3 
                            flex-shrink-0
                          ">
                          <i class="la la-users"></i>
                        </div>
                        <div class="single-feature-titles">
                          <h3 class="title font-size-15 font-weight-medium">
                            {{ $t("tour.reservation_count") }}
                          </h3>
                          <span class="font-size-13">{{ reserved_count }} / {{ (record?.period.max_count ?
                            record?.period.max_count : '0') }}</span>
                        </div>
                      </div>
                      <!-- end single-tour-feature -->
                    </div>
                    <!-- end col-lg-4 -->
                    <div class="col-6 col-lg-4">
                      <div class="
                          single-tour-feature
                          d-flex
                          align-items-center
                          mb-3
                        ">
                        <div class="
                            single-feature-icon
                            icon-element
                            mx-1 mx-lg-3 
                            flex-shrink-0
                          ">
                          <i class="la la-globe"></i>
                        </div>
                        <div class="single-feature-titles">
                          <h3 class="title font-size-15 font-weight-medium">
                            {{ $t("tour.tour_type") }}
                          </h3>
                          <span class="font-size-13">{{ record.type }}</span>
                        </div>
                      </div>
                      <!-- end single-tour-feature -->
                    </div>
                    <!-- end col-lg-4 -->
                    <div class="col-6 col-lg-4">
                      <div class="
                          single-tour-feature
                          d-flex
                          align-items-center
                          mb-3
                        ">
                        <div class="
                            single-feature-icon
                            icon-element
                            mx-1 mx-lg-3 
                            flex-shrink-0
                          ">
                          <i class="la la-calendar"></i>
                        </div>
                        <div class="single-feature-titles">
                          <h3 class="title font-size-15 font-weight-medium">
                            {{ $t("tour.date") }}
                          </h3>
                          <span class="font-size-13">{{ record?.period.start_date_pretty }}</span>
                        </div>
                      </div>
                      <!-- end single-tour-feature -->
                    </div>
                    <!-- end col-lg-4 -->
                    <div class="col-6 col-lg-4">
                      <div class="
                          single-tour-feature
                          d-flex
                          align-items-center
                          mb-3
                        ">
                        <div class="
                            single-feature-icon
                            icon-element
                            mx-1 mx-lg-3 
                            flex-shrink-0
                          ">
                          <i class="la la-user"></i>
                        </div>
                        <div class="single-feature-titles">
                          <h3 class="title font-size-15 font-weight-medium">
                            {{ $t("tour.age_group") }}
                          </h3>
                          <!-- <span class="font-size-13">3+</span> -->
                          <span class="font-size-13">{{ record?.age_group || '3+' }}</span> <!-- Dynamischer Wert -->

                        </div>
                      </div>
                      <!-- end single-tour-feature -->
                    </div>
                    <!-- end col-lg-4 -->
                    <div class="col-6 col-lg-4">
                      <div class="
                          single-tour-feature
                          d-flex
                          align-items-center
                          mb-3
                        ">
                        <div class="
                            single-feature-icon
                            icon-element
                            mx-1 mx-lg-3 
                            flex-shrink-0
                          ">
                          <i v-if="isAirplane" class="la la-plane"></i>
                          <i v-else class="la la-bus"></i>
                        </div>
                        <div class="single-feature-titles">
                          <h3 class="title font-size-15 font-weight-medium">
                            {{ $t("tour.departure") }}
                          </h3>
                          <span v-if="isAirplane" class="font-size-13">Airport</span>
                          <span v-else class="font-size-13">Schwedenplatz</span>
                        </div>
                      </div>
                      <!-- end single-tour-feature -->
                    </div>
                    <!-- end col-lg-4 -->
                  </div>
                  <!-- end row -->
                </div>
                <!-- end single-content-item -->
                <div class="section-block"></div>
                <div class="row">
                  <div class="section-tab section-tab-3 pt-0 pt-lg-4">
                    <ul class="nav nav-tabs hotel-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" data-bs-target="#tourdiscription" role="tab"
                          aria-controls="tourdiscription" aria-selected="false">
                          <i class="la la-info me-1"></i>
                          {{ $t("tour.description") }}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tourplan" role="tab"
                          aria-controls="tourplan" aria-selected="false">
                          <i class="la la-route me-1"></i>
                          {{ $t("tour.tour_plan") }}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tourmaps" role="tab"
                          aria-controls="tourmaps" aria-selected="false">
                          <i class="la la-map me-1"></i>
                          {{ $t("tour.map") }}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tourmedia" role="tab"
                          aria-controls="tourmedia" aria-selected="false">
                          <i class="la la-photo-video me-1"></i>
                          {{ $t("tour.pictures") }}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tournote" role="tab"
                          aria-controls="tournote" aria-selected="false">
                          <i class="la la-quote-left me-1"></i>
                          {{ $t("tour.notice") }}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="single-content-wrap">
                    <div class="tab-content margin-bottom-40px" id="myTabcontent">
                      <!-- tourdiscription -->
                      <div class="tab-pane fade fade active show" id="tourdiscription" role="tabpanel">
                        <div class="page-scroll card bg-white p-4">
                          <div class="single-content-item padding-bottom-40px">
                            <div class=" single-content-item padding-top-20px padding-bottom-20px ">
                              <h3 class="title font-size-20 mb-3"> {{ $t("tour.description") }} </h3>
                              <div v-html="record.content" class="mb-4 font-size-14"></div>

                              <!-- end row -->
                              <div class="row">
                                <div class="col-lg-6 responsive-column">
                                  <h3 class="title font-size-15 font-weight-medium pb-3">
                                    {{ $t("tour.included") }}
                                  </h3>
                                  <ul class="list-items">
                                    <li v-for="(property, index) in record.properties" :key="index"
                                      v-show="property.is_free">
                                      <i class="la la-check text-success me-2"></i>{{ property.title }}
                                    </li>
                                  </ul>
                                </div>
                                <div class="col-lg-6 responsive-column">
                                  <h3 class="title font-size-15 font-weight-medium pb-3">
                                    {{ $t("tour.not_included") }}
                                  </h3>
                                  <ul class="list-items">
                                    <li v-for="(property, index) in record.properties" :key="index"
                                      v-show="property.is_free == 0">
                                      <i class="la la-times text-danger me-2"></i>{{ property.title }}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <!-- end row -->
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end tourdiscription -->
                      <!-- tourplan -->
                      <div class="tab-pane fade" id="tourplan" role="tabpanel">
                        <div class="page-scroll card bg-white p-4">
                          <div class="single-content-item padding-bottom-40px">
                            <div id="itinerary">
                              <div class=" single-content-item padding-top-40px padding-bottom-40px">
                                <h3 class="title font-size-20">{{ $t("tour.tour_plan") }}</h3>
                                <div class="accordion accordion-item padding-top-20px border-0" id="accordionExample">
                                  <div class="card" v-for="(day, index) in record.plans" :key="index">
                                    <div class="card-header" :id="'day' + index">
                                      <h2 class="mb-0">
                                        <a class="
                                              btn btn-link
                                              d-flex
                                              align-items-center
                                              justify-content-between
                                              font-size-16
                                            " type="button" data-bs-toggle="collapse"
                                          :data-bs-target="'#dayCollapse' + index" aria-expanded="true"
                                          aria-controls="faqCollapseOne">
                                          <span>{{ day.title }}</span>
                                        </a>
                                      </h2>
                                    </div>
                                    <div :id="'dayCollapse' + index" class="collapse" :class="{ 'show': index == 0 }"
                                      aria-labelledby="faqHeadingOne" data-parent="#accordionExample">
                                      <div class="card-body d-flex align-items-center">
                                        <p>
                                          {{ day.content }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- end single-content-item -->
                              <div class="section-block"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end tourplan -->
                      <!-- tourmaps -->
                      <div class="tab-pane fade" id="tourmaps" role="tabpanel">
                        <div class="page-scroll card bg-white p-4">
                          <div class="single-content-item padding-bottom-40px">
                            <div id="location-map">
                              <div class=" single-content-item padding-top-40px padding-bottom-40px">
                                <h3 class="title font-size-20">{{ $t("tour.map") }}</h3>
                                <div class="gmaps padding-top-30px" v-html="record.map"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end tourmaps -->
                      <!-- tourmedia -->
                      <div class="tab-pane fade" id="tourmedia" role="tabpanel">
                        <div class="page-scroll card bg-white p-4 mt-2">
                          <div class="single-content-item padding-bottom-40px">
                            <div id="photo">
                              <div class="
                                    single-content-item
                                    padding-bottom-40px
                                  ">
                                <h3 class="title font-size-20 mb-2">{{ $t("tour.pictures") }}</h3>
                                <div>
                                  <TourPhotoGallery v-if="record" :images="record.images"></TourPhotoGallery>
                                </div>
                              </div>
                            </div>

                            <div id="video">
                              <div class="
                                    single-content-item
                                    padding-bottom-40px
                                  ">
                                <h3 class="title font-size-20 mb-3">{{ $t("tour.video") }}</h3>
                                <div v-if="record" class="row">
                                  <div class="embed-responsive embed-responsive-16by9"
                                    v-for="(video, index) in record?.videos" :key="index" v-html="video.embed">

                                  </div>
                                </div>
                              </div>
                              <!-- end single-content-item -->
                              <div class="section-block"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end tourmedia -->
                      <!-- touralert -->
                      <div class="tab-pane fade" id="tournote" role="tabpanel">
                        <div class="page-scroll card bg-white p-4 mt-2">
                          <div class="single-content-item padding-bottom-40px">
                            <div id="notes">
                              <div class="
                                    single-content-item
                                    padding-bottom-40px
                                  ">
                                <h3 class="title font-size-20 mb-3">{{ $t("tour.important_notes_and_warnings") }}</h3>
                                <div v-if="record" class="bg-light p-4 row text-break text-center"
                                  v-html="record.agreegment" style="white-space: pre-line;">

                                </div>
                              </div>
                              <!-- end single-content-item -->
                              <div class="section-block"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end touralert -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-box">
              <div class="form-title-wrap py-3">
                <h3 class="title text-color-6 font-weight-bold">
                  {{ $t('header.booking') }}
                </h3>
              </div>
              <div class="form-content">
                <div class="row mb-4">
                  <div class="col-12">
                    <label class="label-text font-size-12">{{ $t('tour.tour_date') }}</label>
                    <div class="form-group">
                      <select class="form-control" v-model="selectedPeriod">
                        <option :value="period" v-for="(period, index) in record?.periods" :key="index">
                          {{ period.start_date_pretty }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12" v-if="selectedPeriod">
                    <label class="label-text font-size-12">{{ $t('tour.departure') }}</label>
                    <div class="form-group">
                      <select class="form-control" v-model="selectedStation">
                        <option :value="station" v-for="(station, index) in selectedPeriod?.stations" :key="index">
                          {{ station.station }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6"
                    :class="{ 'col-6': selectedStation?.child_price != '0.00', 'col-12': selectedStation?.child_price == '0.00' }">
                    <label class="label-text font-size-12">{{ $t('tour.adult_count') }}</label>
                    <div class="form-group">
                      <select class="form-control" v-model="adultCount">
                        <option v-for="i in 20" :key="i">{{ i }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6" v-if="selectedStation?.child_price != '0.00'">
                    <label class="label-text font-size-12">{{ $t('tour.children_count') }}</label>
                    <div class="form-group">
                      <select class="form-control" v-model="childrenCount">
                        <option>0</option>
                        <option v-for="i in 5" :key="i">{{ i }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div v-if="isDisabled == true" class="text-center my-2 text-danger"><b>{{
                  $t("tour.available_error_title")
                }}</b></div>
                <button @click="checkout" :disabled="isDisabled == true"
                  class="btn btn-block w-100 btn-primary rounded-0">
                  {{ $t["tour.make_a_reservation"] }}
                  <span>{{ $t('booking.button') }} <span v-if="price > 0">{{ price }} </span> € </span>
                </button>
                <div class="text-center my-2">{{ $t("tour.or") }}</div>
                <button @click="openWp" class="btn btn-block w-100 btn-success rounded-0">
                  <i class="la la-whatsapp me-2"></i>{{ $t("tour.whatsapp") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: [],
  data() {
    return {
      adultCount: 1,
      childrenCount: 0,
      selectedPeriod: null,
      selectedStation: null,
      record: null,
      loader: true,
      reserved_count: 0,
      step_new: [],
      searchData: {
        source: null,
        destination: null,
        date: null,
        sourceList: null,
        destinationList: null,
        dateList: null
      },
    };
  },

  computed: {

    price() {
      if (!this.selectedStation) {
        return 0;
      }
      return parseInt(this.selectedStation.price) * this.adultCount + (parseInt(this.selectedStation.child_price) * this.childrenCount);
    },
    isAirplane() {
      if (this.record?.departure_place == "Wien")
        return true;
      else
        return false;
    },
    isDisabled() {
      let available = (this.record?.period.max_count ? this.record?.period.max_count : 0)
      let reserved_selected = parseInt(this.reserved_count) + parseInt(this.adultCount) + parseInt(this.childrenCount);
      if (reserved_selected > parseInt(available))
        return true;
      return false;
    },
  },
  methods: {
    getData() {
      let vue = this;
      $fetch("/api/booking/tour/tour/fetch/" + this.$route.query.tid).then(function (result) {
        if (!result.status) {
          return false;
        }
        vue.record = result.data;

        vue.selectedPeriod = vue.record.periods[0]
        if (vue.$route.query.date) {
          vue.selectedPeriod = vue.record?.periods.filter(obj => obj.start_date_pretty == dayjs(vue.$route.query.date).format('DD.MM.YYYY'))[0];
        }
        //vue.selectedStation = vue.record.periods[0].stations[0]
        let defaultStation = 'Wien';
        if (vue.$route.query.station != null) {
          defaultStation = vue.$route.query.station;
        }
        vue.selectedStation = vue.selectedPeriod.stations.filter(x => x.station == defaultStation)[0];
        if (vue.selectedStation == null) {
          vue.selectedStation = vue.record.periods[0].stations[0];
        }

        let params = {
          'tour_id': vue.$route.query.tid,
          'period_id': vue.record?.periods[0]?.id
        };
        //$fetch("/api/engine/tour/fetch/"+JSON.stringify(params)).then(function (result2) {
        $fetch("/api/engine/tour/getTourInfo", { method: 'POST', body: { ...params } }).then(function (result2) {
          if (!result2.status) {
            return false;
          }
          vue.reserved_count = result2.data.successReservesCount;
        });
        vue.step_new.push({ name: vue.$t('tour.breadcrumb'), to: '/tour' });
        vue.step_new.push({ name: vue.record.title });
        vue.loader = false;
      });
      // $fetch("/api/booking/tour/tour/search?active=1&ssr=1",{ method: 'POST', body: {page : 1} 
      //     }).then(function(result){
      //   if(!result.status) {
      //     return false;
      //   }
      //   vue.searchData.sourceList= result.data.sources;
      //   vue.searchData.destinationList= result.data.destination;
      //   vue.searchData.dateList= result.data.dates;
      // })

    },
    translate(data, language) {
      for (var i = 0; i < data.length; i++) {
        if (language == data[i].language) {
          return data[i];
        }
      }

      return data[0];
    },
    openWp() {
      let text = 'Merhaba, ' + this.record.title + ' hakkında bilgi almak istiyorum'
      window.open('https://api.whatsapp.com/send?phone=4312366060&text=' + text);
    },
    checkout() {

      let opts = {
        tour_id: this.record.id,
        period_id: this.selectedPeriod.id,
        station_id: this.selectedStation.id,
        adults: this.adultCount,
        children: this.childrenCount
      }

      location.href = '/tour/checkout?opts=' + JSON.stringify(opts);
    }
  },
  mounted() {
    this.getData();
  },

};
</script>
