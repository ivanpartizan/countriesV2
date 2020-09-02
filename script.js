const url = "https://restcountries.eu/rest/v2/all";

let data = [];
const search = document.getElementById("searchbar");
search.addEventListener("keyup", e => {
  const searchString = e.target.value.toLowerCase();
  const filter = data.filter(country =>
    country.name.toLowerCase().includes(searchString)
  );
  displayData(filter);
});

async function getData() {
  const response = await fetch(url);
  data = await response.json();
  console.log(data);
  displayData(data);
}

const displayData = data => {
  document.getElementById("output").innerHTML = `${data
    .map(
      country =>
        `<div class='country'> <h1 class='name'>${country.name}</h1> 
        <h3 class='native'>(${country.nativeName})</h3>
        <h3 class='capital'>Capital: ${country.capital}</h3> 
        <h3 class='area'>Area: ${country.area} km²</h3>
        <h3 class='population'>Population: ${country.population}</h3>
        <img src=${country.flag} height='50' class='flag' />
        <h2 class='region'>(${country.region})</h2>
        <h3 class='borders'>Borders: ${
          country.borders.join(", ") ? country.borders.join(", ") : "water"
        }</h3>
        <h3 class='languages'>Languages: ${country.languages
          .map(name => name.name)
          .join(", ")}</h3>
        <h3 class='currency'>Currency: ${country.currencies[0].name} (${
          country.currencies[0].code
        })</h3>
        <h3 class='timezone'>Timezone: ${country.timezones.join(", ")}</h3>
        <h3 class='internet'>Internet Domain: ${country.topLevelDomain}</h3>
        </div><br>`
    )
    .join("")} `;
};

getData();
