package PAT.practicaFinal.repository;

import org.springframework.data.repository.CrudRepository;

import PAT.practicaFinal.model.OrderModel;

public interface OrderRepository extends CrudRepository<OrderModel, Long> {
    public Iterable<OrderModel> findByUserId(String userId);
}
