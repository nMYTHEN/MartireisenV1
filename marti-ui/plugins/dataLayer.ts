export default defineNuxtPlugin((nuxtApp) => {
    return{
        provide:{
            dataLayer: dataLayer
        }
    }
})

const dataLayer = {
	
	page: function (){
        return {
            event_name: 'PageView',
            event_source_url: document.URL,
            action_source: 'website',
            user_data: this.member_info()
        }

	},
	product: function (hotel){
        
        window.dataLayer.push({
            "event": "eec.detail",
            "eventCategory": "Enhanced Ecommerce",
            "eventAction": "Browse",
            "eventLabel": "Product View",
            "ecommerce": {
                "currencyCode": "EUR",
                "impressions": hotel
            }
        });
	},
	
	search: function (data,query){
   
        window.dataLayer.push({
            "event": "eec.impressionView",
            "eventCategory": "Enhanced Ecommerce",
            "eventAction": "Browse",
            "eventLabel": "Product Impressions",
            "ecommerce": {
                "currencyCode": "EUR",
                "impressions": data
            }
        });
	},
	checkout: function (data:any) {
           
        window.dataLayer.push({
            "event": "checkout",
            "ecommerce": {
                "checkout": {
                    "actionField": {
                        "step": 1,
                        "action": "checkout"
                    },
                    "products": data
                }
            }
        });
		
	},
	
	complete: function (orderData:any)
	{

        window.dataLayer.push({
            "event": "purchase",
            "ecommerce": {
                currency : 'EUR',
                value : orderData.amount,
                transaction_id : orderData.code,
                items : [
                    {
                        price : orderData.amount,
                        quantity : 1,
                        item_name : orderData.hotel_name,
                        item_id : orderData.hotel_giata_code,
                    }
                ]
            }
        });
	},
	
}; 

