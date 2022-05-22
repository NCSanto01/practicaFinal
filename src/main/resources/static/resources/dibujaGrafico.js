
let symbolGrafico;

let getSymbolGrafico = async () => {
    let symbolText = document.getElementById("symbolText");
    let request = await fetch("/api/v1/symbol/get");
    if(request.ok){
        symbolGrafico = await request.text();
        symbolText.innerHTML=symbolGrafico;
        console.log(symbolGrafico);
    }
    else{
        console.log("Error Get Symbol");
    }
}

async function main(){

    await getSymbolGrafico();
    let graphFooter = document.getElementById("graphFooter");
    graphFooter.innerHTML = symbolGrafico + " Gráfico";

    new TradingView.widget(
        {
        "width": 1045,
        "height": 780,
        "symbol": "BINANCE:"+symbolGrafico,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "es",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_206ee"
      }
        );
}
main();

