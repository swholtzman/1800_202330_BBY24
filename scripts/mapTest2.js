
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
var map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-123.0, 49.2],
    zoom: 11.15
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    types: 'country,region,place,postcode,locality,neighborhood,address',
    localGeocoder: customGeocoder
    
});
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// Load custom data to supplement the search results.
// Custom locations will show up first, if there is a match
const customData = {
    'features': [{
            'type': 'Feature',
            'properties': {
                'title': 'Charge Station 2'
            },
            'geometry': {
                'coordinates': [-123.007372, 49.241189],
                'type': 'Point'
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'title': 'Charge Station 1'
            },
            'geometry': {
                'coordinates': [-123.007372, 49.21189],
                'type': 'Point'
            }
        },

        {
            'type': 'Feature',
            'properties': {
                'title': 'Charge Station 3'
            },
            'geometry': {
                'coordinates': [-123.017372, 49.21189],
                'type': 'Point'
            }
        },
    ],
    'type': 'FeatureCollection'
};





function addPostPins(map) {

    // READING information from collection in Firestore
    db.collection('places').get()
        .then(allEvents => {
            const features = []; // Defines an empty array for information to be added to
            allEvents.forEach(doc => {
                // Extract corordinate pair of this plce
                coordinates = [doc.data().lng, doc.data().lat];
                url = doc.data().url
                console.log(url)
                // Extract any needed info from the document



                // Pushes information into the features array
                // Storing id in "id" field, and some description of hike in description field
                features.push({
                    'type': 'Feature',
                    'properties': {
                        id: doc.id,  //store the id with each place
                        'icon': 'rocket',
                        "url": url

                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': coordinates
                    }
                });
            });
            console.log(features)

            // Add the features array as a data source
            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': features
                }
            })

            // Add a layer showing this new data source of places
            map.addLayer({
                'id': 'places',
                'type': 'circle',
                'source': 'places',
                'paint': {
                    'circle-color': '#4264fb',
                    'circle-radius': 6,
                    'circle-stroke-width': 3,
                    'circle-stroke-color': '#ffffff'
                }
            });

            //-----------------------------------
            // If someone clicks on a places pin
            // then show more info on that place
            //-----------------------------------
            console.log()
            map.on('click', 'places', (e) => {
                //Extract information about the places, and use what you need
                //const coordinates = e.features[0].geometry.coordinates.slice();
                //const description = e.features[0].properties.description;
                const id = e.features[0].properties.id;  //get the "id" field
                //alert(id);
                // re-direct to another page that gives more details about this post (by id)
                window.location.href = "start_charge.html?ID=" + id;
            });


        });

}
addPostPins(map)

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

        lat: 49.21189,
        lng: -123.007372,

        url: "./settings.html"

    });


}

function customGeocoder(query) {
    const matchingFeatures = [];
    for (const feature of customData.features) {
        // Handle queries with different capitalization
        // than the source data by calling toLowerCase().
        if (
            feature.properties.title
            .toLowerCase()
            .includes(query.toLowerCase())
        ) {
            // Add an emoji as a prefix for custom (fun!)
            // data results using carmen geojson format:
            // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            feature['place_name'] = `🚗 ${feature.properties.title}`;
            feature['center'] = feature.geometry.coordinates;
            feature['place_type'] = ['park'];
            matchingFeatures.push(feature);
        }
    }
    return matchingFeatures;
}