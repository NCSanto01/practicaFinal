package PAT.practicaFinal.service;

import PAT.practicaFinal.model.AccountModel;

public interface AccountService {
    Iterable<AccountModel> retrieveByUserId(String userId);

}
