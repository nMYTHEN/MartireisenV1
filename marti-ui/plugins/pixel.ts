export default defineNuxtPlugin((nuxtApp) => {
    return{
        provide:{
            pixel: FbPixel
        }
    }
})

const FbPixel = {
	
	send_member: false,
	request: function (data, type)
	{

        const { isIos } = useDevice();
        data.event_id =  type+'_'+ (new Date()).getTime();
        
        if(isIos) {
            $fetch('/console/fbconversion.php',{
                method : 'POST',
                body : {
                    track_data: data
                } 
            }).then((r)=> {
                 
            }).catch((e)=> {
                 
            });
        }
        
        fbq('track', type , data.custom_data || {} , {eventID: data.event_id});
	},
	run: function () {
        this.request(this.page(), 'PageView');
	},
	page: function (){
        return {
            event_name: 'PageView',
            event_source_url: document.URL,
            action_source: 'website',
            user_data: this.member_info()
        }

	},
	product: function (hotel){

        let data =  {
            event_name: 'ViewContent',
            event_source_url: document.URL,
            action_source: 'website',
            custom_data:
            {
                content_name: hotel.name,
                content_ids: [hotel.giata.hotelId],
                content_type: 'product',
                value: 1,
                currency: 'EUR'
            },
            user_data: this.member_info()
        }
        this.request(data,'ViewContent');
	},
	
	search: function (data,query){
            
        let ids = [];
        for(var i = 0 ; i< data.length; i++) {
            ids.push(data[i]);
        }
        let tmp =  {
            event_name: 'Search',
            event_source_url: document.URL,
            action_source: 'website',
            custom_data:
            {
                content_category : 'Hotel List',
                content_ids: ids,
                search_string : query,
                value: 1,
                currency: 'EUR'
            },
            user_data: this.member_info()
        };
        this.request(tmp,'Search');
	},
	checkout: function (data:any) {
           
        var _this = this;

        _this.request(
        {
            event_name: 'InitiateCheckout',
            event_source_url: document.URL,
            action_source: 'website',
            custom_data:
            {
                'currency': 'EUR',
                'value': data.price,
                'contents': [{id : data.id , quantity : 1}],
                'content_type': 'product',
                'offer' : data
            },
            user_data: _this.member_info()
        }, "InitiateCheckout");
		
	},
	
	complete: function (orderData:any)
	{

        var req =  {
            event_name: 'Purchase',
            event_source_url: document.URL,
            action_source: 'website',
            custom_data: orderData,
            user_data: this.member_info()
        };
        this.request(req,'Purchase');
	},
	
	
	member_info: function ()
	{
        var member = {
            fn: "Guest",
            ln: 'test'
        };

        return member;
	},

}; 

