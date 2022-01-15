const url = "https://restcountries.com/v2/all";

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
        `<div class='country'> <h1 class='name'>${country.name}</h1> 
        <h3 class='native'>(${country.nativeName})</h3>
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
        <h3 class='languages'>Languages: ${country.languages
          .map((lang) => lang.name)
          .join(", ")}</h3>
        <h3 class='currency'>Currency: ${
          country?.currencies ? country.currencies[0].name : "No Currency"
        }</h3>
        <h3 class='timezone'>Timezone: ${country.timezones.join(", ")}</h3>
        <h3 class='internet'>Internet Domain: ${country.topLevelDomain[0]}</h3>
        </div><br>`
    )
    .join("")} `;
};

getData();
