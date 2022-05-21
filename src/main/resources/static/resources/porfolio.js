let userName = document.getElementById("userName");
let user;
portafolio = {};
historial = {};

let getUser = async () => {
    let request = await fetch("/api/v1/user");
    if(request.ok){
        user = await request.json();
        //userText.innerHTML=user.username;
        console.log(user);
        return user;
    }
    else{
        console.log("Error get User")
    }
}

let showUser = async () => {
    let request = await fetch("/api/v1/user");
    if(request.ok){
        const user = await request.json();
        userName.innerHTML=user.username;
        console.log(user);

        document.getElementById("result").innerHTML = "";
        let table = document.createElement("table");

        //Numero de filas
        for (let i = 0; i < user.length; i++) {
        //Numero de columnas
        let row = document.createElement("tr");
        //No nos deja hacerlo mediante un bucle, asi que a manopla

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = "bitcoin";
        cell2.innerHTML = "0.56";
        cell3.innerHTML = "12000$";

        table.appendChild(row);
      }

      document.getElementById("result").appendChild(table);
    }
    else{
        console.log("Error get User")
    }
}
//showUser();

let getPortafolio = async () => {
    user = await getUser();
    let request = await fetch("/api/v1/account/"+user.userId);
    if(request.ok){
        portafolio = await request.json();
        genera_tabla();
    }
    else{
        console.log("Error get Portafolio")
    } 
}

let getHistorial = async () => {
    user = await getUser();
    let request = await fetch("/api/v1/orders/"+user.userId);
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

async function genera_tabla() {
    // Obtener la referencia del elemento tbody
    tblBody=document.getElementById("tblBody");
    tblBody.innerHTML=""; //Se vacía el tblBody para poder actualizarlo

    // Crea las celdas
    for (let cuenta of portafolio) {
        // Crea las hileras de la tabla
        let hilera = document.createElement("tr");

        //let price=parseFloat(sel.lastPrice).toFixed(2).toString();
        let priceInfo = await getPriceInfo(cuenta.symbol);
        let valorUSDT = (cuenta.amount * priceInfo.price).toFixed(2).toString() + " $";

        let info =[cuenta.symbol.replace('USDT',''),cuenta.amount, valorUSDT, priceInfo.priceChangePercent + " %" ];
        
        for (let i of info) {
            // Crea un elemento <td> y un nodo de texto, hace que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            let celda = document.createElement("td");
            celda.setAttribute("class","text-center")

            let textoCelda = document.createTextNode("");
            
            if(i==info[3]){
                if(i.includes("-")){
                    celda.setAttribute("class","text-danger text-center");
                    textoCelda = document.createTextNode(i);

                }
                else{
                    celda.setAttribute("class","text-primary text-center");
                    textoCelda = document.createTextNode("+"+i);
                }
            }
            
            else{
                textoCelda = document.createTextNode(i);
            }
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        
      }
  
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
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
    await getPortafolio();
    await getHistorial();
}

main();

