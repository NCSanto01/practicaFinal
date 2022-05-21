let userName = document.getElementById("userName");

let getUser = async () => {
    let request = await fetch("/api/v1/user");
    if(request.ok){
        const user = await request.json();
        //userText.innerHTML=user.username;
        console.log(user);
    }
    else{
        console.log("Error get User")
    }
}

let showUser = async () => {
    let request = await fetch("/api/v1/user");
    if(request.ok){
        const user = await request.json();
        userName.innerHTML=user.username;
        console.log(user);

        document.getElementById("result").innerHTML = "";
        let table = document.createElement("table");

        //Numero de filas
        for (let i = 0; i < user.length; i++) {
        //Numero de columnas
        let row = document.createElement("tr");
        //No nos deja hacerlo mediante un bucle, asi que a manopla

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = "bitcoin";
        cell2.innerHTML = "0.56";
        cell3.innerHTML = "12000$";

        table.appendChild(row);
      }

      document.getElementById("result").appendChild(table);
    }
    else{
        console.log("Error get User")
    }
}
showUser();