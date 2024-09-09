const dropdown = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdown) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amt.value = 1;
    }

    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();
    const amount = amtval;


    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);


        let rate = data[fromCurrency][toCurrency];
        console.log(rate)

        if (rate) {
            let finalAmount = amount * rate;
            msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        } else {
            msg.innerText = "Exchange rate not available.";
        }
    } catch (error) {
        msg.innerText = "Error fetching exchange rate.";
    }
};


const updateFlag = (ele) => {
    let code = ele.value;
    let countryCode = countryList[code];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newsrc;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
