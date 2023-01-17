// elements
const inputCountryEl = document.getElementById("country-input");
const btn = document.getElementById("btn");
const outputEl = document.querySelector(".output-container");
const loader = document.querySelector(".pulse");

// output elements
const outputContainerEl = document.querySelector(".output-container");
const imgEl = document.querySelector(".flag-img");
const countryNameEl = document.querySelector(".Country");
const capitalEl = document.querySelector(".Capital");
const continentEl = document.querySelector(".Continent");
const populationEl = document.querySelector(".Population");
const timezoneEl = document.querySelector(".time");
const currencyEl = document.querySelector(".Currency");
const languageEl = document.querySelector(".languages");

// functions
function getResult() {
  let countryName = inputCountryEl.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}`;
  fetch(finalURL)
    .then((resp) => {
      if (!resp.ok) {
        inputCountryEl.value = "";
        alert("Country Not Found...SORRY!");
        throw new Error("No Country found !!!");
      }
      return resp.json();
    })
    .then((data) => displayResults(data));
}

// to display the output
function displayResults(country) {
  // innerHTML
  imgEl.innerHTML = `<img src=${country[0].flags.png} alt="flag">`;
  countryNameEl.innerText = `${country[0].name.common}`;
  capitalEl.innerHTML = `<span>Capital :</span> ${country[0].capital[0]}`;
  continentEl.innerHTML = `<span>Continent :</span> ${country[0].continents[0]}`;
  populationEl.innerHTML = `<span>Population :</span> ${country[0].population}`;
  timezoneEl.innerHTML = `<span>Timezone :</span> ${country[0].timezones[0]}`;
  currencyEl.innerHTML = `<span>Currency :</span>${
    country[0].currencies[Object.keys(country[0].currencies)].name
  } - ${country[0].currencies[Object.keys(country[0].currencies)].symbol}`;
  languageEl.innerHTML = `<span>Common Languages :</span> ${Object.values(
    country[0].languages
  )
    .toString()
    .split(",")
    .join(", ")}`;

  outputContainerEl.style.display = "block";
}

// setTimeout(getResult, 2000);
function setTime() {
  setTimeout(() => {
    loader.style.display = "none";
    getResult();
  }, 2000);
}

// event listneres
btn.addEventListener("click", () => {
  if (inputCountryEl.value === "") {
    alert("Please Enter A Valid Country Name");
  } else {
    outputContainerEl.style.display = "none";
    loader.style.display = "block";
    setTime();
  }
});

// enter button
inputCountryEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (inputCountryEl.value === "") {
      alert("Please Enter A Valid Country Name");
    } else {
      outputContainerEl.style.display = "none";
      loader.style.display = "block";
      setTime();
    }
  }
});

// loading anime
window.addEventListener("load", () => {
  const loader = document.querySelector(".pulse");
  loader.style.display = "none";
});
