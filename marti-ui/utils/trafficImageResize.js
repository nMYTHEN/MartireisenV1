export default {
    default : {

    },
    resize(url,size){
        var image_url = new URL(url);
        var image_search_params = image_url.searchParams;
        image_search_params.set('size', '300');
        image_url.search = image_search_params.toString();
        return image_url.toString();
        
    }
}
