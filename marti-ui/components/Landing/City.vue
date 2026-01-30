<template>
    <BreadCrumbSmall :step="[content.title]" />
    
    <section  class="breadcrumb-area py-2">
      <div class="breadcrumb-wrap">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="bg-rgb-6 p-4 my-4 text-white" >
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
        <div v-show="pending">
            <LoaderLanding/>
        </div>
        <div class="row my-4" v-if="content.title">
          <div class="col-lg-12">
              <h2 class="text-center my-2">{{ content.second_title}}</h2>
              <p class="text-center" v-html=" content.second_subtitle"></p>
              <LandingHotelList ref="hotelList"></LandingHotelList>
          </div>
        </div>
        <div class="bg-white font-size-14 landing-content">
          <div class="my-4" v-if="content.content" v-html="content.content"></div>
        </div>
      </div>
    </section>
  </template>
  
  
  <script setup> 
  
  import search from '/utils/search';
  
  const content = ref({});
  const hotelList = ref(null);
  const props   = defineProps(['meta', 'config']);
  
  const { pending, data: res } = await useFetch('/api/landing/zone/fetch/city/', {
      key : 'landing_city',
      method: 'POST',
      body: props.meta.data
  })
  
  const translate = (data, language) => {
      for (var i = 0; i < data.length; i++) {
          if (language == data[i].language) {
              return data[i];
          }
      }
      return data[0];
  }
  
  content.value = translate(res.value.data.translate, useCookie("store-language").value)
  
  onMounted(() => {
  
      let query  = search.getSearchObj();
      query['destination'] = {
        code : res.value.data.zone_code,
        type : 'hotel', 
        name : ''
      }
      hotelList.value.getResult(query,content.value.third_title,res.value.data.related_ids);
  
  })
  
  useHead({
      title: content.value.title,
      meta: [
          {
              hid: 'description',
              name: 'description',
              content: content.value.subtitle
          }
      ]
  })
  </script>