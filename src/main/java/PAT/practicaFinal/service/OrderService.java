package PAT.practicaFinal.service;

import PAT.practicaFinal.model.OrderModel;

public interface OrderService {
    Iterable<OrderModel> retrieveByUserId(String userId);
    Iterable<OrderModel> retrieveByUserIdSymbol(String userId, String symbol);
}
