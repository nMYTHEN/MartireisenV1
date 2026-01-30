<template>
   <Teleport to="body">
  <div class="offcanvas offcanvas-end" id="departure-modal">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">{{ $t('search.departure')}}</h5>
      <a
        class="btn"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        ><i class="la la-close"></i
      ></a>
    </div>
    <div class="offcanvas-body">
        <div  v-for="(land, index) in airports" :key="index" >
          <div  v-if="land.items.length > 0 ">
            <b>{{ land.name }}</b><br>
            <button class="btn my-2 mx-1 px-3 font-size-14 border " :class="{'theme-btn-orange' : selected.indexOf(option.code) > - 1}" v-for="(option,subindex) in land.items" :key="subindex" @click="select(option)"> {{ option.name }}</button>
          </div>
        </div>
        <div class="offcanvas-footer ">
             <a
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
        >{{ $t('user.cancel')}}</a>
        <a
            class="btn theme-btn theme-btn-orange line-height-28 "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            @click="setDeparture()"
        >OK</a>
        </div>
    </div>
  </div>
  </Teleport>
</template>

<script>
export default {
  props: ['airports'],
  data(){
      return {
          query : '',
          selected : [],
          selectedNames : [],
      }
  },
  methods: {
    select(airport){
      let index = this.selected.indexOf(airport.code);
      if(index > -1){
        this.selected.splice(index,1);
        this.selectedNames.splice(index,1)
      }else{
        this.selected.push(airport.code);
        this.selectedNames.push(airport.name)
      }
    },
    setDeparture(){
        this.$emit('setDeparture',this.selected,this.selectedNames)
    }
  },
};
</script>
