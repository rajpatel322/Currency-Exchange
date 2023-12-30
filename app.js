import { countryList } from "./code.js";

const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select"); // get select element inside the dropdown class element
const button = document.querySelector("button");
const from = document.querySelectorAll(".dropdown select")[0];
const to = document.querySelectorAll(".dropdown select")[1];
const msg = document.querySelector(".msg") // get the .msg element
const body = document.querySelector("body");

window.addEventListener("load", () => {
    convert();
})

function updateFlag(element) {
    let currCode = element.value;
    let currCountry = countryList[currCode];
    let newFlag = `https://flagsapi.com/${currCountry}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newFlag;

}

function changeHandler(evt){
    console.log(evt);
    console.log(evt.target);

    updateFlag(evt.target);
}

for(let select of dropdown) {
    for (let code in countryList){ // code = key
        let newOption = document.createElement("option"); // create a option element
        newOption.innerText = code; // set the inner text to code
        newOption.value = code; 
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", changeHandler)

}

async function convert(){
    
    let amount = document.querySelector(".amount input"); // get the input element inside the .amount class element
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 0) {
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `${base_url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    let rate = data[to.value.toLowerCase()];
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${from.value} = ${finalAmount} ${to.value}`;
    
}

button.addEventListener("click", evt => {
    evt.preventDefault();
    body.classList.add("animation");

    convert();
});



