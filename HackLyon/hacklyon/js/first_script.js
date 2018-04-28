// Majd Odeh p1608951
// Cristian Chivriga p1612186

/************************************************/

let keys = {
    "center" : "Lyon 1",
    // "latitude" : 72.0,
    // "longitude" : 120.0,
    "zoom" : 16,
    "size" : {
        x: 640,
        y: 640
    },
    "scale" : 2,
    "key" : "AIzaSyAKfZaL0aBsrWohb54sAiKRMLItyI4nBew"
};

let authority = "https://maps.googleapis.com/maps/api/staticmap?";

function urlConstructor() {
    let url = authority;
    for(let key in keys) {
        if(typeof keys[key] === "object") {
            url += key + "=" + keys[key].x + "x" + keys[key].y + "&";
        } else
            url += key + "=" + keys[key] + "&";
    }
    return url;
}

/************************   Map   ************************/


let header = document.querySelector("nav");
let footer = document.querySelector("footer");

let content = [document.querySelector(".main"), document.querySelector("#map")];

let selected = 0;
let nav_links = document.getElementsByClassName("nav-link");
for(let g = 0; g < nav_links.length; g++) {
    nav_links[g].addEventListener("click", function(e) {
        if(selected !== g) {
            content[selected].style.display = "none";
            content[g].style.display = "block";
            selected = g;
        }

        if(selected === 1) {
            // header.style.backgroundColor = "transparent";
            footer.style.display = "block";
        } else {
            // header.style.backgroundColor = "navbar-light";
            content[selected].style.display = "flex !important";
            footer.style.display = "flex";
        }
    });
}


/********************** Validate Form   **************************/


$('#inputNameParking').on('keyup focusout', function(){
    test('inputNameParking', 'nameError', "Enter Name!")
});

$('#inputTypeParking').on('keyup focusout', function() {
    test('inputTypeParking', 'typeError', "Enter Type!")
});

$('#inputLatitude').on('keyup focusout', function() {
    test('inputLatitude', 'latitudeError', "Enter latitude!")
});

$('#inputLongitude').on('keyup focusout', function() {
    test('inputLongitude', 'longitudeError', "Enter longitude!")
});

$('#inputPlaces').on('keyup focusout', function() {
    test('inputPlaces', 'placesError', "Enter places!")
});

$('#inputEmail').on('keyup focusout', function() {
    test('inputEmail', 'emailError', "Enter your email address!")
});

$('#inputSystem').on('keyup focusout', function() {
    let dropdown = document.getElementById('inputSystem').value;
    if(dropdown === ""){
        document.getElementById('systemError').innerHTML = "Choose a system!";
    }else{
        document.getElementById('systemError').innerHTML = "";
    }
});

function validateForm() {
    var validated = true;

    if(!test('inputNameParking', 'nameError', "Enter name!")){
        validated = false;
    }
    if(!test('inputTypeParking', 'typeError', "Enter Type!")){
        validated = false;
    }
    if(!test('inputLatitude', 'latitudeError', "Enter latitude!")){
        validated = false;
    }
    if(!test('inputLongitude', 'longitudeError', "Enter longitude!")){
        validated = false;
    }
    if(!test('inputPlaces', 'placesError', "Enter places!")){
        validated = false;
    }
    if(!test('inputEmail', 'emailError', "Enter your email address!")){
        validated = false;
    }
    let dropdown = document.getElementById('inputSystem').value;
    if(dropdown === ""){
        document.getElementById('systemError').innerHTML = "Choose a system!";
        return false
    }

    if(validated === true){
        addRow();
        emptyForm();
        successMessage();
    }
    return validated;
};

$(document).on('submit','#addParkingForm',function(){
    validateForm();
    $('[data-toggle="tooltip"]').tooltip('update');
    return false;
});


/********************** Validate Modal Form   **************************/

$('#inputNameParkingModal').on('keyup focusout', function(){
    test('inputNameParkingModal', 'nameErrorModal', "Enter Name!")
});

$('#inputTypeParkingModal').on('keyup focusout', function() {
    test('inputTypeParkingModal', 'typeErrorModal', "Enter Type!")
});

$('#inputLatitudeModal').on('keyup focusout', function() {
    test('inputLatitudeModal', 'latitudeErrorModal', "Enter latitude!")
});

$('#inputLongitudeModal').on('keyup focusout', function() {
    test('inputLongitudeModal', 'longitudeErrorModal', "Enter longitude!")
});

$('#inputPlacesModal').on('keyup focusout', function() {
    test('inputPlacesModal', 'placesErrorModal', "Enter places!")
});

$('#inputEmailModal').on('keyup focusout', function() {
    test('inputEmailModal', 'emailErrorModal', "Enter your email address!")
});

$('#inputSystemModal').on('keyup focusout', function() {
    let dropdown = document.getElementById('inputSystemModal').value;
    if(dropdown === ""){
        document.getElementById('systemErrorModal').innerHTML = "Choose a system!";
    }else{
        document.getElementById('systemErrorModal').innerHTML = "";
    }
});

function validateFormModal() {
    var validated = true;

    if(!test('inputNameParkingModal', 'nameErrorModal', "Enter name!")){
        validated = false;
    }
    if(!test('inputTypeParkingModal', 'typeErrorModal', "Enter Type!")){
        validated = false;
    }
    if(!test('inputLatitudeModal', 'latitudeErrorModal', "Enter latitude!")){
        validated = false;
    }
    if(!test('inputLongitudeModal', 'longitudeErrorModal', "Enter longitude!")){
        validated = false;
    }
    if(!test('inputPlacesModal', 'placesErrorModal', "Enter places!")){
        validated = false;
    }
    if(!test('inputEmailModal', 'emailErrorModal', "Enter your email address!")){
        validated = false;
    }
    let dropdown = document.getElementById('inputSystemModal').value;
    if(dropdown === ""){
        document.getElementById('systemErrorModal').innerHTML = "Choose a system!";
        return false
    }
    if(validated === true){
        modifyMessage();
    }
    return validated;
};

/********************** Search Table   **************************/

/*function tableSearch() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchField");
    filter = input.value.toUpperCase();
    table = document.getElementById("parkingTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
*/