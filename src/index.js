//объявление переменных для html-элементов на странице
let currencySum = document.getElementById("sum-in-currency");
let rubSum = document.getElementById("rub");
let currencyList = document.getElementById("currency-list");
let mail = document.getElementById("mail");
let submitButton = document.getElementById("submit-button");
//функция, возвращающая значение суммы в валюте
function recountCurrencySum(value, currency) {
    return value*currency["Nominal"] / currency["Value"];
}
//GET-запрос для получения данных 
let currencyURL = "https://www.cbr-xml-daily.ru/daily_json.js";
let currencyRequest = fetch(currencyURL)
.then((response) => {
    return response.ok ? response : Promise.reject(response);
})
.then((response) => {

    return response.json();

})
.then((response => {
    let valutes = response["Valute"];
    //создание объекта, в котором будут храниться, непосредственно, данные о валютах
    let courseData = {

    };
    //заполнение объекта courseData
    for(let key in valutes) {
        courseData[key] = valutes[key];
    };
    //обработчик события ввода для поля "Сумма в руб."
    rubSum.addEventListener("input", (e) => {
        currencySum.value = recountCurrencySum(+e.target.value, courseData[currencyList.selectedOptions[0].dataset.value]);
    });
    //заполнение селектора валютами из списка валют
    for(let key in courseData) {
        let currency = document.createElement('option');
        currency.innerHTML = key + " - " + (courseData[key])["Name"];
        currency.dataset.value = key;
        currencyList.append(currency);
    }
    //обработчик события изменения активного элемента селектора
    currencyList.addEventListener("change", (e) => {
        currencySum.value = recountCurrencySum(+rubSum.value, courseData[e.target.selectedOptions[0].dataset.value])
    });

    //валидация поля почты
    let regMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    submitButton.addEventListener("submit", (e) => {
        e.preventDefault();

        if(regMail.test(mail.value)){
            //отправка письма
        }
        else {
            //предупреждение о некорректно введеном адресе почты 
        }
    });

}))
