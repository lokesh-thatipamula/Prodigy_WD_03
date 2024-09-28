let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newGame=document.querySelector("#new-btn");
let mainpage=document.querySelector(".main-page");
let msgContainer=document.querySelector(".msg-contain");
let container=document.querySelector(".container");
let msg=document.querySelector("#msg");
let plyrNames=document.querySelector(".multi-player");
let play=document.querySelector("#play-btn");
let multiplay=document.querySelector("#multi-btn");
let complay=document.querySelector("#complay-btn");

let b0=document.getElementById("b0");
let b1=document.getElementById("b1");
let b2=document.getElementById("b2");
let b3=document.getElementById("b3");
let b4=document.getElementById("b4");
let b5=document.getElementById("b5");
let b6=document.getElementById("b6");
let b7=document.getElementById("b7");
let b8=document.getElementById("b8");

let turnX = true;

const winPatterns=[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8],
];

const gencomchoice = () => {
    let num = Math.floor(Math.random()*9)
    console.log(num);
    if(num >= 0 && num <= 8){
        return num;
    }
    
}

multiplay.onclick = () => {
    plyrNames.classList.remove("hide");
    mainpage.classList.add("hide");
}

play.onclick = () => {
    plyrNames.classList.add("hide");
    container.classList.remove("hide");
    reset.classList.remove("hide");
    boxes.forEach((box)=>{
        box.addEventListener("click",()=>{
            console.log("clicked!");
            if(turnX){
                box.innerText="X";
                turnX=false;
            }else{
                box.innerText="O";
                turnX=true;
            }  
            box.disabled=true;

            checkWinner();
        });
    });
};

complay.onclick = () => {
    container.classList.remove("hide");
    mainpage.classList.add("hide");
    reset.classList.remove("hide");
    boxes.forEach((box)=>{
        box.onclick = () => {
            box.innerText = "X";
            box.disabled = true;
            checkcomWinner();
            while(true){
                let o = document.getElementById("b" + gencomchoice());
                console.log(o);
                if(!(o.innerHTML.includes("X") || o.innerHTML.includes("O"))){
                    o.innerText = "O";
                    box.disabled = true;
                    break;
                }
            }
            checkcomWinner();
        }
    })
};

const resetGame=()=>{
    turnX=true;
    enableBoxes();
    msgContainer.classList.add("hide");
};


const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    let px=document.querySelector("#PX input");
    let pxName=px.value;
    let po=document.querySelector("#PO input");
    let poName=po.value;
    if(winner == "X"){
        msg.innerText=`Congratulations ${pxName}! You defeated ${poName}.`;
        msgContainer.classList.remove("hide");
    }
    else{
        msg.innerText=`Congratulations ${poName}! You defeated ${pxName}.`;
        msgContainer.classList.remove("hide");
    }
    for(let box of boxes){
        box.disabled=true;
    }
};

const showcomWinner=(winner)=>{
    if(winner == "X"){
        msg.innerText=`Congratulations! You defeated Computer.`;
        msgContainer.classList.remove("hide");
    }
    else{
        msg.innerText=`Alas! Computer defeated you.`;
        msgContainer.classList.remove("hide");
    }
    for(let box of boxes){
        box.disabled=true;
    }
};

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner :",pos1Val);
                showWinner(pos1Val);
            }
        }  
    }
};

const checkcomWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner :",pos1Val);
                showcomWinner(pos1Val);
                break;
            }
        }  
    }
};

newGame.addEventListener("click",(resetGame));
reset.addEventListener("click",(resetGame));