let settings = {
  game: {
      width: 10, 
      height: 10,
      gen_river: true,
      teme_1v1: 60,
      round_map: true
  },
  style: {
      theme: "day",
      style: "1"
  }
}
window.addEventListener("load", ()=>{
  let locSettings = JSON.parse(safelyStorage(localStorage.getItem, localStorage, "settings"));
    if(locSettings != null)
        settings = locSettings;
  document.getElementsByTagName("html")[0].setAttribute("theme", settings.style.style);
  document.getElementsByTagName("html")[0].setAttribute("data-theme", settings.style.theme);

})
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