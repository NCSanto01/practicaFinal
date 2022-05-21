package PAT.practicaFinal.repository;

import org.springframework.data.repository.CrudRepository;

import PAT.practicaFinal.model.AccountModel;


public interface AccountRepository extends CrudRepository<AccountModel, Long> {
    public Iterable<AccountModel> findByUserId(String userId);
}
