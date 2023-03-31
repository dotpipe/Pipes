import cssTxtConst from './modals.json' assert { type: 'json' };

var elemBody = document.getElementsByTagName("body")[0]

// Select parent tag
var elemDIVparent = document.createElement("div");

elemDIVparent.style = cssTxtConst["div"];

var elemText = document.createElement("p");

elemText = Object.assign(elemText,cssTxtConst["div"]);//elemText.innerText = "Welcome to the PipesJS GridLock"

var elemSubmit = document.createElement("button");
elemSubmit.innerHTML = "Save"
elemSubmit.style = cssTxtConst["submit"];

var elemCancel = document.createElement("button");
elemCancel.innerHTML = "Cancel"
elemCancel.style = cssTxtConst["cancel"];

elemDIVparent.appendChild(elemText)
elemDIVparent.appendChild(elemSubmit)
elemDIVparent.appendChild(elemCancel)

elemBody.append(elemDIVparent)