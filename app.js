let boxes= document.querySelectorAll(".box");
let reset= document.querySelector("#reset-btn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");

let turnO= true //it is player O turn

let winPattern=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let count = 0;

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText= "O";
            turnO= false;
        }
        else{
            box.innerText= "X";
            turnO= true;
        }
        count++;
        console.log(count);
        box.disabled= true;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            draw();
        }
    });
});

const draw = () =>{
        msg.innerText= "Match is a draw";
        msgContainer.classList.remove("hide");
};

const resetGame = () =>{
    enableBtn();
    turnO= true;
    msgContainer.classList.add("hide");
};

const disableBtn= () =>{
    for(box of boxes){
        box.disabled= true;
    }
};

const enableBtn= () =>{
    for(box of boxes){
        box.disabled= false;
        box.innerText= "";
    }
};

const showWinner= (Winner) =>{
    msg.innerText= `Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableBtn();
}

const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "", pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
}

reset.addEventListener("click", resetGame);
