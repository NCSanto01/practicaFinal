package PAT.practicaFinal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PAT.practicaFinal.model.OrderModel;
import PAT.practicaFinal.service.OrderService;

@RestController
@RequestMapping("/api/v1")
public class OrderController {
    
    @Autowired
    private OrderService service;

    @GetMapping("/orders/{userId}")
    public ResponseEntity<Iterable<OrderModel>> retrieveByUserId(@PathVariable String userId){
        return ResponseEntity.ok().body(service.retrieveByUserId(userId));
    }
}
