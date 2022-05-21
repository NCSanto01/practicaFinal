package PAT.practicaFinal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import PAT.practicaFinal.model.OrderModel;
import PAT.practicaFinal.repository.OrderRepository;
import PAT.practicaFinal.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{
    
    @Autowired
    private OrderRepository repository;

    @Override
    public Iterable<OrderModel> retrieveByUserId(String userId){
        return repository.findByUserId(userId);
    }

    @Autowired
    private JdbcTemplate template;

    @Override
    public Iterable<OrderModel> retrieveByUserIdSymbol(String userId, String symbol){
        String query = "SELECT * FROM ORDERS WHERE USER_ID="+userId+" AND SYMBOL="+ symbol + " ORDER BY ORDER_DATE";

        Iterable<OrderModel> orders = template.query(
            query,
            (data, rowNum) -> {
                return new OrderModel(
                    data.getLong("ORDERS.ORDER_ID"),
                    data.getLong("ORDERS.USER_ID"),
                    data.getDate("ORDERS.ORDER_DATE"),
                    data.getString("ORDERS.SYMBOL"),
                    data.getFloat("ORDERS.AMOUNT"),
                    data.getInt("ORDERS.BUY"),
                    data.getFloat("ORDERS.PRICE")
                );
            }
        );

        return orders;
    }
}
