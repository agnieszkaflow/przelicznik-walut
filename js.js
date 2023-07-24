const inputAmount = document.querySelector("#amount");
const selectCurrency = document.querySelector("#currency");
const submitButton = document.querySelector(".submit");
const result = document.querySelector(".result");
const loaderDiv = document.querySelector(".loader");
let timer;

const urlAPI = "http://api.nbp.pl/api/exchangerates/tables/A/";

const fetchExchangerateFromAPI = () => {};

//f konwertująca dane
const currencyConwerter = () => {
  const inputValue = inputAmount.value;
  const selectedValue = selectCurrency.value;
  fetch(urlAPI)
    .then((response) => response.json())
    .then((data) => {
      hideLoader();
      const exchangerateFromAPI = data[0].rates;
      const selectedCurrency = exchangerateFromAPI.find(
        (item) => item.code === selectedValue
      );
      result.innerText = (inputValue * selectedCurrency.mid).toFixed(2);
    })
    .catch((error) => {
      hideLoader();
      alert(error.message);
    });
};

//f sprawdzająca wartość inputa
const inputValidate = () => {
  if (inputAmount.value === "") {
    alert("wartość nie może być pusta");
  } else if (inputAmount.value < 1) {
    alert("wartość musi być większa lub równa 1");
    inputAmount.value = "";
  } else {
    currencyConwerter();
  }
};
// nasłuchiwanie eventu submit
submitButton.addEventListener("click", () => {
  showLoader();
  inputValidate();
});

const showLoader = () => {
  loaderDiv.classList.add("visible");
  setTimeout(() => {
    timer = loaderDiv.classList.remove("visible");
  }, 15000);
};
const hideLoader = () => {
  loaderDiv.classList.remove("visible");
  clearTimeout(timer);
};
