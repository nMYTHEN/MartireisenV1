<template>
   <div> 
    <p :class="label_class">{{$t('hotels.amenities')}}</p>
    <span class="d-lg-block d-inline-block" v-for="(fact,index) in props.keyword_list" :key="index">
        <span v-if="index < props.max_count">
            <i class="la la-check text-success mx-2"></i> 
            {{ $t('facility.'+fact)}}
        </span>
    </span>

    <!-- <div v-if="props.show_modal_button">
        <span><small><a href="#" data-toggle="modal" data-target="#hotelKeywordListModal">show all</a></small></span>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#hotelKeywordListModal${props.hotel_code}`">
        Launch demo modal
        </button>

        <div class="modal fade" :id="`hotelKeywordListModal${props.hotel_code}`" tabindex="-1" :aria-labelledby="`hotelKeywordListModal${props.hotel_code}Lable`" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" :id="`hotelKeywordListModal${props.hotel_code}Lable`">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h1>{{ props.hotel_code }}</h1>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </div> -->
</div>
    
</template>
<script setup>

const props = defineProps({
    hotel_code : String,
    keyword_list : [String],
    max_count : {
        type:Number,
        default:4
    },
    show_modal_button :{
        type:Boolean,
        default: false
    },
    label_class : {
        type:Object,
        default: "font-weight-bold  my-1"
    }
    
})
</script>