const url = "https://restcountries.com/v3.1/all";

let data = [];
const search = document.getElementById("searchbar");
search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filter = data.filter((country) =>
    country.name.toLowerCase().includes(searchString)
  );
  displayData(filter);
});

async function getData() {
  const response = await fetch(url);
  data = await response.json();
  console.log(data.map((country) => console.log(country)));
  displayData(data);
}

const displayData = (data) => {
  document.getElementById("output").innerHTML = `${data
    .map(
      (country) =>
        `<div class='country'> <h1 class='name'>${country.name.common}</h1> 
        <h3 class='native'>(${country.name.official})</h3>
        <h3 class='capital'>Capital: ${country.capital}</h3> 
        <h3 class='area'>Area: ${country.area} km²</h3>
        <h3 class='population'>Population: ${country.population}</h3>
        <img src=${country.flags.png} height='50' class='flag' />
        <h2 class='region'>(${country.region})</h2>
        <h3 class='borders'>Borders: ${
          country ?? borders.join(", ")
            ? country ?? borders.join(", ")
            : "water"
        }</h3>
        <h3 class='languages'>Languages: ${Object.values(country.languages)
          .map((name) => name)
          .join(", ")}</h3>
        <h3 class='currency'>Currency: ${Object.keys(country.currencies).join(
          ", "
        )}</h3>
        <h3 class='timezone'>Timezone: ${country.timezones.join(", ")}</h3>
        <h3 class='internet'>Internet Domain: ${country.tld[0]}</h3>
        </div><br>`
    )
    .join("")} `;
};

getData();
