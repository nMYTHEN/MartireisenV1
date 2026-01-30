<template>
  <BreadCrumb v-if="record" :title="record.name" :steps="['Blog',record.name]" />
  <section class="about-area padding-bottom-90px overflow-hidden mt-3">
        <div class="container">
            <div class="row my-4">
                <div class="col-lg-4">
                    <div class="border p-1 mb-3">
                        <img class="w-100" src="https://martireisen.at/data/image/posts/6/6.jpg" />
                    </div>
                </div>
                <div class="col-lg-8 content"  v-if="record" v-html="record.content">
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
    getPost(){
       let vue = this;
       $fetch("/api/content/post/post/"+this.id+'?hl='+this.locale).then(function(result){
         
          if(!result.status) {
            return false;
          }

          vue.record = result.data.translate.filter(function(item){
            return item.language == vue.locale;
          })[0];
         // vue.record = result.data;
      })
    }
  },
  mounted(){
    this.getPost();
  }
}
</script>

