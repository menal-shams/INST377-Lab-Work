async function windowActions() {
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
    const html = matchArray.map((item) => {
      const regex = new RegExp(event.target.value, 'gi');
      const restoZip = item.zip.replace(regex, `<span class="h1">${event.target.value}</span>`);
      return `
          <li>
              <span class="name">${item.name}</span><br />
              <span class="category">${item.category}</span><br />
              <span class="address">${item.address_line_1}</span><br />
              <span class="zipcode">${restoZip}</span><br />
              <span class="comma">,</span>
          </li>
      `;
    }).join('');

    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;
