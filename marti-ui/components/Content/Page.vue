<template>
  <BreadCrumb v-if="record" :title="record.name" :steps="['Page',record.name]" />
  <section class="about-area padding-bottom-90px my-5 overflow-hidden">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="card form-box my-3">
            <div class="card-body py-5"  v-if="record"   v-html="record.content">

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <SectionHelpBlock /> -->
</template>

<script>

export default {
  props :['id','locale'],
  data() {
    return {
      record : null
    }
  },
  methods : {
    getPage(){
       let vue = this;
       $fetch("/api/content/page/"+this.id+'?hl='+this.locale).then(function(result){
          if(!result.status) {
            return false;
          }

          vue.record = result.data.translate.filter(function(item){
            return item.language == vue.locale;
          })[0];
      })
    }
  },
  
  mounted(){
    this.getPage();
  }
}
</script>

