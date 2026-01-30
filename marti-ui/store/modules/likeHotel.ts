export default{
    state:{
        LikedHotels: [],
    },
    mutations:{
        SET_LIKED_HOTELS(state){
            const cookieLikedHotels = useCookie('martiLikedHotels-a1591467-3a81-4177-a52a-1ef1086a3c51');
            if(cookieLikedHotels != null && cookieLikedHotels != undefined){
                state.LikedHotels = cookieLikedHotels;
            }
        },
        DO_Like_HOTEL(state,likedHotelsObj){
            state.LikedHotels = likedHotelsObj;
            let cookieLikedHotels = useCookie('martiLikedHotels-a1591467-3a81-4177-a52a-1ef1086a3c51');
            if (typeof(cookieLikedHotels.value) == "undefined" && cookieLikedHotels.value == null ) {
                cookieLikedHotels.value =[];
            }
            state.LikedHotels = cookieLikedHotels.value;
            if(state.LikedHotels?.find((h) => h?.hotelId==likedHotelsObj.hotelId) != null){
                for( var i = 0; i < state.LikedHotels.length; i++){ 
                    if (state.LikedHotels[i].hotelId === likedHotelsObj.hotelId) { 
                        state.LikedHotels.splice(i, 1);                        
                        break;
                    }
                }
            }else{
                state.LikedHotels.push(likedHotelsObj);
            }
            cookieLikedHotels.value = state.LikedHotels;
        },
    },
    actions:{
        setLikedHotels({commit}){
            commit("SET_LIKED_HOTELS");
        },
        doLikeHotel({commit},hotelObj){
            commit("DO_Like_HOTEL", hotelObj);
        }
    },
    getters: {
        likedHotelsList: (state) => {
            return state.LikedHotels;
        },        
    }
}