window.addEventListener("load", ()=>{
    let locSettings = JSON.parse(safelyStorage(localStorage.getItem, localStorage, "settings"));
    if(locSettings != null)
        settings = locSettings;
    let elems = document.getElementsByTagName("input");
    for(let i = 0; i < elems.length; i++){
        let elem = elems[i];
        elem.addEventListener("click", edit);
        switch(elem.name){
            case "width":
                elem.value = settings.game.width;
                break;
            case "height":
                elem.value = settings.game.height;
                break;
            case "gen_river":
                elem.checked = settings.game.gen_river;
                break;
            case "teme_1v1":
                elem.value = settings.game.teme_1v1;
                break;
            case "round_map":
                elem.checked = settings.game.round_map;
                break;
            case "style":
                if(elem.value == settings.style.style){
                    elem.checked = true;
                    document.getElementsByTagName("html")[0].setAttribute("theme", settings.style.style);
            
                }
                break;
            case "theme":
                if(elem.value == settings.style.theme){
                    elem.checked = true;
                    document.getElementsByTagName("html")[0].setAttribute("data-theme", settings.style.theme);            
                }
                break;
        }
    }
    
})
function edit(){
    switch(this.name){
        case "width":
            settings.game.width = this.value;
            break;
        case "height":
            settings.game.height = this.value;
            break;
        case "gen_river":
            settings.game.gen_river = this.checked;
            break;
        case "teme_1v1":
            settings.game.teme_1v1 = this.value;
            break;
        case "round_map":
            settings.game.round_map = this.checked;
            break;
        case "style":
            settings.style.style = this.value;
            document.getElementsByTagName("html")[0].setAttribute("theme", this.value);
            break;
        case "theme":
            settings.style.theme = this.value;
            document.getElementsByTagName("html")[0].setAttribute("data-theme", this.value);
            break;
    }
    safelyStorage(localStorage.setItem, localStorage, "settings", JSON.stringify(settings));
}
function save(){

}
function safelyStorage(func, obj, ...arg){
    if (window.localStorage) {
        try {
            let res = func.apply(obj, arg);
            return res;
        }
        catch(e) {
          if (e.name === 'QUOTA_EXCEDED_ERROR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            {  console.error('QUOTA_EXCEDED_ERROR or NS_ERROR_DOM_QUOTA_REACHED'); }
          else
            {  console.error('localStorage is failed. Warum? Ich weiß nicht.'); }
        }
    }
}
