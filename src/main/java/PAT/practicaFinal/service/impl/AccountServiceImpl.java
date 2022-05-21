package PAT.practicaFinal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
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
}
