<template>
  <div>
    <BreadCrumbSmall :step="['Redirect']"  />
    
    <section class="card-area py-3">
      <div class="container">
        <div class="content py-2 container" >
          <div class="row justify-content-center py-5 ">
            <div class="col-12 col-lg-3 py-2 px-4 me-4 text-center  ">
              <img src="https://www.tribus-business.at/wp-content/uploads/2016/02/marti_reisen.png" width="200" />
            </div>
            <div class="col-2 text-center ">
            <i class=" la la-arrow-right font-size-30 mt-lg-5 font-weight-bold"></i>
            </div>
            <div class="col-12 col-lg-3 ms-4 py-4 px-4 text-center">
              <img class="mt-3" src="https://cdn.martigo.com/custom/logo.header.svg"/>
            </div>
            <div class="col-12 text-center  font-size-22">
              <p>
                Sie werden unserem Flugportal weitergeleitet.
              </p>
            </div>
          </div>
               
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
    mounted(){
      
      let redirect = {
        'rent' : {
          'url' : 'https://cars.martigo.com/?ln=de#/searchcars'
        },
        'flight' : {
          'url' : 'https://www.martigo.de/'
        }
      };
      if(this.$route.params.slug){
        let slug = this.$route.params.slug;
        setTimeout(function(){
          location.href = redirect[slug].url;
        },1000)
      }
    }
}
</script>
