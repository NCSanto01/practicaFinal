package PAT.practicaFinal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PAT.practicaFinal.model.OrderModel;
import PAT.practicaFinal.service.OrderService;

@RestController
@RequestMapping("/api/v1")
public class OrderController {
    
    String symbol = "BTCUSDT";

    @Autowired
    private OrderService service;

    @GetMapping("/orders/{userId}")
    public ResponseEntity<Iterable<OrderModel>> retrieveByUserId(@PathVariable String userId){
        return ResponseEntity.ok().body(service.retrieveByUserId(userId));
    }

    @GetMapping("/orders/{userId}/{symbol}")
    public ResponseEntity<Iterable<OrderModel>> retrieveByUserIdSymbol(@PathVariable String userId, @PathVariable String symbol){
        return ResponseEntity.ok().body(service.retrieveByUserIdSymbol(userId, symbol));
    }

    @PostMapping("/orders/create")
    public ResponseEntity<OrderModel> create(@RequestBody OrderModel newOrder){
        return ResponseEntity.ok().body(service.create(newOrder));
    }

    @PostMapping("/symbol/set")
    public void setSymbol(@RequestBody String symbol){
        this.symbol = symbol;
    }

    @GetMapping("/symbol/get")
    public String getSymbol(){
        return this.symbol;
    }
}
