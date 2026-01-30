// search.js
import dayjs from 'dayjs'

export default {
    default : {
        "sf": "2", 
        "date": { 
            "start": dayjs().add(5, 'day').format('YYYY-MM-DD'),
            "end": dayjs().add(30, 'day').format('YYYY-MM-DD')
        }, 
        "departure": {
            "code": "", 
            "name": "Beliebig" 
        }, 
        "destination": { 
            "type": "",
            "code": "" 
        }, 
        "adults": "2", 
        "children" : [],
        "keywordList" : [],
        "duration": "7",
        "giataIdList": [],
    },
    
    set(obj){
        
    },
    get(){
        let url = new URLSearchParams(window.location.search);
        let obj = url.get('f');
        if(obj == null){
            return this.default
        }
        let objJson = JSON.parse(obj);
        if(!Array.isArray(objJson['keywordList'])){
            objJson['keywordList'] = [];
        }
        return objJson
        
    },


    urlParamsToJson(urlStr){
        let paramsStr = urlStr.toString();
        let paramsJson = JSON.parse('{"' + paramsStr.replace(/&/g, '","').replace(/=/g,'":"') + '"}', 
                    function(key, value) { 
                        return key===""?value:decodeURIComponent(value) 
                    })
        return paramsJson;
    },

    jsonToUrl(jsonObj,clearFilter=false){
        //const jsonObj = JSON.parse(jsonStr);
        let data ={};
        if (jsonObj.hasOwnProperty("destination")) {
            if(jsonObj["destination"]["name"]){
                data.destination = encodeURIComponent(jsonObj["destination"]["name"]);
            }            
        }
        if (jsonObj.hasOwnProperty("sf")) {
            data.sf = jsonObj["sf"];
        }
        if (jsonObj.hasOwnProperty("date")) {
            let start = jsonObj["date"]["start"];
            let end = jsonObj["date"]["end"];
            if(start)
            {
                data.startdate = start;
                if(end){
                    data.enddate = end;
                }else{
                    data.endDate = dayjs(start, "YYYY-MM-DD").add(25, 'day').format('YYYY-MM-DD');
                }
            }
            else if (end)
            {
                data.startdate = dayjs().format('YYYY-MM-DD');
                data.enddate = end;
            }
            else
            {
                data.startdate = dayjs().add(5, 'day').format('YYYY-MM-DD'),
                data.enddate = dayjs().add(30, 'day').format('YYYY-MM-DD')
            }
        }
        if (jsonObj.hasOwnProperty("departure")) {
            if(jsonObj["departure"]["code"]){
                data.departure = jsonObj["departure"]["code"];
            }
        }

        if (jsonObj.hasOwnProperty("destination")) {
            if(jsonObj["destination"]["type"]){
                data.destinationtype = jsonObj["destination"]["type"];
            }
            if(jsonObj["destination"]["code"]){
                data.destinationcode = jsonObj["destination"]["code"];
            }
        }
        if (jsonObj.hasOwnProperty("adults")) {
            data.adults = jsonObj["adults"];
        }
        if (jsonObj.hasOwnProperty("children")) {
            if(jsonObj["children"].length > 0){
                data.children = jsonObj["children"].map(x=>x.jahre).toString();
            }
        }
        if (jsonObj.hasOwnProperty("duration")) {
            data.duration = jsonObj["duration"];
        }
        if(clearFilter){
            return new URLSearchParams(data);
        }
        if (jsonObj.hasOwnProperty("keywordList")) {
            if(jsonObj["keywordList"].length > 0){
                data.keywordList = jsonObj["keywordList"].toString();
            }
        }
        if (jsonObj.hasOwnProperty("giataIdList")) {
            if(jsonObj["giataIdList"].length > 0){
                data.giataIdList = jsonObj["giataIdList"].toString();
            }
        }
        if (jsonObj.hasOwnProperty("sort") && jsonObj["sort"]) {
            data.sort = jsonObj["sort"];
        }
        if (jsonObj.hasOwnProperty("city") && jsonObj["city"]) {
            data.city = jsonObj["city"];
        }
        if (jsonObj.hasOwnProperty("star") && jsonObj["star"]) {
            data.star = jsonObj["star"];
        }
        if (jsonObj.hasOwnProperty("reviewRate") && jsonObj["reviewRate"]) {
            data.reviewRate = jsonObj["reviewRate"];
        }
        if (jsonObj.hasOwnProperty("pansion") && jsonObj["pansion"]) {
            data.pansion = jsonObj["pansion"];
        }
        if (jsonObj.hasOwnProperty("room") && jsonObj["room"]) {
            data.room = jsonObj["room"];
        }
        if (jsonObj.hasOwnProperty("operators")) {
            if(jsonObj["operators"].length > 0){
                data.operators = jsonObj["operators"].toString();
            }
        }
        if (jsonObj.hasOwnProperty("attributes")) {
            if(jsonObj["attributes"].length > 0){
                data.attributes = jsonObj["attributes"].toString();
            }
        }
        if (jsonObj.hasOwnProperty("transfer") && jsonObj["transfer"]) {
            data.transfer = jsonObj["transfer"];
        }
        if (jsonObj.hasOwnProperty("seaview") && jsonObj["seaview"]) {
            data.seaview = jsonObj["seaview"];
        }
        if (jsonObj.hasOwnProperty("directness") && jsonObj["directness"]) {
            data.directness = jsonObj["directness"];
        }
        if (jsonObj.hasOwnProperty("landing") && jsonObj["landing"]) {
            data.landing = jsonObj["landing"];
        }
        if (jsonObj.hasOwnProperty("priceMax") && jsonObj["priceMax"]) {
            data.priceMax = jsonObj["priceMax"];
        }

        return new URLSearchParams(data);

    },


    getSearchObj(clearFilter=false){
        let urlParams = new URLSearchParams(window.location.search);
        
        let jsonParams = this.default;

        let sf = urlParams.get('sf');
        if(sf){
            jsonParams['sf'] = sf;
        }

        let startdate = urlParams.get('startdate');
        if(startdate){
            let endDate = urlParams.get('enddate');
            if(!endDate){
                endDate = dayjs(startdate, "YYYY-MM-DD").add(25, 'day').format('YYYY-MM-DD');
            }
            jsonParams['date']={ 
                "start": startdate,
                "end": endDate
            };
        }

        let departure = urlParams.get('departure');
        if(departure)
        {
            jsonParams['departure']={ 
                "code": departure,
                "name": ""
            };
        }
        
        let destinationtype = urlParams.get('destinationtype');
        if(destinationtype)
        {
            let destinationcode = urlParams.get('destinationcode');
            let destination = urlParams.get('destination');
            if(!destinationcode){
                destinationcode = "";
            }
            jsonParams['destination']={ 
                "type": destinationtype,
                "code": destinationcode,
                "name": decodeURIComponent(destination)
            };
        }

        let adults = urlParams.get('adults');
        if(adults){
            jsonParams['adults'] = adults;
        }

        let children = urlParams.get('children');
        if(children){
            const childsArray = children.split(",");
            const childs = [];
            childsArray.forEach(function(value, index, array){
                childs.push({ jahre: value });
            });
            jsonParams['children'] = childs;
        }

        let duration = urlParams.get('duration');
        if(duration){
            jsonParams['duration'] = duration;
        }

        if(clearFilter){
            return jsonParams;
        }


        let keywordList = urlParams.get('keywordList');
        if(keywordList){
            jsonParams['keywordList'] = keywordList.split(",");;
        }

        let giataIdList = urlParams.get('giataIdList');
        if(giataIdList){
            jsonParams['giataIdList'] = giataIdList.split(",");;
        }


        let sort = urlParams.get('sort');
        if(sort){
            jsonParams['sort'] = sort;
        }

        let city = urlParams.get('city');
        if(city){
            jsonParams['city'] = city;
        }

        
        let star = urlParams.get('star');
        if(star){
            jsonParams['star'] = star;
        }

        let reviewRate = urlParams.get('reviewRate');
        if(reviewRate){
            jsonParams['reviewRate'] = reviewRate;
        }

        let pansion = urlParams.get('pansion');
        if(pansion){
            jsonParams['pansion'] = pansion;
        }

        let room = urlParams.get('room');
        if(room){
            jsonParams['room'] = room;
        }

        let operators = urlParams.get('operators');
        if(operators){
            jsonParams['operators'] = operators.split(",");;
        }

        let attributes = urlParams.get('attributes');
        if(attributes){
            jsonParams['attributes'] = attributes.split(",");;
        }

        let transfer = urlParams.get('transfer');
        if(transfer){
            jsonParams['transfer'] = transfer;
        }

        let seaview = urlParams.get('seaview');
        if(seaview){
            jsonParams['seaview'] = seaview;
        }

        let directness = urlParams.get('directness');
        if(directness){
            jsonParams['directness'] = directness;
        }

        let landing = urlParams.get('landing');
        if(landing){
            jsonParams['landing'] = landing;
        }

        let priceMax = urlParams.get('priceMax');
        if(priceMax){
            jsonParams['priceMax'] = priceMax;
        }
        return jsonParams;
    },

    removeById(arr, id){
        const requiredIndex = arr.findIndex(el => {
           return el.id === String(id);
        });
        if(requiredIndex === -1){
           return false;
        };
        return !!arr.splice(requiredIndex, 1);
     },
    
     createHotelQuery(queryObj){
        delete queryObj['keywordList'];
        delete queryObj['giataIdList'];
        delete queryObj['sort'];
        delete queryObj['city'];
        delete queryObj['star'];
        delete queryObj['reviewRate'];
        delete queryObj['pansion'];
        delete queryObj['room'];
        delete queryObj['operators'];
        delete queryObj['attributes'];
        delete queryObj['transfer'];
        delete queryObj['seaview'];
        delete queryObj['directness'];
        delete queryObj['landing'];
        delete queryObj['priceMax'];
        return queryObj;
     }
    
}
