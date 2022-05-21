package PAT.practicaFinal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("ACCOUNTS")
public class AccountModel {
    

    public AccountModel() {
    }


    public AccountModel(Long accountId, Long userId, String symbol, float amount) {
        this.accountId = accountId;
        this.userId = userId;
        this.symbol = symbol;
        this.amount = amount;
    }

    @Id
    @Column("ACCOUNT_ID")
    private Long accountId;

    @Column("USER_ID")
    private Long userId;

    @Column("SYMBOL")
    private String symbol;

    @Column("AMOUNT")
    private float amount;


    public Long getAccountId() {
        return this.accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSymbol() {
        return this.symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public float getAmount() {
        return this.amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

}
