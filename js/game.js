var mapImg = {
    "1": null
}

function Point(x, y){
    this.x = x;
    this.y = y;
}
class Obj extends Point{
    constructor(x, y){
        super(x, y);
        this.img = mapImg["2"];
    }
    tick(){

    }
    draw(u, graphis, oneW){
        if(rotate)
            graphis.drawImage(this.img,
                (height - this.y - 1) * oneW, this.x * oneW, oneW, oneW);
        else
            graphis.drawImage(this.img,
                this.x * oneW, this.y * oneW, oneW, oneW);
    }
}
class Apfelbaum extends Obj{
    stat = 0;
    constructor(x, y){
        super(x, y);
        GameManager.dinamikGame.unlockSpawn.splice(indexOf(GameManager.dinamikGame.unlockSpawn, this), 1);
        GameManager.dinamikGame.objects.push(this);
        GameManager.dinamikGame[y] = setCharAt(GameManager.dinamikGame[y], x, 'b');
        this.img = mapImg["b"];
    }
    tick(){
        this.stat++
        if(this.stat == 7){
            let ps = [];
            for(let f = 0; f < Math.PI * 2; f += Math.PI / 4){
                let dx = Math.round(Math.cos(f));
                let dy = Math.round(Math.sin(f));
                let p = new Point(this.x + dx, this.y + dy);
                if(indexOf(GameManager.dinamikGame.unlockSpawn, p) != -1)
                    ps.push(p);
            }
            for(let i = 0; i < Math.min(2, ps.length); i++){
                let it = parseInt(Math.random() * ps.length);
                new Apfel(ps[it].x, ps[it].y);
                ps.splice(it, 1);
            }
            this.destroy()
        }
    }
    draw(u, graphis, oneW){
        let x = 0;
        switch(this.stat){
            case 0:
            case 1:
                x = 1;
                break;
            case 2:
            case 3:
                x = 1;
                break;
            case 4:
                x = 2;
                break;
            case 6:
            case 5:
                x = 3;
                break;
        }
        if(rotate)
            graphis.drawImage(this.img,
                64 * x, 0, 64, 128,
                (height - this.y - 1) * oneW, (this.x - 1) * oneW, oneW, oneW * 2);
        else
            graphis.drawImage(this.img,
                64 * x, 0, 64, 128,
                this.x * oneW, (this.y - 1) * oneW, oneW, oneW * 2);
    }
    destroy(){
        GameManager.dinamikGame.unlockSpawn.push(this);
        GameManager.dinamikGame.objects.splice(indexOf(GameManager.dinamikGame.objects, this), 1);
        GameManager.dinamikGame[this.y] = setCharAt(GameManager.dinamikGame[this.y], this.x, '0');
    }
}
class Apfel extends Obj{
    stat = 0;
    constructor(x, y){
        super(x, y);
        GameManager.dinamikGame.unlockSpawn.splice(indexOf(GameManager.dinamikGame.unlockSpawn, this), 1);
        GameManager.dinamikGame.objects.push(this);
        GameManager.dinamikGame[y] = setCharAt(GameManager.dinamikGame[y], x, 'a');
        this.img = mapImg["a"];
    }
    tick(){
        this.stat++;
        if(this.stat == 30)
            this.destroy();
    }
    destroy(){
        GameManager.dinamikGame.unlockSpawn.push(this);
        GameManager.dinamikGame.objects.splice(indexOf(GameManager.dinamikGame.objects, this), 1);
        GameManager.dinamikGame[this.y] = setCharAt(GameManager.dinamikGame[this.y], this.x, '0');
    }
}
class Snake{
    direction;
    ps;
    dinamikGame;
    constructor(direction, ...p){
        this.direction = direction;
        this.dinamikGame = GameManager.dinamikGame;
        for(let i = 0; i < p.length; i++){
            this.dinamikGame.unlockSpawn.splice(indexOf(this.dinamikGame.unlockSpawn, p[i]), 1);
            this.dinamikGame[p[i].y] = setCharAt(this.dinamikGame[p[i].y], p[i].x, 's');
        }

        this.ps = p;
    }
    move(step){
        this.direction = step;
        let n = this.ps.length;
        let nx = (this.ps[n - 1].x + Math.round(Math.cos(this.direction / 180 * Math.PI))) % this.dinamikGame.width;
        let ny = (this.ps[n - 1].y + Math.round(Math.sin(this.direction / 180 * Math.PI))) % this.dinamikGame.height;
        if(nx < 0)
            nx += this.dinamikGame.width;
        if(ny < 0)
            ny += this.dinamikGame.height;  

        this.dinamikGame[this.ps[0].y] = setCharAt(this.dinamikGame[this.ps[0].y], this.ps[0].x, "0");
        let c = this.dinamikGame[ny].charAt(nx);
        
        if(c == 'w' || c == 's'){
            overGame();
            return;
        }
        if(c == 'b'){
            let baum = GameManager.dinamikGame.objects[indexOf(GameManager.dinamikGame.objects, new Point(nx, ny))];
            if(baum.stat > 3){
                overGame();
                return;
            }
            else
                baum.destroy();
        }

        let i = 1;
        if(c == 'a'){
            let obj = GameManager.dinamikGame.objects[indexOf(GameManager.dinamikGame.objects, new Point(nx, ny))];
            obj.destroy();
            i = 0;
            GameManager.score(5);
            //TODO apfel
        }

        let asyncBuf = [];
        this.dinamikGame.unlockSpawn.push(this.ps[0]);
        

        for(; i < n; i++)
            asyncBuf.push(this.ps[i]);
        
        let newP = new Point(nx, ny);
        asyncBuf.push(newP);
        this.dinamikGame.unlockSpawn.splice(indexOf(this.dinamikGame.unlockSpawn, newP), 1);
        this.dinamikGame[newP.y] = setCharAt(this.dinamikGame[newP.y], newP.x, "s");
        this.ps = asyncBuf;
    }
    draw(u, graphis, oneW){
        let n = this.ps.length;

        let width = GameManager.mapGame.width;
        let height = GameManager.mapGame.height;

        if(rotate)
            drawImage(graphis,
                (height - this.ps[0].y - 1) * oneW+50,
                this.ps[0].x * oneW+50,
                angle(this.ps[0], this.ps[0+1]) + Math.PI / 2
                ,()=>{
            graphis.drawImage(mapImg["snakeB"], 
            0, u * 64, 64, 64,
            -50,
            -50, oneW, oneW)});
        else 
            drawImage(graphis,
                this.ps[0].x * oneW+50,
                this.ps[0].y * oneW+50,
                angle(this.ps[0], this.ps[1])
                ,()=>{
            graphis.drawImage(mapImg["snakeB"],
            0, u * 64, 64, 64,
            -50,
            -50, oneW, oneW)});
        for(let i = 1; i < n - 1; i++){
            let imgF = mapImg["snakeF"];
            let ang = angle(this.ps[i], this.ps[i+1]);
            if(this.ps[i-1].x - this.ps[i+1].x != 0 && this.ps[i-1].y - this.ps[i+1].y != 0){
                imgF = mapImg["snakeR2"];
                ang = angle(this.ps[i - 1], this.ps[i]);
                let d = 0;
                if(Math.abs(ang - angle(this.ps[i], this.ps[i + 1]) - Math.PI / 2) < 0.1 || Math.abs(ang - angle(this.ps[i], this.ps[i + 1]) + 3 * Math.PI / 2) < 0.1){
                    imgF = mapImg["snakeR"];
                    d = Math.PI / 2;
                }
                ang += ang - angle(this.ps[i], this.ps[i + 1]) - d;
            }
            if(rotate)
                drawImage(graphis,
                    (height - this.ps[i].y - 1) * oneW+50,
                    this.ps[i].x * oneW+50,
                    ang + Math.PI / 2
                    ,()=>{
                graphis.drawImage(imgF, 
                0, u * 64, 64, 64,
                -50,
                -50, oneW, oneW)});
            else 
                drawImage(graphis,
                    this.ps[i].x * oneW+50,
                    this.ps[i].y * oneW+50,
                    ang
                    ,()=>{
                graphis.drawImage(imgF,
                0, u * 64, 64, 64,
                -50,
                -50, oneW, oneW)});
            }
        if(rotate)
            drawImage(graphis,
                (height - this.ps[n-1].y - 1) * oneW+50,
                this.ps[n-1].x * oneW+50,
                angle(this.ps[n-2], this.ps[n-1]) + Math.PI / 2
                ,()=>{
                graphis.drawImage(mapImg["snake"], 
                0, u * 64, 64, 64,
                -50,
                -50, oneW, oneW)});
        else
            drawImage(graphis,
                this.ps[n-1].x * oneW+50,
                this.ps[n-1].y * oneW+50,
                angle(this.ps[n-2], this.ps[n-1])
                ,()=>{
                graphis.drawImage(mapImg["snake"], 
                0, u * 64, 64, 64,
                -50,
                -50, oneW, oneW)});
    }
}

