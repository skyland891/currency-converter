let currencySum = document.getElementById("sum-in-currency");
let rubSum = document.getElementById("rub");
let converterDatalist = document.querySelector(".converter__datalist"); 

rubSum.addEventListener("change", (e) => {
    currencySum.value = (+e.target.value*0.6).toFixed(2);
});

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
    let courseData = {

    };

    for(let key in valutes) {
        courseData[key] = valutes[key];
    };

    


    /*
    converterDatalist.addEventListener("change",(e) => {
        
    });
    */
}))
