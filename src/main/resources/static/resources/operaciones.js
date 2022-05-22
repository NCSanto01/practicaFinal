let showUser = async () => {
    let userName = document.getElementById("userName");
    let request = await fetch("/api/v1/user");
    if(request.ok){
        const user = await request.json();
        userName.innerHTML=user.username;
        console.log(user);
    }
    else{
        console.log("Error get User")
    }
}

let symbol;
let price;

let getSymbol = async () => {
    let symbolText = document.getElementById("symbolText");
    let request = await fetch("/api/v1/symbol/get");
    if(request.ok){
        symbol = await request.text();
        symbolText.innerHTML=symbol;
        console.log(symbol);
    }
    else{
        console.log("Error Get Symbol");
    }
}

let getPrice = async() => {
    let priceText = document.getElementById("priceText");
    console.log(symbol);
    let request = await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+symbol);
    if(request.ok){
        priceInfo = await request.json();
        price = parseFloat(priceInfo.price).toFixed(2);
        priceText.innerHTML = price.toString() + " $";
        
    }
    else{
        console.log("Error Get Price");
    }
}

async function startLiveUpdate(){
    setInterval(async function() {
        await getPrice();
    },1000)
}
async function main(){
    await getSymbol();
    startLiveUpdate();
}
main();
// showUser();
// getSymbol();
//startLiveUpdate();