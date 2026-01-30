<template>
  <BreadCrumbSmall :step="[meta.data.title]" />
  <div class="container" v-show="loader">
      <LoaderLanding/>
  </div>
  <section v-show="!loader" class="breadcrumb-area  py-2"
  >
    <div class="breadcrumb-wrap">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="bg-rgb-6 p-4 my-4 text-white">
              <h1>{{ content.title }}</h1>
              <div>{{ content.subtitle }}</div>
            </div>
            <div class="mt-4 mb-5">
              <SearchEngine :no_header="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="bg-white  font-size-14 landing-content">
        <div class="my-4" v-if="content.content" v-html="content.content"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["meta", "config"],
  data() {
    return {
      record: null,
      bg_image: "",
      content: {},
      loader : true,
    };
  },
  methods: {
    getData() {
      let vue = this;
      $fetch("/api/landing/base/fetch?code=" + this.meta.data.route).then(
        function (result) {
          if (!result.status) {
            return false;
          }
          vue.record = result.data;
          vue.content = vue.translate(vue.record.translate, vue.meta.data.locale);
          vue.loader = false;
        }
      );
    },
    translate(data, language) {
      for (var i = 0; i < data.length; i++) {
        if (language == data[i].language) {
          return data[i];
        }
      }

      return data[0];
    },
  },
  mounted() {
    this.getData();
    this.bg_image = this.config.public.BASE_URL + this.meta.data.image;
  },
};
</script>

