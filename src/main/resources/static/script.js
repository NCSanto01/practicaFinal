let datos=[];
let allShown=false;

let llamarBinance=async ()=>{
    let peticion = await fetch("https://api2.binance.com/api/v3/ticker/24hr", {
        method: "GET",
    });

    if(peticion.status==200){
        datos= await peticion.json();
        selectDatos(datos,symbols);
        console.log(select);
        genera_tabla();

    }
    else{
        console.log(peticion.status);
        
    }
};

let select=[];
let selUSDT=[];

let symbols=["BTCUSDT","ETHUSDT","ADAUSDT","LTCUSDT","SOLUSDT","XRPUSDT","BNBUSDT","AVAXUSDT","XLMUSDT","LUNAUSDT"]
let selectDatos = (datos,symbols)=>{
    select=[];
    
    for(let dato of datos)
    {
        if(symbols.includes(dato.symbol))
        {
            select.push(dato);
        }
    }
}

llamarBinance();


let addCoin = ()=>{
    symbol=document.getElementById("symbol").value + "USDT";
    symbols.push(symbol);
    llamarBinance();
}

let selectUSDT = ()=>{
    selUSDT=[];
    for(let moneda of datos){
        if(moneda.symbol.includes("USDT"))
        {
            selUSDT.push(moneda);
        }
    }
}


let showAll=()=>{
    selectUSDT();
    select=selUSDT;
    genera_tabla();
}

let alternar=()=>{
    boton=document.getElementById("showAll");

    if(allShown==false)
    {
        showAll();
        allShown=true;
        let texto=document.createTextNode("Mostrando todas");
        boton.innerHTML="";
        boton.appendChild(texto);

    }

    else if(allShown==true)
    {
        allShown=false;
        let texto=document.createTextNode("Mostrando Selección");
        boton.innerHTML="";
        boton.appendChild(texto);
        llamarBinance();
    }
}




function genera_tabla() {
    // Obtener la referencia del elemento tbody
    tblBody=document.getElementsByTagName("tbody")[0];
    tblBody.innerHTML=""; //Se vacía el tblBody para poder actualizarlo
    console.log(tblBody)

    // Crea las celdas
    for (let sel of select) {
        // Crea las hileras de la tabla
        let hilera = document.createElement("tr");
        console.log(hilera);

        
        let price=parseFloat(sel.lastPrice).toFixed(2).toString();
        let info =[sel.symbol.replace('USDT',''),price,sel.priceChangePercent];
        
        for (let i of info) {
            // Crea un elemento <td> y un nodo de texto, hace que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            let celda = document.createElement("td");
            celda.setAttribute("class","col-4 text-center")

            let textoCelda = document.createTextNode("");
            
            if(i==info[2]){
                if(i.includes("-")){
                    celda.setAttribute("class","text-danger col-4 text-center");
                    textoCelda = document.createTextNode(i+" %");

                }
                else{
                    celda.setAttribute("class","text-primary col-4 text-center");
                    textoCelda = document.createTextNode("+"+i+" %");


                }

            }
            else if(i==info[1])
            {
                textoCelda = document.createTextNode(i + " $");

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

  