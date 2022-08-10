//OnLoad Display saved  HTML elemnts from localStorage
window.onload = function setTemplate() {
  document.getElementById("allComments").innerHTML =
    localStorage.getItem("template");
};



//Getting the reference of allcomment div
const commentContainer = document.getElementById("allComments");



//Adding click event Listener to Add button , which will create a div with the comment and reply options
document.getElementById("addComments").addEventListener("click", function (ev) {
  let text = document.getElementById("comment").value;

  //if textareaValue is empty then display alert
  if (text !== "") {

    addComment(ev);
  
  } else {
  
    alert("Add Comment");
  
  }

});





// Creating the main addComment functionality
function addComment(ev) {

  let commentText, wrapDiv;
  
  //Creating textbox div
  const textBox = document.createElement("div");
  textBox.className = "textBox";
  

  //Reply button
  const replyButton = document.createElement("button");
  replyButton.className = "reply";
  replyButton.innerHTML = "Reply";
  

  //Like Button
  const likeButton = document.createElement("button");
  likeButton.innerHTML = "Like";
  likeButton.className = "likeComment";
  

  //Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "deleteComment";


   
  //Using hasClass(ele, className) funciton , which takes two parameters
  //1. Element (e Target Element )
  //2. ClassName of the target.element 
   
  if (hasClass(ev.target.parentElement, "container")) {

  //if the target element is Add buttton inside the main div and the class name is "container" 
  // as parameter in the hasClass() function , then add the textarea value in the wrapDiv innerHTML
  // and clear the main comment textarea

    //Creating a wrapDiv with classname as wrapper and style marginLeft
    const wrapDiv = document.createElement("div");
    wrapDiv.className = "wrapper";
    wrapDiv.style.marginLeft = 0;

    //Getting textarea value from the main textarea and adding it to the new 
    //created Div , ie. wrapDiv, and clearing the main textarea innerText / value
    commentText = document.getElementById("comment").value;
    document.getElementById("comment").value = "";
    textBox.innerHTML = commentText;

    //appending the reply, add, delete button to the new create wrapDiv 
    //and appendig wrapDiv as a child to the main commentContainer
    wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
    commentContainer.appendChild(wrapDiv);
  } 
  
  
  //if the target element is Reply buttton inside the nested div and the class name is "wrapper" 
  // as parameter in the hasClass() function , then create the textarea elemnt and add value in the wrapDiv innerHTML
  // and remove the reply textarea
  else {
    wrapDiv = ev.target.parentElement;
    commentText = ev.target.parentElement.firstElementChild.value;
    textBox.innerHTML = commentText;
    textBox.style.backgroundColor = "#837474";
    wrapDiv.innerHTML = "";
    wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
  }

  //Calling the setOnLocalStorage() function each time add or reply button is clicked
  setOnLocalStorage();


}


//Function to store allcomment innerHTml in the localStorage, with key "template"
function setOnLocalStorage() {
  localStorage.setItem(
    "template",
    document.getElementById("allComments").innerHTML
  );
}


 //Creating hasClass(ele, className) funciton , which takes two parameters
  //1. Element (e Target Element )
  //2. ClassName of the target.element 
function hasClass(elem, className) {
  return elem.className.split(" ").indexOf(className) > -1;
}


  
  //Using hasClass(ele, className) funciton , which takes two parameters
  //1. Element (e Target Element )
  //2. ClassName of the target.element 

  document.getElementById("allComments").addEventListener("click", function (e) {

    //Using hasClass() function , if target element is reply button , 
    //with className as reply then do the reply functionality

  if (hasClass(e.target, "reply")) {
    
    const parentDiv = e.target.parentElement;
    const wrapDiv = document.createElement("div");
    wrapDiv.style.marginLeft =
      (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + "px";
    wrapDiv.className = "wrapper";
    
    const textArea = document.createElement("textarea");
    textArea.style.marginRight = "20px";
    textArea.className = "newTextArea";
    
    const addButton = document.createElement("button");
    addButton.className = "addReply";
    addButton.innerHTML = "Add";
    
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.className = "cancelReply";
    
    wrapDiv.append(textArea, addButton, cancelButton);
    parentDiv.appendChild(wrapDiv);
  }
  
  
  
  //Using hasClass() function , if target element is addreply button(nested reply) , 
  //with className as addreply then do the nested reply functionality, by calling addcomment() function


  else if (hasClass(e.target, "addReply")) {
    addComment(e);
  } 
  


  //Using hasClass() function , if target element is like button , 
  //with className as likeCommment then increse like count
  else if (hasClass(e.target, "likeComment")) {
    
    const likeBtnValue = e.target.innerHTML;
    
    e.target.innerHTML =
      likeBtnValue !== "Like" ? Number.parseInt(likeBtnValue) + 1 : 1;
    
      setOnLocalStorage();
  }
  
  
  //Using hasClass() function , if target element is cancel button , 
  //with className as cancelreply then remove  the reply tetxtarea
  else if (hasClass(e.target, "cancelReply")) {
  
    e.target.parentElement.innerHTML = "";
  
    setOnLocalStorage();
  
  } 
  
  //Using hasClas() function , if target element is deelte button , 
  //with className as deleteComment  then delete the whole wrapdiv and comment
  else if (hasClass(e.target, "deleteComment")) {
  
    e.target.parentElement.remove();
  
  }



});



//Getting reset button and on click of that , reloading the page and removing the saved HTML elemnt from local stoarge
document.getElementById("Reset").addEventListener("click", function () {
  localStorage.removeItem("template");
  location.reload();
  console.log("hello");
});
