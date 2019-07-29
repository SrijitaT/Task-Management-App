"use strict";

function createListElem(task){
        document.getElementById('list').innerHTML+='<li>\
        <div class="alert alert-info" onclick="showHideDescription(this)" desc="'+task.description+'">'+task.title
        +'<button type="button" class="btn-sm btn btn-outline-danger" onclick="handleDelete(this)">X</button>\
        <button type="button" class="btn-sm btn btn-outline-success" onclick="handleDone(this)">Done</button></div></li>';
}

function showHideDescription(list){
        const descPara=list.getElementsByTagName('p');
        if(descPara.length==0){
            const element=document.createElement("p");
            const hr=document.createElement("hr");
            element.appendChild(hr);
            element.appendChild(document.createTextNode(list.getAttribute("desc")));
            list.appendChild(element); 
        }else{
            list.removeChild(descPara[0]);
        }
}
function handleDelete(element){
    const elem=element.parentNode;
    elem.parentNode.removeChild(elem);
}
function handleUndo(event){
    const element=event.target;
    element.parentNode.parentNode.remove(element.parentNode);
    element.parentNode.setAttribute('class','alert alert-info');
    element.innerHTML="Done";
    element.setAttribute('class','btn-sm btn btn-outline-success');
    element.addEventListener("click",handleDone);
    document.getElementById("list").appendChild(element.parentNode);   
}
function handleDone(element){
    if(element instanceof Event){
        element=element.target;
    }
    element.parentNode.parentNode.removeChild(element.parentNode); //remove from pending task
    element.parentNode.setAttribute('class','alert alert-info task-done');
    element.innerHTML="Undo";
    element.setAttribute('class','btn-sm btn btn-outline-primary undo-btn');
    element.addEventListener("click",handleUndo);
    const li=document.createElement("li")
    document.getElementById("done-list").appendChild(li);
    li.appendChild(element.parentNode); 
}
function addTaskToBoard(){
    const title=document.getElementById("newtask").value;
    const description=document.getElementById("newdesc").value;
    if(title&&description){
        createListElem({title,description});
        document.getElementById("newtaskdetails").remove();
        document.getElementById("create-btn").disabled=false;
    }
}

function handleAddTask(){
    document.getElementById("create-btn").disabled=true;
    document.getElementById("add-task").innerHTML+=
    '<div id="newtaskdetails">\
        <input type="text" id="newtask">\
        <input type="text" id="newdesc">\
        <button id="add" type="button" class="btn btn-primary mb-2" onclick=addTaskToBoard()>Add</button>\
    </div>'
}
function removeAllChildren(parent){
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}
function handleFilterTask(){
    let btnText=document.getElementById("filter-btn").innerHTML;
    const parent = document.getElementById("list");
    const filter_btn=document.getElementById("filter-btn");
    let toFilter=document.getElementById("filter");
    removeAllChildren(parent);
    if(btnText=="Filter"){
        toFilter=toFilter.value.toLowerCase();
        const filteredItems=tlist.filter(task=>task.title.toLowerCase().includes(toFilter));
        if(filteredItems.length)
        {
            listTasks(filteredItems);
        }
        else
        {
            document.getElementById('list').innerHTML="No such task was added!!";
        }
        filter_btn.innerHTML="Clear";
        filter_btn.setAttribute('class','btn btn-danger');
    }
    else
    {
        listTasks(tlist);
        toFilter.value="";
        filter_btn.innerHTML="Filter";
        filter_btn.setAttribute('class','btn btn-success');
    }
}
function listTasks(tasks){
    tasks.map(task=>{
        createListElem(task);
    });
}
listTasks(tlist);