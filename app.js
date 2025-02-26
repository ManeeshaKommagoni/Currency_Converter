const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const BASE_URL ="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/";
const fromCurr = document.querySelector(".from select") ;
    const toCurr = document.querySelector(".to select") ;
const msg = document.querySelector(".msg");

for(let select of dropdowns)
{ 
for(let currcode in countryList)
{
    let newOption = document.createElement("option");
    newOption.innerText = countryList[currcode];
    newOption.value = currcode;
    if(select.name === "from" && currcode === "USD")
    {
        newOption.selected = true;
    }
   else if(select.name === "to" && currcode === "INR")
    {
            newOption.selected = true;
    }
    select.append(newOption);    
}
select.addEventListener("change", (evt)=>
{
    updateFlag(evt.target);
});
}

const updateFlag = (element) =>
{
   let currcode = element.value;
   let countryCode = countryList[currcode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}

btn.addEventListener("click", async (evt)=>
{
    evt.preventDefault();
    btn.height ="2.2rem";
    // btn.width ="";
    let amt = document.querySelector("#inp");
    let amtVal = amt.value;
    if( amtVal ==="" || amtVal <1)
    {
        amt.value = "1";
        amt.innerText="1";
    }
   
    const URL = `${BASE_URL}/${fromCurr.value}_${toCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data['rate'];
    // console.log(rate);
    let finalAmount = (parseFloat(amtVal)/rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(finalAmount);
});




