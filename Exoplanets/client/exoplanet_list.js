const endpointRoot = 'http://127.0.0.1:8090/';

async function listExoplanets () {
    const exoplanetResponse = await fetch(endpointRoot + 'Exoplanets');
    const exoplanetNamesText = await exoplanetResponse.text();
    const exoplanetNames = JSON.parse(exoplanetNamesText);
    const exoplanetListElt = document.getElementById('exoplanetList');
    let list = '';
    for (const exoplanetName of exoplanetNames) {
        list += `<li class='exoplanet_list_item'>${exoplanetName}</li>`;
    }
    exoplanetListElt.innerHTML = list;
    const listItems = document.querySelectorAll('.exoplanet_list_item');
    for (const listItem of listItems) {
        listItem.addEventListener('click', (event) => loadexoplanet(event.target.textContent));
    }
}

async function loadexoplanet (exoplanetName) {
    const exoplanetResponse = await fetch(`http://127.0.0.1:8090/exoplanet/${exoplanetName}`);
    const exoplanetContent = await exoplanetResponse.text();
    document.getElementById('exoplanet-info').innerHTML = exoplanetContent;
}

async function addExoplanets () {
const exoplanetForm = document.getElementById('new-exoplanet-info');
exoplanetForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const data = new FormData(exoplanetForm);
/* conversion from FormData to JSON at https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json */
    const dataJSON = JSON.stringify(Object.fromEntries(data));
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(endpointRoot + 'exoplanet/new',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: dataJSON
    });
    listExoplanets();
    exoplanetForm.reset();
});
}

document.addEventListener('DOMContentLoaded', listExoplanets);
document.addEventListener('DOMContentLoaded', addExoplanets);

