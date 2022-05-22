package PAT.practicaFinal.model;

public class CoinModel {
    private String symbol;
    private String logo;

    public String getLogo() {
        return this.logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public CoinModel() {
    }

    public CoinModel(String symbol, String logo) {
        this.symbol = symbol;
        this.logo = logo;
    }

    public String getSymbol(){
        return this.symbol;
    }

    public void setSymbol(String symbol){
        this.symbol = symbol;
    }

    @Override
    public String toString(){
        return "Symbol:" + this.symbol + "  , Logo: "+this.logo;
    }

}
