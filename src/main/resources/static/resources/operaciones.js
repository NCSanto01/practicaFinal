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

let getUser = async () => {
    let request = await fetch("/api/v1/user");
    if(request.ok){
        user = await request.json();
        //userText.innerHTML=user.username;
        console.log(user);
    }
    else{
        console.log("Error get User")
    }
}

let getBalance = async() => {
    let balanceText = document.getElementById("balance");
    console.log(user.userId);
    let request = await fetch("/api/v1/account/"+user.userId+"/USDT");
    if(request.ok){
        balanceInfo = await request.json();
        console.log(balanceInfo);
        balance = balanceInfo[0].amount;
        balanceText.innerHTML = "USD disponible: "+balance + " $";
    }
    else{
        console.log("Error Get Balance");
    }
    
}

let getAccount = async(symbol) => {
    let request = await fetch("/api/v1/account/"+user.userId+"/"+symbol);
    if(request.ok){
        let accounts = await request.json();
        account = accounts[0];
        console.log(account);
        coinBalance = account.amount;
    }
    else{
        console.log("Error Get Balance");
    }
    
}

let symbol;
let price;
let buy = 1;
let user;
let balance;
let equivalencia;
let cantidad;
let coinBalance;
let account; 

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
    let equivalenciaText = document.getElementById("equivalencia");
    let cantidadText = document.getElementById("cantidad");
    cantidad = parseFloat(cantidadText.value);
    console.log(symbol);
    let request = await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+symbol);
    if(request.ok){
        priceInfo = await request.json();
        price = parseFloat(priceInfo.price).toFixed(2);
        priceText.innerHTML = price.toString() + " $";
        equivalencia = price*cantidad.toFixed(2);
        if(!isNaN(equivalencia)){
            equivalenciaText.innerHTML = "Esto equivale a: "+equivalencia.toString()+" $";
        }
        else{
            equivalenciaText.innerHTML = "Esto equivale a: "
            console.log("Debe ser un número");
        }
        
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

function Buy(){
    buy = 1;
}

function Sell(){
     buy = 0;
}

let postOrder = async() => {
    let date = new Date();
    let request = await fetch("/api/v1/orders/create",{
        method: 'POST',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId:user.userId,
            orderDate:date,
            symbol:symbol,
            amount:cantidad,
            buy:buy,
            price:price
        }),
        dataType: "json"
    });

    if(request.ok){
        console.log("Success!");
        console.log(await request.json());    
    }
    else{
        console.log("Error");
    }

}

let updateAccount = async() => {
    let updateAmount;
    console.log("ACCCOUNNNTT ID: "+ account.accountId);
    if(buy==1){
        updateAmount = coinBalance + cantidad;
    }
    else{
        updateAmount = coinBalance - cantidad;
    }
    let request = await fetch("/api/v1/account/update", {
        method: 'PUT',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accountId:account.accountId,
            userId:user.userId,
            symbol:symbol,
            amount:updateAmount
        }),
        dataType: "json"
    });
    if(request.ok){
        console.log("Success!");
        console.log(await request.json());  
    }
    else{
        console.log("Error");
    }

}

async function confirmar(){
    if(!isNaN(cantidad)){
        if(buy==1){
            if(balance>=equivalencia){
                await postOrder();
                await updateAccount();
                await getBalance();
                await getAccount(symbol);
            }
            else{
                console.log("Balance USD insuficiente");
            }   
        }
        else{
            if(coinBalance>=cantidad){
                await postOrder();
                await updateAccount();
                await getBalance();
                await getAccount(symbol);
            }
            else{
                console.log("Balance insuficiente");
            }
        }
    }
    else{
        console.log("Not a number");
    }
}

async function main(){
    await getUser();
    await getBalance();
    await getSymbol();
    await getAccount(symbol);
    startLiveUpdate();
}
main();
// showUser();
// getSymbol();
//startLiveUpdate();