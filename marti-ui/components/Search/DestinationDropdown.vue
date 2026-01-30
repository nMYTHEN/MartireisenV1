<template>
  <div class="dropdown-menu dropdown-menu-wrap py-1 px-3">
    <label
      class="label-text text-color-12"
      v-show="source.regions.length == 0 && source.hotels.length == 0"
      >{{ $t("search.most_popular") }}</label
    >
    <div
      class="list-group list-group-flush"
      v-show="source.regions.length == 0 && source.hotels.length == 0"
    >
      <a
        href="javascript:;"
        tabindex="0"
        @click="select('region', region)"
        class="list-group-item list-group-item-action font-size-13 py-0 px-0 border-0"
        v-for="(region, index) in source.favourites"
        :key="index"
      >
        <i class="la la-map-marker text-color-12 z-index-1 me-2"></i>
        {{ region.name }}
      </a>
    </div>
    <label
      v-show="source.regions.length > 0"
      class="label-text text-color-12"
      >{{ $t("search.regions") }}</label
    >
    <div class="list-group list-group-flush">
      <a
        href="javascript:;"
        tabindex="0"
        @click="select('region', region)"
        class="list-group-item list-group-item-action font-size-13 py-0 px-0 border-0"
        v-for="(region, index) in source.regions"
        :key="index"
      >
        <i class="la la-map-marker text-color-12 z-index-1 me-2"></i>
        {{ region.name }}
      </a>
    </div>
    <hr class="my-2" v-show="source.regions.length > 0" />
    <label v-show="source.hotels.length > 0" class="label-text text-color-12">{{
      $t("search.hotels")
    }}</label>
    <div class="list-group list-group-flush">
      <a
        href="javascript:;"
        tabindex="0"
        @click="select('hotel', hotel)"
        class="list-group-item list-group-item-action font-size-13 py-0 px-0 border-0"
        v-for="(hotel, index) in source.hotels"
        :key="index"
      >
        <i class="la la-concierge-bell text-color-12 z-index-1 me-2"></i>
        {{ hotel.name }} <small>({{ hotel.location.name }})</small>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["source"],
  methods: {
    select(type, obj) {
      this.$emit("select", type, obj);
    },
  },
};
</script>
