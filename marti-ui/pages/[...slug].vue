<template>
  <div>
    <ContentPage v-if="meta.data.type == 'content/page'" :id="meta.data.table_id" :locale="meta.data.locale" />
    <ContentPost v-if="meta.data.type == 'content/post'" :id="meta.data.table_id" :locale="meta.data.locale" />
    <LandingCountry v-if="meta.data.type == 'landing_country'" :meta="meta" :config="config" />
    <LandingCity v-if="meta.data.type == 'landing_city'" :meta="meta" :config="config" />
    <LandingState v-if="meta.data.type == 'landing_state'" :meta="meta" :config="config" />
    <LandingBase v-if="meta.data.type == 'landing'" :meta="meta" :config="config" />

    <!--- <NotFound v-if="meta.data == false" />-->
  </div>
</template>

<script setup>

const route = useRoute();
const config = useRuntimeConfig();
let params = route.params.slug.filter(n => n)
const { data: meta } = await useFetch(`/api/meta/fetch?q=` + params.join('/'), {
  pick: ["data"],
});

if (meta?._rawValue?.data.type == 'affilate') {
  if (meta?._rawValue?.data.route.startsWith('/tour')) {
    navigateTo(meta?._rawValue?.data.route);
  } else {
    //navigateTo('hotel/'+meta._rawValue.data.hotel.code+'?f='+(meta._rawValue.data.params));
    navigateTo(meta._rawValue.data.redirect_value);
  }
}
else if (meta?._rawValue?.data.type == 'affilatelink') {
  navigateTo(meta?._rawValue?.data.redirect_value);
}

// iç sayfalarda tanımlandı.
if (['landing_country', 'landing_state'].indexOf(meta.value.type) == 1) {
  useHead({
    title: meta._rawValue?.data.title,
    charset: 'utf-8',
    meta: [
      { name: 'description', content: meta._rawValue?.data.description, }
    ],
  })
}
</script>
