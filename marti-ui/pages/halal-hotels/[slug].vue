<template>
  <div>
    <BreadCrumbSmall :step="[meta.data.title]" />
    <section class="breadcrumb-area py-2 d-none d-lg-block">
      <div class="breadcrumb-wrap">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="my-5 text-white">
                <h1>{{ meta.data.title }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="card-area py-3">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <HotelResultBar v-if="filter_data" :count="filter_data.totalResultCount" />

          </div>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <HalalHotelFilter />
          </div>
          <div class="col-lg-9">
            <div v-show="error" class="card">
              <div class="card-body">
                <b>Error</b> Data not retrieved from OTA Api
              </div>
            </div>
            <div v-show="loader.hotels">
              <LoaderHotel class="mb-3" v-for="i in 5" v-bind:key="i" />
            </div>
            <HalalHotelCard @searchHotel="searchHotel" v-for="(hotel, i) in hotels" v-bind:hotel="hotel" v-bind:key="i">
            </HalalHotelCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import search from '/utils/search'

export default {
  components: { search },
  data() {
    return {
      searchData: {},
      error: false,
      filter_data: {},
      loader: {
        hotels: true
      },
      hotels: []
    }
  },
  methods: {

    getResult() {

      let vue = this;

      vue.error = false;
      vue.loader.hotels = true;

      let params = search.get();

      if (this.meta?.data.route.indexOf('country') > -1) {
        params['destination'] = {
          type: 'region',
          code: this.meta?.data.table_id
        }
      } else if (this.meta?.data.route.indexOf('filter') > -1) {
        params['destination'] = {};
        params['holiday_type'] = 'villa';
      }

      $fetch("/api/engine/halal-booking/get-hotel", { method: 'POST', body: params }).then(function (result) {

        vue.loader.hotels = false;
        if (!result.status) {
          vue.error = true;

          return false;
        }
        vue.hotels = result.data.offers;

      })
    },

    searchHotel(id) {

      this.searchData['destination'] = {
        'code': id,
        'type': 'hotel'
      };
      location.href = '/halal-hotels/hotel-' + id + '?f=' + JSON.stringify(this.searchData)
      //this.$router.push({ path: '/hotel/' + sef, query: { f: JSON.stringify(this.searchData) } })
    },
  },
  watch: {
    '$route.query'() {
      this.getResult();
    }
  },
  mounted() {

    this.searchData = search.get();
    this.getResult();

  }
}
</script>

<script setup>

const route = useRoute();

const { data: meta } = await useFetch(`/api/meta/fetch?q=halal-hotels/` + route.params.slug, {
  pick: ["data"],
});

useHead({
  title: meta._rawValue.data.title,
  charset: 'utf-8',
  meta: [
    { name: 'description', content: meta._rawValue.data.description, }
  ],
})
</script>
