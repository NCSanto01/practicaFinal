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
    console.log(user.userId);
    let request = await fetch("/api/v1/account/"+user.userId+"/USDT");
    if(request.ok){
        balanceInfo = await request.json();
        console.log(balanceInfo);
        usdAccount = balanceInfo[0];
        balance = balanceInfo[0].amount;
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
        if(account!=undefined){
            console.log(account);
            coinBalance = account.amount;
        }
        else{
            coinBalance = 0;
            account={accountId:undefined,
                userId:user.userId,
                symbol:symbol,
                amount:0}
        }
        
    }
    else{
        console.log("Error Get Balance");
    }
    
}


let symbol = "BTCUSDT";
let price;
let buy = 0;
let user;
let balance;
let equivalencia;
let cantidad;
let coinBalance;
let account;
let usdAccount;
let historial; 

let getSymbol = async () => {
    let symbolText = document.getElementById("symbolText");
    let request = await fetch("/api/v1/symbol/get");
    if(request.ok){
        symbol = await request.text();
        if(symbol==undefined || symbol== null || symbol==""){
            symbol = "BTCUSDT";
        }
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
    let balanceText = document.getElementById("balance");
    balanceText.innerHTML = "USD disponible: "+balance + " $";


}

function Sell(){
     buy = 0;
     let balanceText = document.getElementById("balance");
     balanceText.innerHTML = symbol.replace("USDT","") + " disponible: "+coinBalance;

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

let updateBalance = async() => {
    let updatedBalance;
    if(buy==1){
        updatedBalance = balance - equivalencia;
    }
    else{
        updatedBalance = balance + equivalencia;
    }
    let request = await fetch("/api/v1/account/update", {
        method:'PUT',
        credentials:"same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accountId:usdAccount.accountId,
            userId:user.userId,
            symbol:"USDT",
            amount:updatedBalance
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
                await updateBalance();
                await getBalance();
                await getAccount(symbol);
                await getHistorial();
                Buy();
            }
            else{
                console.log("Balance USD insuficiente");
            }   
        }
        else{
            if(coinBalance>=cantidad){
                await postOrder();
                await updateAccount();
                await updateBalance();
                await getBalance();
                await getAccount(symbol);
                await getHistorial();
                Sell();
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

let getHistorial = async () => {
    let request = await fetch("/api/v1/orders/"+user.userId+"/"+symbol);
    if(request.ok){
        historial = await request.json();
        genera_tabla_historial();
    }
    else{
        console.log("Error get Historial")
    }
}

let getPriceInfo = async (symbol) => {
    let request = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol="+symbol);
    if (request.ok) {
        priceInfo = await request.json();
        return {"price":parseFloat(priceInfo.lastPrice).toFixed(2), "priceChangePercent": priceInfo.priceChangePercent};
    }
    else{
        console.log("Error get Price")
    }  
}

async function genera_tabla_historial() {
    // Obtener la referencia del elemento tbody
    tblBodyHistory=document.getElementById("tblBodyHistory");
    tblBodyHistory.innerHTML=""; //Se vacía el tblBody para poder actualizarlo

    // Crea las celdas
    for (let op of historial) {
        // Crea las hileras de la tabla
        let hilera = document.createElement("tr");

        //let price=parseFloat(sel.lastPrice).toFixed(2).toString();
        let priceInfo = await getPriceInfo(op.symbol);
        let valorUSDT = (op.amount * op.price).toFixed(2).toString() + " $";

        console.log(valorUSDT);

        let tipo = "Compra";
        if(op.buy==0){
            tipo = "Venta";
        }

        let info =[op.orderDate,op.symbol.replace('USDT',''),tipo, op.amount, op.price, valorUSDT];
        
        for (let i of info) {
            // Crea un elemento <td> y un nodo de texto, hace que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            let celda = document.createElement("td");
            celda.setAttribute("class","text-center")

            let textoCelda = document.createTextNode("");
            
            if(i==info[2]){
                if(i.includes("Venta")){
                    celda.setAttribute("class","text-danger text-center");
                    textoCelda = document.createTextNode(i);

                }
                else{
                    celda.setAttribute("class","text-primary text-center");
                    textoCelda = document.createTextNode(i);
                }
            }
            
            else{
                textoCelda = document.createTextNode(i);
            }
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        
      }
  
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBodyHistory.appendChild(hilera);
    }  
    
  }

async function main(){
    await getUser();
    await getBalance();
    await getSymbol();
    await getAccount(symbol);
    await getHistorial();
    startLiveUpdate();
    let balanceText = document.getElementById("balance");
    balanceText.innerHTML = symbol.replace("USDT","") + " disponible: "+coinBalance;
}
main();
// showUser();
// getSymbol();
//startLiveUpdate();