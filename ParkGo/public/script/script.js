let parking_select = document.querySelector(".parking_select");

function create_map(parkings) {
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 37.090, lng: -95.712},
        mapTypeId: 'terrain',
        disableDefaultUI : true
    });

    let icon_closed = {
        url: "./public/assets/closed.svg",
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
    };

    let icon_opened = {
        url: "./public/assets/opened.svg",
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
    };

    let marker;
    parkings.forEach((park) => {
        add_option(park.parkingName, park._id);

        if(park.places)
            marker = new google.maps.Marker({
                icon: icon_opened,
                position: park.coordinates,
                map: map,
                label: {text: park.places.toString(), color: "white"}
            });
        else
            marker = new google.maps.Marker({
                icon: icon_closed,
                position: park.coordinates,
                map: map
            });

        google.maps.event.addListener(marker, "click", function(id) {
            console.log(park.parkingName);
        });
    });
}

function add_option(name, _id) {
    let option = document.createElement("option");
    option.innerHTML = name;
    option.tagName = _id;

    parking_select.appendChild(option);
}

function initMap() {
    fetchParkingLots().then((data) => {
        create_map(data);
    }).catch((error) => {
        console.log(error);
    })
}

function fetchParkingLots() {
    let resolveP, rejectP;
    let promise_fetch = new Promise((resolve, reject) => {
        resolveP = resolve;
        rejectP = reject;
    });

    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8000/get-content");
    request.addEventListener("load", () => {
        if(request.status < 400)
            resolveP(JSON.parse(request.responseText));
        else
            rejectP(request.status);
    });
    request.send();

    return promise_fetch;
}

// addParkingLot("Shoooo", {lat: 51.878, lng: -17.629}, 28, 15);
// function addParkingLot(parkingName, coordinates, total, places) {
//     let request = new XMLHttpRequest();
//     request.open("POST", "http://localhost:8000/post-content");
//     request.setRequestHeader("Content-type", "application/json");
//     request.addEventListener("load", (event) => {
//         if(request.status > 400)
//             console.log("Unsuccessful post request");
//     });
//     request.send(JSON.stringify({
//         "parkingName" : parkingName,
//         "coordinates" : coordinates,
//         "total" : total,
//         "places" : places
//     }));
// }