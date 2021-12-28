// console.log(countries);

// Static list!
// const capitals = ["valleta", "jerusalem", "WDC", "Paris", "Madrid", "Rome"];
// const currencies = ["eur", "usd", "Nis"];
// const continents = ["Asia", "Europe", "Africa", "America"];

// Dynamic list based on our data:
// region: "Europe"
// startOfWeek: "monday"
// status: "officially-assigned"
// subregion: "Northern Europe"

function Value(value, text) {
  this.value = value;
  this.text = text;
}

const searchBy = [
  new Value("startOfWeek", "Start Of the Week"),
  new Value("status", "Status"),
  new Value("region", "Regions"),
  new Value("independent", "Ind"),
  new Value("subregion", "subregion"),
  new Value("unMember", "Am i union memeber?"),
];

const complexSearchBy = [
  new Value("currencies", "currencies"),
  new Value("languages", "languages"),
]



function drawOptionsElements(list, selectElRef, isCompex) {
  const optionsElements = list.map(function (searchByValue) {
    return _getOptionsElement(searchByValue);
  });
  if (!isCompex) {
    selectElRef.innerHTML = "";
  }
  selectElRef.append(...optionsElements);

  function _getOptionsElement(searchByValue) {
    const option = document.createElement("option");
    option.innerText = searchByValue.text;
    option.value = searchByValue.value;
    return option;
  }
}
let globalCountries = [];
function init() {
  countries.push(null); // simulated as returned from API/Server
  globalCountries = countries.filter((c) => c);
  drawOptionsElements(searchBy, document.querySelector("#searchBy"), false);
  drawOptionsElements(complexSearchBy, document.querySelector("#searchBy"), true);
  searchByChanged();
  document.querySelector("#filter").addEventListener("click", function () {
    const searchBy = document.querySelector("#searchBy").value;
    const searchValue = document.querySelector("#searchValues").value;
    const lowerCaseSearchValue = searchValue.toString().toLowerCase();
    const result = globalCountries.filter(function (c) {
      return (
        c[searchBy] &&
        c[searchBy].toString().toLowerCase() === lowerCaseSearchValue
      );
    });
    draw(result);
  });
}

function draw(result) {
  document.querySelector("#content").innerText = JSON.stringify(result);
}
init();

function searchByChanged() {
  const selectedValue = document.querySelector("#searchBy").value;
  if (searchBy.map(function (c) { return c.value }).includes(selectedValue)) {
    const values = getList(selectedValue);
    const result = values.map(function (currentRegion) {
      return new Value(currentRegion, currentRegion.toUpperCase());
    });
    drawOptionsElements(result, document.querySelector("#searchValues"), false);
  }
  else {
    const values = getComplexData(`${selectedValue}`)
    const result = values.map(function (currentRegion) {
      return new Value(currentRegion, currentRegion.toUpperCase());
    });
    drawOptionsElements(result, document.querySelector("#searchValues"), false);
  }
}

function getList(key) {
  const list = globalCountries.reduce(function (listKolShehu, country) {
    return { ...listKolShehu, [country[key]]: true };
  }, {});
  return Object.keys(list).filter((item) => item !== "undefined");
}

// function getTotalPopulation() {
//   return globalCountries.reduce(function (total, country, index, allData) {
//     return total + country.population;
//   }, 0);
// }

function getRegions() {
  return globalCountries.map(function (country) {
    return country.region;
  });
}

function getDistinctregions() {
  const result = getRegions();
  const regions = {};
  for (let index = 0; index < result.length; index++) {
    regions[result[index]] = true;
  }
  return Object.keys(regions);
}

// abuse getCurrncies to fetch also
// languages
// translations

//
function getCurrencies() {
  const distinctCu = globalCountries.reduce(function (currenciesObj, country) {
    const currentCurrnecies = country.currencies;
    if (!currentCurrnecies) return currenciesObj;
    const currenciesKeys = Object.keys(currentCurrnecies);
    currenciesKeys.forEach(function (currency) {
      currenciesObj[currency] = true;
    });
    return currenciesObj;
  }, {});
  console.log(Object.keys(distinctCu));
}

function getComplexData(keyToAdd) {
  const newKey = globalCountries.reduce(function (keyObj, country) {
    const currentKey = country[`${keyToAdd}`];
    if (!currentKey) return keyObj;
    const keyKeys = Object.keys(currentKey);
    keyKeys.forEach(function (key) {
      keyObj[key] = true;
    });
    return keyObj;
  }, {});
  console.log(Object.keys(newKey));
  return Object.keys(newKey)
}

getComplexData("languages")
getComplexData("currencies")



//getCurrencies();
