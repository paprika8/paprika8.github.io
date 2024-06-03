window,addEventListener("load", ()=>{
    let elems = document.getElementsByClassName("link_butt");
    for(let i = 0; i < elems.length; i++)
        elems[i].addEventListener("click", ()=>{
        window.location.href = elems[i].getAttribute("value");
    })
})