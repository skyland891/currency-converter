//объявление переменных для html-элементов на странице
let currencySum = document.getElementById("sum-in-currency");
let rubSum = document.getElementById("rub");
let currencyList = document.getElementById("currency-list");
let form = document.querySelector(".page-inner__form");
//функция, возвращающая значение суммы в валюте
function recountCurrencySum(value, currency) {
    return (value*currency["Nominal"] / currency["Value"]).toFixed(2);
}
//функиция, проверяющая правильность заполнения полей формы
function formValidate () {
    let mail = document.getElementById("mail"); //поле для ввода почты
    let error = 0;

    removeError(mail); //предварительно удалем стили неудачного ввода
    removeError(rubSum);

    if(!mailTest(mail.value)){
        addError(mail);
        error++;
    }
    
    if(rubSum.value === "") {
        addError(rubSum);
        error++;
    }

    return error;
}
//валидатор почты
function mailTest(mail) {
    let regMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i; 
    return  regMail.test(mail);
}
//функция для добавления стилей неудачного ввода 
function addError(input) {
    input.classList.add('_error');
}
//функция для удаления стилей неудачного ввода
function removeError(input) {
    input.classList.remove('_error');
}
//функция отправки формы
async function sendForm(e){
    e.preventDefault();
    if(!formValidate()){
        //сбор всех введеных данных
        let formData = new FormData(e.target);

        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });

        if(response.ok) {
            let postResult = await response.json();
            alert(postResult.message);
            form.reset();//сброс введенных данных
        }
        else {
            alert('Ошибка');
        }
    }
    else {
        //предупреждение о некорректно введенных данных
        alert('Поля заполнены некорректно!');
    }
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
    }
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

    //обработчик события отправки формы
    form.addEventListener("submit", (e) => {
        sendForm(e);
        });

}));
