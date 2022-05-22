package PAT.practicaFinal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import PAT.practicaFinal.model.AccountModel;
import PAT.practicaFinal.repository.AccountRepository;
import PAT.practicaFinal.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {
    
    @Autowired
    private AccountRepository repository;

    @Override
    public Iterable<AccountModel> retrieveByUserId(String userId){
        return repository.findByUserId(userId);
    }

    @Autowired
    private JdbcTemplate template;
    
    @Override
    public Iterable<AccountModel> retrieveByUserIdSymbol(String userId, String symbol){
        String query = "SELECT * FROM ACCOUNTS WHERE USER_ID="+userId+" AND SYMBOL='"+ symbol+"'";
        Iterable<AccountModel> accounts = template.query(
            query,
            (data, rowNum) -> {
                return new AccountModel(
                    data.getLong("ACCOUNTS.ACCOUNT_ID"),
                    data.getLong("ACCOUNTS.USER_ID"),
                    data.getString("ACCOUNTS.SYMBOL"),
                    data.getFloat("ACCOUNTS.AMOUNT")   
                );
            }
        );

        return accounts;
    }

    @Override
    public AccountModel update(AccountModel editAccount){
        return repository.save(editAccount);
    }

}
