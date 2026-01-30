<!-- <template>
    <br />
    <br />
    <br />
    {{ searchObj }}
    <br />
    <br />
    <br />
    <br />
    {{ searchUrl }}
</template>
<script>
import search from '/utils/search'
export default ({
    components:{
        search,
    },
    data(){
        return{
            searchObj: null,
            searchUrl: null
        }
    },
    methods:{
        
    },
    mounted(){
        this.searchObj = search.getSearchObj(); 
         
        this.searchUrl = search.jsonToUrl(this.searchObj);
         
    }

})
</script> -->


<script>
import search from '/utils/search';

export default {
    components: {
        search,
    },
    data() {
        return {
            searchObj: null,
            searchUrl: null,
        };
    },
    methods: {

    },
    mounted() {
        this.searchObj = search.getSearchObj();
        this.searchUrl = search.jsonToUrl(this.searchObj);
    },
};
</script>