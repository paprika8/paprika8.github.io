let wait = true;

function start(i){
    switch(i)
    {
        case 1:
            document.getElementById("grid_game_screen").classList.add("inview");
            document.getElementById("onelvl").classList.remove("inview");
            document.getElementById("onelvl").getElementsByClassName("A2")[0].addEventListener("click", exit);
            advice1(0);
            break;
    }
    
}
function exit(){
    wait = false;
    document.getElementById("grid_game_screen").classList.remove("inview");
    document.getElementById("onelvl").classList.add("inview");
    setTimeout(()=>{pause = false}, 200);
}

function advice1(y){
    let parent = document.getElementById("onelvl");
    parent.getElementsByClassName("B1")[0].classList.add("pasb");
    parent.getElementsByClassName("B1")[0].classList.remove("actb");
    parent.getElementsByClassName("B2")[0].classList.add("pasb");
    parent.getElementsByClassName("B2")[0].classList.remove("actb");
    parent.getElementsByClassName("B3")[0].classList.add("pasb");
    parent.getElementsByClassName("B3")[0].classList.remove("actb");
    parent.getElementsByClassName("B4")[0].classList.add("pasb");
    parent.getElementsByClassName("B4")[0].classList.remove("actb");
    parent.getElementsByClassName("C2")[0].src = "";
    parent.getElementsByClassName("C3")[0].src = "";

    switch(y){
        case 1:
            parent.getElementsByClassName("B1")[0].classList.remove("pasb");
            parent.getElementsByClassName("B1")[0].classList.add("actb");
            parent.getElementsByClassName("C1")[0].src = "../image/baum1.png";
            break;
        case 2:
            parent.getElementsByClassName("B1")[0].classList.remove("pasb");
            parent.getElementsByClassName("B1")[0].classList.add("actb");
            parent.getElementsByClassName("B2")[0].classList.remove("pasb");
            parent.getElementsByClassName("B2")[0].classList.add("actb");
            parent.getElementsByClassName("C1")[0].src = "../image/baum2.png";
            break;
        case 3:
            parent.getElementsByClassName("B1")[0].classList.remove("pasb");
            parent.getElementsByClassName("B1")[0].classList.add("actb");
            parent.getElementsByClassName("B2")[0].classList.remove("pasb");
            parent.getElementsByClassName("B2")[0].classList.add("actb");
            parent.getElementsByClassName("B3")[0].classList.remove("pasb");
            parent.getElementsByClassName("B3")[0].classList.add("actb");
            parent.getElementsByClassName("C1")[0].src = "../image/baum3.png";
            break;
        case 4:
            parent.getElementsByClassName("B1")[0].classList.remove("pasb");
            parent.getElementsByClassName("B1")[0].classList.add("actb");
            parent.getElementsByClassName("B2")[0].classList.remove("pasb");
            parent.getElementsByClassName("B2")[0].classList.add("actb");
            parent.getElementsByClassName("B3")[0].classList.remove("pasb");
            parent.getElementsByClassName("B3")[0].classList.add("actb");
            parent.getElementsByClassName("B4")[0].classList.remove("pasb");
            parent.getElementsByClassName("B4")[0].classList.add("actb");
            parent.getElementsByClassName("C1")[0].src = "../image/baum4.png";
            parent.getElementsByClassName("C2")[0].src = "../image/Apfel.png";
            parent.getElementsByClassName("C3")[0].src = "../image/Apfel.png";
            break;
    }
    if(wait)
        setTimeout(()=>{advice1((y % 4 + 1))}, 500);
}