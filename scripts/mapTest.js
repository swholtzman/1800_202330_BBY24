
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-123.0, 49.2],
    zoom: 11.15
});

//Following Lines of code are taken from https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/ and modifed to fit what our goals were (changing page on click)
// This code creates a source called places, that have features that include coordinates on the map.
map.on('load', () => {
    const features = ["./main.html"]
    map.addSource('places', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'icon': 'rocket'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-123.007372, 49.21189],
                        'url': "./main.html"
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'icon': 'rocket'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-123.027372, 49.241189],
                        'url': "./profile.html"
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {

                        'icon': 'rocket'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-123.007372, 49.241189],
                        'url': "./login.html"
                    }
                },


            ]
        }
    });
    // Add a layer showing the places that we have created based on its coordinates.
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': ['get', 'icon'],
            'icon-allow-overlap': true
        }
    });

    //When a place is clicked, it transfers to a different page.
    map.on('click', 'places', (e) => {
        // Copy coordinates array.


        const switchPage = e.features[0]
        console.log(features)
        console.log(switchPage)
        //window.location.href = switchPage






    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
});

function writePlaces() {
    //define a variable for the collection you want to create in Firestore to populate data
    var placeRef = db.collection("places");

    placeRef.add({
        name: "Charge Station 1", //replace with your own city?
        location: "3700 Willingdon Avenue",
        city: "Burnaby",
        province: "BC",

        lat: 49.21189,
        lng: -123.007372,

        url: "./main.html"

    });
    placeRef.add({
        name: "Charge Station 2", //replace with your own city?
        location: "4330 Sanderson Way",
        city: "Burnaby",
        province: "BC",

        lat: 49.241189,
        lng: -123.007372,

        url: "./profile.html"

    });
    placeRef.add({
        name: "Charge Station 3", //replace with your own city?
        location: "4812 Willingdon Ave",
        city: "Burnaby",
        province: "BC",

        lat: 49.241189,
        lng: -123.007372,

        url: "./profile.html"

    });


}
