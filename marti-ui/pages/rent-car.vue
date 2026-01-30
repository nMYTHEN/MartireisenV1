<template>
  <div>
    <BreadCrumbSmall :step="['Mietwagen']"  />
    <section class="breadcrumb-area py-2 d-none d-lg-block">
      <div class="breadcrumb-wrap">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="my-5 text-white">
                  <h1>Mietwagen</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="card-area py-3">
      <div class="container">
           <div class="content py-4 container" style="background-color: #f8f8f8 !important;" ct-app>
                <div class="lds-css ng-scope" ><div class="lds-dual-ring">Loading..</div></div>
                <noscript>YOUR BROWSER DOES NOT SUPPORT JAVASCRIPT</noscript>
            </div>
      </div>
    </section>
  </div>
</template>

<script>

export default{

    mounted(){
       // ((window.innerWidth <= 800)) ? 'mobile' :
        // Booking Engine Settings.
        const languageCode = this.$route.params['lang'];
        const type = this.$route.params['type'];
        const currency = this.$route.params['currency'];
        var CT = {
            ABE: {
                Settings: {
                    clientID: '537458',
                    language: 'de',
                    type:  'desktop',
                    logo: '/data/image/settings/email_logo/email_logo.png',
                    currency: 'EUR',
                    rtl: false,
                    templateLayout: {
                        breadcrumbs: true
                    },
                    theme: {
                        primary: '#ff932b', // e.g #0000FF
                        secondary: '#ff9700', // e.g #FF0000
                        complimentary: '#003283' // e.g #000000
                    },
                }
            }
        };
        // Booking Engine Loader.
        (function () {
            CT.ABE.Settings.version = '5.0';
            var cts = document.createElement('script');
            cts.type = 'text/javascript';
            cts.async = true;
            cts.src = '//ajaxgeo.cartrawler.com/abe' + CT.ABE.Settings.version + '/ct_loader.js?' + new Date().getTime();
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(cts, s);
        })();
        
    }
}
</script>

<style>
    .ct-search-cars-form-container {
        width: 100%;
       /* background-image: url(themes/web/martireisen/assets/img/search.png);*/
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #11408b;
        padding: 50px;
    }
    .ct-search-cars-form-container label {
        color :white;
    }
    .ct-search-cars-form-container h2 {
        color : white !important;
    } 
    .ct-search-cars-form-container #ct-button-search button {
      background-color:#f7a534;
    }
    
    
</style>
