const notescontainer = document.querySelector(".notes-container")   ;
const createBtn = document.querySelector(".btn")   ;
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notescontainer.innerHTML = localStorage.getItem("notes") ;
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes", notescontainer.innerHTML);
}




createBtn.addEventListener("click",()=>{
    let inputBox  = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "./notes-app-img/images/delete.png";
    notescontainer.appendChild(inputBox).appendChild(img);
    updateStorage();
})


notescontainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName ==="P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(note=>{
            note.onkeyup  = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", e=>{
    if(e.key === "Enter"){
        document.execCommand("insertLineBreak");
        e.preventDefault();
    }
})