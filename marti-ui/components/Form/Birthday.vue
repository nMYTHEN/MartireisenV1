<template>
     <div class="row m-0">
        
        <div class="col-4 col-md-4 p-0 pe-1 position-relative">
            <select @change="updateDate()" v-model="selectedDay" ref="dayPicker"  
            :class="{ 'border-danger border-2': v$.selectedDay.$errors.length }"
            class="form-control form-marti form-select form-control ps-3" 
            :value="splitDate.day">
                <option :value="null" disabled selected>{{dayText}}</option>
                <option v-for="(day,index) in days" :key="index">{{day}}</option>
            </select>
        </div>
        <div class="col-4 col-md-4 p-0 pe-1 position-relative">
            <select @change="updateDate()" v-model="selectedMonth" ref="monthPicker" 
            :class="{ 'border-danger border-2': v$.selectedMonth.$errors.length }"
            class="form-select form-control ps-3"  :value="splitDate.month" :placeholder="monthText">
                <option :value="null" disabled selected>{{monthText}}</option>
                <option v-for="(month,index) in months" :key="index">{{month}}</option>
            </select>
        </div>
        <div class="col-4 col-md-4 p-0 position-relative">
            <select @change="updateDate()" v-model="selectedYear" ref="yearPicker" 
            :class="{ 'border-danger border-2': v$.selectedYear.$errors.length }"
            class="form-select form-control ps-3"  :value="splitDate.year" :placeholder="yearText">
                <option :value="null" disabled selected>{{yearText}}</option>
                <option v-for="(year,index) in years" :key="index">{{year}}</option>
            </select>
        </div>
    </div>
</template>


<script> 
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
export default {

    props: ['value','children','item_id','max','checkoutclicked'],
    data: function () {
        return {
            days : [],

            dayText : this.$t('user.profile.birthday.day'),
            years :[],
            yearText : this.$t('user.profile.birthday.year'),
            months: [],
            monthText : this.$t('user.profile.birthday.month'),
            seperator : '-',
            selectText : '',
            inputClass : 'form-control form-marti',
            selectedDay:null,
            selectedMonth:null,
            selectedYear:null,
        }
    },
    validations () {
        return {
            selectedDay     :  { required , numeric},
            selectedMonth   :  { required , numeric},
            selectedYear     :  { required , numeric},   
        }
  },
    methods : {
         range : function(start, end) {
             var count = end  - start;
             return Array.apply(0, Array(count))
               .map((element, index) => (index + start) < 10 ? ('0'+ (index+start)) : (index+start));
         }, 
         
         updateDate : function() {
            // const dayValue      = this.$refs.dayPicker.value;
            // const monthValue    = this.$refs.monthPicker.value;
            // const yearValue     = this.$refs.yearPicker.value;
            const dayValue      = this.selectedDay;
            const monthValue    = this.selectedMonth;
            const yearValue     = this.selectedYear;
            var maxYaers = Math.max.apply(Math,this.years);
            
            if(yearValue==maxYaers)
            {
                var currentMonth = new Date().getMonth() + 1; //getMonth return 0-11
                
                this.months = this.range(1,currentMonth+1);
                var currentDay = new Date().getDate();
                 if(parseInt(monthValue) === parseInt(currentMonth))
                 {
                     
                     this.days = this.range(1,parseInt(currentDay)+1);
                 }
                 else
                 {
                     this.days = this.range(1,32);
                 }
                 
            }
             else
             {
                 this.months = this.range(1,13);
                 this.days = this.range(1,32);
             }
            
            this.$emit('input-val', `${yearValue}${this.seperator}${monthValue}${this.seperator}${dayValue}`);
            // if(dayValue != '' && yearValue != '' && monthValue != ''){
                
            //     //$("#"+this.item_id+'_message').hide();
            // }
            
           
         }
    },
    watch: {
        checkoutclicked(val) {
            if(this.checkoutclicked === true)
            {
                this.v$.$validate();
            }

        }
    },
    computed: {
        splitDate() {
            const splitValueString = this.value.split(this.seperator);
          
            return {
                day :   splitValueString[2] || "",
                month:  splitValueString[1] || "",
                year:   splitValueString[0] || ""
            }
        },
    },

    /*mounted : function(){
        
         var maxYear    = new Date().getFullYear(); 
         
         var year = this.children ? maxYear - 17 : 1940; //????????
         
         if(typeof this.max !== 'undefined' && this.max > 0 ){
             maxYear = maxYear - this.max +1;
             year    = maxYear - 1 ;
         }
         
         this.days      = this.range(1,32);
         this.years     = this.range(year,maxYear);
         this.months    = this.range(1,13);
     },*/
     mounted : function(){
        var maxYear = new Date().getFullYear(); 

        var year = this.children ? maxYear - 17 : 1940; 

        if(typeof this.max !== 'undefined' && this.max > 0 ){
            maxYear = maxYear - this.max;
            //year    = tmpMaxYear - 1 ;
        }
        
        this.days      = this.range(1,32);
        this.years     = this.range(year,maxYear+1);
        this.months    = this.range(1,13);
    },
    setup: () => ({ v$: useVuelidate() }),
};
</script>