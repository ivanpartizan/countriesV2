const url = "https://restcountries.com/v3.1/independent?status=true";

let data = [];
const search = document.getElementById("searchbar");
search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filter = data
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchString)
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
  displayData(filter);
});

async function getData() {
  const response = await fetch(url);
  data = await response.json();
  data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  console.log(data.map((country) => console.log(country)));
  displayData(data);
}

const displayData = (data) => {
  document.getElementById("output").innerHTML = `${data
    .map(
      (country) =>
        `<div class='country'> <h1 class='name'>${country.name.common}</h1> 
        <h3 class='native'>(${
          country.name.nativeName
            ? Object.values(country.name.nativeName)[0].common
            : "No native name"
        })</h3>
        <h3 class='capital'>Capital: ${
          country?.capital ? country.capital : "No Capital"
        }</h3> 
        <h3 class='area'>Area: ${country.area} km²</h3>
        <h3 class='population'>Population: ${country.population}</h3>
        <img src=${country.flags.svg} height='50' class='flag' />
        <h2 class='region'>(${country.region})</h2>
        <h3 class='borders'>Borders: ${
          country?.borders ? country.borders.join(", ") : "water"
        }</h3>
        <h3 class='languages'>Languages: ${
          country.languages
            ? Object.values(country.languages).join(", ")
            : "No Languages"
        }</h3>
        <h3 class='currency'>Currency: ${
          country.currencies
            ? Object.values(country.currencies)[0].name
            : "No Currency"
        }</h3>
        <h3 class='timezone'>Timezone: ${country.timezones.join(", ")}</h3>
        <h3 class='internet'>Internet Domain: ${
          country.tld ? country.tld[0] : "No domain"
        }</h3>
        </div><br>`
    )
    .join("")} `;
};

getData();
