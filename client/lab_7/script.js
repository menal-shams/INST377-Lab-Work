const mymap = L.map('mapid').setView([38.984828, -76.948226], 13);
let markers = [];

function mapInit() {
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWVuYWxzaGFtcyIsImEiOiJja3Y2Mm1uNjY3OWJ1Mm9vZmhyemc2MWJqIn0.tgKPZMj72Y0VCsTeb-RvZw'
    }
  ).addTo(mymap);
}

async function dataHandler() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  const request = await fetch(endpoint);
  const restos = await request.json();

  function findMatches(zipToMatch, restosInput) {
    return restosInput.filter((item) => {
      const regex = new RegExp(zipToMatch, 'gi');
      return item.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restos);
    let html = matchArray.map((item) => `
          <li class="search-result">
              <span class="name"><strong>${item.name}</strong></span><br />
              <span class="address">${item.address_line_1}</span><br />
          </li>
      `);

    html = html.slice(0, 5).join('');
    suggestions.innerHTML = html;
  }

  function addToMap(matches) {
    let first = true;
    locations = matches.slice(0, 5);

    markers.forEach((item) => {
      mymap.removeLayer(item);
    });
    markers = [];

    locations.forEach((item) => {
      currCoordinates = item.geocoded_column_1.coordinates.reverse();
      const marker = L.marker(currCoordinates).addTo(mymap);
      if (first) {
        mymap.panTo(L.latLng(currCoordinates[0], currCoordinates[1]));
        first = false;
      }
      markers.push(marker);
    });
  }

  searchInput.addEventListener('input', (evt) => {
    if (evt.target.value === '') {
      suggestions.innerHTML = '';

      markers.forEach((item) => {
        mymap.removeLayer(item);
      });
      markers = [];

      mymap.setView([38.984828, -76.948226], 13);
    } else {
      displayMatches(evt);
      addToMap(findMatches(evt.target.value, restos));
    }
  });
}

window.onload = dataHandler;
mapInit();
