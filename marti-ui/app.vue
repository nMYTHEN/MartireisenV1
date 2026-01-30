<template>
  <div>
    <NuxtLayout>
      <Header />
      <NuxtPage />
      <Footer />
    </NuxtLayout>
  </div>
</template>




<script setup>

const route = useRoute()

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.martireisen.at' + route.path,
    },
  ],
}))

useSchemaOrg([
  
  defineOrganization({
    name: 'Martireisen',
    url: 'https://www.martireisen.at',
    logo: 'https://www.martireisen.at/images/logo.png',
    address:  {
        "@type": "PostalAddress",
        "addressLocality": "Wien, Österreich",
        "postalCode": "1100",
        "streetAddress": "Zentrale: Quellenstraße 72/3, 1100 Wien"
    },
    contactPoint: [
        {
            "@type": "ContactPoint",
            "email": "trip@martireisen.at",
            "telephone": "+4312366060123",
            "contactType": "customer service",
            "faxNumber": "+431236606019"
        }
    ],
    sameAs: [
        'https://www.facebook.com/martireisen',
        'https://www.instagram.com/martireisen',
        'https://www.twitter.com/martireisen',
    ],
  }),

])
</script>