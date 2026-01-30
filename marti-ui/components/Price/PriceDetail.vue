<script> 

export default {

    props: ['total_price','price_per_person','price_per_person_diff','traveller_list'],
    data: function () {
        return {
           persons : [],
        }
    },
    methods : {
         
    },
     
    mounted(){
       if(this.traveller_list[0].price == null)
       {
            const person_cnt = this.traveller_list.filter(element => {if (element.type === "H") {return true;}return false;}).length;
            const kind_cnt = this.traveller_list.filter(element => {if (element.type === "K" || element.type === "B") {return true;}return false;}).length;
            let sumAdultPrice = person_cnt * this.price_per_person.value;
            let pp_kind = (this.total_price.value - sumAdultPrice)/kind_cnt;
            pp_kind = parseFloat(pp_kind).toFixed(2);
            let index =1;
            this.persons = this.traveller_list.map(item => {
                return {
                    index : index++,
                    person_lable: (item.type == 'H' ?  this.$t('search.adult') : (this.$t('search.children') + '('+item.age+' jahre )')),
                    price : this.$n((item.type == 'H' ? parseFloat(this.price_per_person.value).toFixed(2) : pp_kind ),'currency') + ' ' + this.price_per_person.currency,
                }
            })
       }
       else
       {
        let index =1;
        this.persons = this.traveller_list.map(item => {
                return {
                    index : index++,
                    person_lable: (item.type == 'H' ?  this.$t('search.adult') : (this.$t('search.children') + '('+item.age+' jahre )')),
                    price : (item.price !== null ? this.$n(item.price.value,'currency') + ' ' + item.price.currency : '0    ' + this.price_per_person.currency),
                }
            })
       }
    }
};
</script>

<template>
    <table style="width: 100%;"> 
        <tr v-for="(p,index) in persons" :key="index">
            <td style="text-align: right; padding: 0px 3px 0px 0px;"><span class="font-weight-bold" style="font-size:0.8em">{{ p.index}}. </span> </td>
            <td><span style="font-size:0.8em">{{ p.person_lable + ': ' }}</span></td>
            <td style="text-align: right; padding: 0px 5px 0px 10px;"><span style="font-size:0.8em"><em> {{p.price}}</em></span></td>
        </tr>
    </table>
</template>
