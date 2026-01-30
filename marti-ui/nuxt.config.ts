export default defineNuxtConfig({
  runtimeConfig: {
      PANEL_URL: process.env.PANEL_URL,
      BASE_URL: process.env.MODE === 'dev' ? process.env.DEV_URL : process.env.PROD_URL,
      public:{
          WEB_URL: process.env.WEB_URL || 'https://www.martireisen.at',
      }
  },

  css: [
      '@/assets/css/bootstrap.min.css',
      '@/assets/css/line-awesome.css',
      '@/assets/css/style.css',
  ],

  modules : [
      '@nuxtjs/device',
      'nuxt-schema-org',
  ],

  app : {
      head : {
          title : 'Urlaub & Pauschal, Last Minute Urlaub, Reiseangebote Günstig Buchen!',
          meta: [
              {
                name: "description",
                content: "Urlaub zum Tiefpreis buchen: Pauschalreisen, Last Minute, Städtereisen, Hotels mit eigener Anreise, Kreuzfahrten, Mietwagen.",
              },
          ],
          script: [
              { src: '/bootstrap.bundle.min.js' },
              {
                  children : `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '285839698423327');
                  fbq('track', 'PageView');
                  `,
              },
              {
                  children : `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-5X64LHM');
                  `
              }
          ],
      }
  },

  compatibilityDate: '2026-01-14',
})