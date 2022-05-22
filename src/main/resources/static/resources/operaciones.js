let userName = document.getElementById("userName");
let showUser = async () => {
    let request = await fetch("/api/v1/user");
    if(request.ok){
        const user = await request.json();
        userName.innerHTML=user.username;
        console.log(user);
    }
    else{
        console.log("Error get User")
    }
}
showUser();