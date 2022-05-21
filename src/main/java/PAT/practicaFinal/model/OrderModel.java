package PAT.practicaFinal.model;

import java.sql.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("ORDERS")
public class OrderModel {


    
    @Id
    @Column("ORDER_ID")
    private Long orderId;

    @Column("USER_ID")
    private Long userId;

    @Column("ORDER_DATE")
    private Date orderDate;

    @Column("SYMBOL")
    private String symbol;

    @Column("AMOUNT")
    private float amount;

    @Column("BUY")
    private int buy;

    @Column("PRICE")
    private float price;

    public OrderModel() {
    }


    public OrderModel(Long orderId, Long userId, Date orderDate, String symbol,float amount, int buy, float price) {
        this.orderId = orderId;
        this.userId = userId;
        this.orderDate = orderDate;
        this.symbol = symbol;
        this.amount = amount;
        this.buy = buy;
        this.price = price;
    }


    public Long getOrderId() {
        return this.orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getSymbol() {
        return this.symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public float getAmount(){
        return this.amount;
    }

    public void setAmount(float amount){
        this.amount = amount;
    }
    
    public int getBuy() {
        return this.buy;
    }

    public void setBuy(int buy) {
        this.buy = buy;
    }

    public float getPrice() {
        return this.price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

}
