package PAT.practicaFinal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PAT.practicaFinal.model.AccountModel;
import PAT.practicaFinal.service.AccountService;

@RestController
@RequestMapping("/api/v1")
public class AccountController {
    
    @Autowired
    private AccountService service;
    
    @GetMapping("/account/{userId}")
    public ResponseEntity<Iterable<AccountModel>> retrieveByUserId(@PathVariable String userId){
        return ResponseEntity.ok().body(service.retrieveByUserId(userId));
    }

    @GetMapping("/account/{userId}/{symbol}")
    public ResponseEntity<Iterable<AccountModel>> retrieveByUserIdSymbol(@PathVariable String userId, @PathVariable String symbol){
        return ResponseEntity.ok().body(service.retrieveByUserIdSymbol(userId, symbol));
    }

    @PutMapping("/account/update")
    public ResponseEntity<AccountModel> update(@RequestBody AccountModel editAccount){
        return ResponseEntity.ok().body(service.update(editAccount));
    }
}
