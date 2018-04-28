let map;
let modal_flag = false;
//let modal = document.getElementById("popup");
let popup = document.querySelector("#popup");
let park_close = document.querySelector(".park_close");
$( "#map" ).click(function( event ) {
    event.stopPropagation();
    // Do something
});
//let close_modal =   document.getElementsByClassName("delete_icon")[0];

/*function toggle_modal() {
    if(!modal_flag) {
        console.log(modal);
        modal.className = "modal_popup modal_up";
    }

    modal_flag = !modal_flag;
}
*/

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3.5,
        center: {lat: -31.1828699, lng: 151.196123},
        mapTypeId: 'terrain'
    });

    let data =
        [
        {
        "type" : "FeatureCollection",
        "features": [
            {
                "type":"Feature",
                "properties": {
                    place: "Moldova"
                },
                "geometry":{
                    "type":"Point",
                    "coordinates":[28.99, 47.3832,28.16]},
                "id":"usc000csx3"
            }
        ]
    },

            {
                "type" : "FeatureCollection",
                "features": [
                    {
                        "type":"Feature",
                        "properties": {
                            place: "Ethiopia"
                        },
                        "geometry":{
                            "type":"Point",
                            "coordinates":[41.16667, 4.71667,28.16]},
                        "id":"usc000csx2"
                    }
                ]
            },
            {
                "type" : "FeatureCollection",
                "features": [
                    {
                        "type":"Feature",
                        "properties": {
                            place: "Somalia"
                        },
                        "geometry":{
                            "type":"Point",
                            "coordinates":[41.84044,  0.1805,28.16]},
                        "id":"usc000csx5"
                    }
                ]
            }
    ];

    for (var i = 0; i < 3; i++)
    {
        map.data.addGeoJson(data[i]);

    }

   // console.log(data[1]);
    //map.data.addGeoJson(data[1]);
    //console.log(data[0]);
    //map.data.addGeoJson(data[0]);

    map.data.setStyle(function(feature) {
        return {
            icon: getCircle(1)
        };
    });

    map.data.addListener('click',function(feature) {
        //toggle_modal();
        funcAlea();
        popup.className = "popup_appear_in";
        //popup.style.display = "none";

    });

    $(".park_close").click(function(){
        popup.className = "popup_appear_out";
    });
}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: 1.,
        scale: 17,
        strokeColor: 'white',
        strokeWeight: .5
    };
}


let mapEl = document.getElementById("map");

let settingsButton = document.querySelector(".settings");
let settings = document.querySelector("#settings");
let settingsBack = document.querySelector(".settings_header_img");
settingsButton.addEventListener("click", (e) => {
  //  $(".search").addClass("decalate_search");

    settings.className = "slide_left_in";

});

mapEl.addEventListener("click", () => {
    settings.className = "slide_left_out";

});

settingsBack.addEventListener("click", () => {
    settings.className = "slide_left_out";
  //  $(".search").removeClass("decalate_search");


});

let search = document.querySelector(".search");
let suggestions = document.querySelector(".suggestions");
let searchInput = document.querySelector(".search_input");
let parkingNames = [
    {
        name : "parking1",
        coordinates:{
            lat: 37.532600,
            lng: 127.024612,
        },
    },
    {
        name : "patking2",
        coordinates:{
            lat: 47.00556,
            lng: 28.8575,
        },
    },
    {
        name : "pjrking3",
        coordinates:{
            lat: -22.4895,
            lng: 27.8779,
        },
    },

];
let removeSuggestions = () => {
    while(suggestions.firstChild) {
        suggestions.removeChild(suggestions.firstChild);

    }
};

function generateSuggestions(found) {
    removeSuggestions();
    found.forEach(suggestion => {
        let p = document.createElement("span");
        p.className = "suggestion";
        p.textContent = suggestion.name;
        p.addEventListener("click", (e) => {
            searchInput.value = p.textContent;
            console.log(suggestion.coordinates);
            setCenter(suggestion.coordinates);
            removeSuggestions();
            searchInput.focus();
        });
        suggestions.appendChild(p);
    });
}

let findSuggestions = () => {
    let found = [];
    parkingNames.forEach((parking) => {
        let regex1 = RegExp(searchInput.value, 'g');
        console.log(searchInput.value);
        if(regex1.test(parking.name) && searchInput.value !== parking.name) {
            found.push({
                "name" : parking.name,
                "coordinates" : parking.coordinates
            });
            if(found.length === 3)
                generateSuggestions(found);
        }
    });
    if(found.length !== 0)
        generateSuggestions(found);
};

searchInput.addEventListener("input", findSuggestions);
search.addEventListener("blur", removeSuggestions);
searchInput.addEventListener("focus", findSuggestions);

function setCenter(coordinates) {109%
    console.log(coordinates);
        map.setCenter(coordinates);
    map.setZoom(15);
}

function funcAlea()
{
    var i=Math.floor((Math.random() * 12) + 1);
    var elem=document.getElementById(i);
    if (elem.className=="park_place opened_park")
        elem.className="park_place closed_park";
    else if (elem.className=="park_place closed_park")
        elem.className="park_place opened_park";
}