class GameManager{
    static #score = 0;
    static #oldScore = 0;
    static mapGame = {
        width: 4,
        height: 3
    }
    static dinamikGame = {
        width: 0,
        height: 0,
        unlockSpawn: null,
        snake: null,
        objects: []
    }
    static tickGame(u){
        if(!pause){
            
    
            inputLock = false;
            
            for(let i = 0; i < GameManager.dinamikGame.objects.length; i++)
                GameManager.dinamikGame.objects[i].tick();

            GameManager.dinamikGame.snake.move(nextStep);
            if(u == 3){
                let apfel;
                let point;
                do{
                    apfel = parseInt(Math.random() * GameManager.dinamikGame.unlockSpawn.length);
                    point = GameManager.dinamikGame.unlockSpawn[apfel];
                }while(point.y == 0)
                new Apfelbaum(point.x, point.y);
            }
            u++;
        }
        if(game)
            setTimeout(()=>{GameManager.tickGame(u % 12)}, 600);
    }
    static getScore(){
        return GameManager.#score;
    }
    static score(d){
        GameManager.#score += d;
        try{
            document.getElementById("score").innerText = GameManager.#score;
            if(GameManager.#score > GameManager.#oldScore)
            {
                GameManager.#oldScore = GameManager.#score;
                document.getElementById("oldScore").innerText = GameManager.#score;
            }
        }catch(ex){}
    }
    static getOldScore(){
        return GameManager.#oldScore;
    }
    static oldScore(score){
        GameManager.#oldScore = score;
    }
}


let pause = false;
let nextStep = 0;
let inputLock = false;
let pauseInputLock = false;
let rotate = 0;
let game = true;
window.addEventListener("load", () =>{
    let type = window.location.search;
    let theme = document.getElementsByTagName("html")[0].getAttribute("theme");
    document.getElementById("pause").addEventListener("click", ()=>{
        pause = !pause;
        if(pause){
            pauseInputLock = inputLock;
            inputLock = true;
        }
        else
            inputLock = pauseInputLock;
    });

    let oldScore = localStorage.getItem("score");
    if(oldScore == null || oldScore == "undefined")
        oldScore = 0;

    document.getElementById("score").innerText = 0;
    document.getElementById("oldScore").innerText = oldScore;
    GameManager.oldScore(oldScore);

    mapImg["0"] = img("../image/back"+theme+".png");
    mapImg["w"] = img("../image/wand"+theme+".png");
    mapImg["a"] = img("../image/Apfel.png");
    mapImg["b"] = img("../image/baum.png");
    mapImg["2"] = img("../image/back2.png");
    mapImg["snake"] = img("../image/snake.png");
    mapImg["snakeF"] = img("../image/snake1.png");
    mapImg["snakeR"] = img("../image/snakeR.png");
    mapImg["snakeR2"] = img("../image/snakeR2.png");
    mapImg["snakeB"] = img("../image/snakeB.png");
    loadLvl(1);
})
function keyListener(evn){
    if(inputLock)
        return;
    let inputValue = GameManager.dinamikGame.snake.direction;
    let dir = GameManager.dinamikGame.snake.direction;
    switch(evn.code){
        case "KeyW":
            inputValue = -90;
            break;
        case "KeyS":
            inputValue = 90;
            break;
        case "KeyA":
            inputValue = 180;
            break;
        case "KeyD":
            inputValue = 0;
            break;
    }
    if(rotate){
        inputValue -= 90;
        if(inputValue == -180)
            inputValue = 180;
    }
    if(inputValue != dir && ((dir + inputValue) / 90) % 2){
        inputLock = true;
        nextStep = inputValue;
    }
}
function stopGame(){
    window.removeEventListener("keydown", keyListener);
}

function loadLvl(i){
    const url = "../data/" + i + "lvl.json";
    fetch(url)
        .then((resp) => {
            return resp.json();
        }).then((json) => {
            load(json);
        });
}
function load(json){
    stopGame();
    window.addEventListener("keydown", keyListener);

    let canva = document.getElementById("canva");
    let canvaDiv = document.getElementById("canvasDiv");
    GameManager.mapGame = json;
    let width = json.width;
    let height = json.height;
    let dinamikGame = GameManager.dinamikGame;


    dinamikGame.width = width;
    dinamikGame.height = height;
    for(let i = 0; i < height; i++)
        dinamikGame[i] = "0".repeat(width);
    dinamikGame.unlockSpawn = [];
    for(let i = 0; i < width; i++)
        for(let j = 0; j< height; j++)
            dinamikGame.unlockSpawn.push(new Point(i, j));
    dinamikGame.snake = new Snake(dinamikGame, new Point(0, 0), new Point(1, 0));

    for(let i = 0; i < width; i++)
        for(let j = 0; j< height; j++){
            if(json[j + 1].charAt(i) == 'w'){
                dinamikGame[j] = setCharAt(dinamikGame[j], i, "w");
                dinamikGame.unlockSpawn.splice(indexOf(dinamikGame.unlockSpawn, new Point(i, j)), 1);
            }
        }

    window.addEventListener("resize", (evn)=>{
        resize(canva, canvaDiv, width, height);
    });
    resize(canva, canvaDiv, width, height);

    pause = true;
    start(1);

    tickDraw(0);
    GameManager.tickGame(0);
}
function img(src){
    pic = new Image();
    pic.src = src;
    return pic;
}
function resize(canva, canvaDiv, width, height){
    let mapO = width / height;
    let clientO = canvaDiv.clientWidth / canvaDiv.clientHeight;
    if(1 < clientO){
        canva.width = 100 * width;
        canva.height = 100 * height;
        canva.style.aspectRatio = width + "/" + height;
        if(mapO < clientO){
            canva.classList.remove("canvasW");
            canva.classList.add("canvasH");
        }
        else{
            canva.classList.add("canvasW");
            canva.classList.remove("canvasH");
        }
        rotate = 0;
        draw(0);
    }
    else{
        canva.width = 100 * height;
        canva.height = 100 * width;
        canva.style.aspectRatio = height + "/" + width;
        if(1 / mapO > clientO){
            canva.classList.add("canvasW");
            canva.classList.remove("canvasH");
        }
        else{
            canva.classList.remove("canvasW");
            canva.classList.add("canvasH");
        }
        rotate = 1;
        draw(0);
    }
}
function draw(u){
    let canva = document.getElementById("canva");
    graphis = canva.getContext('2d');
    if(settings.style.theme == "dark")
        graphis.filter ="brightness(0.8)";
    graphis.imageSmoothingEnabled = false;
    
    let width = GameManager.mapGame.width;
    let height = GameManager.mapGame.height;

    let oneW = canva.width / width;
    if(rotate)
        oneW = canva.width / height;

    for(let i = 0; i < width; i++)
        for(let j = 0; j< height; j++){
            let state = (i + j) % 2;
            let img = mapImg[GameManager.mapGame[j + 1].charAt(i)];
            if(rotate)
                graphis.drawImage(img,
                    32 * state, 0, 32, 32,
                    (height - j - 1) * oneW, i * oneW, oneW, oneW);
            else
                graphis.drawImage(img,
                    32 * state, 0, 32, 32,
                    i * oneW, j * oneW, oneW, oneW);
        }

    for(let i = 0; i < GameManager.dinamikGame.objects.length; i++)
        GameManager.dinamikGame.objects[i].draw(u, graphis, oneW);

    GameManager.dinamikGame.snake.draw(u, graphis, oneW);
}
function angle(p1, p2){
    let X = p1.x - p2.x;
    let Y = p1.y - p2.y;
    if(Math.abs(X) > 1)
        X = -X;
    if(Math.abs(Y) > 1)
        Y = -Y;
    var asin = Math.asin(Y / Math.sqrt(Y * Y + X * X));
    var acos = Math.acos(X / Math.sqrt(Y * Y + X * X));
    var rotation = asin;

    if (acos > Math.PI / 2.) {
        rotation = -Math.PI - asin;
    }
    return rotation +  Math.PI;
}
function tickDraw(phase){
    draw(phase++);
    //requestAnimationFrame(()=>{tickDraw(phase % 4)})
    if(game)
        setTimeout(()=>{tickDraw(phase % 4)}, 100);
}
function overGame(){
    stopGame();
    game = false;
    localStorage.setItem("score", GameManager.getOldScore());
}
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
function indexOf(mass, a){
    let i = 0;
    for(; i < mass.length; i++)
        if(mass[i].x == a.x && mass[i].y == a.y)
            return i;
    return -1;
}
function drawImage(ctx, x, y, rotation, func){
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.rotate(rotation);
    func();
    //ctx.rotate(-rotation);
    //ctx.setTransform(1, 0, 0, 1, -x, -y);
    ctx.restore();
} 