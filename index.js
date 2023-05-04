showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addnameinput = document.getElementById("addnameinput");
let addageinput = document.getElementById("addageinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function () {
  let inputval = {
    task: addtaskinput.value,
    name: addnameinput.value,
    age: addageinput.value,
  };
 let taskObj = [];
  if (inputval?.length != 0) {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push({ task_name: inputval, completeStatus: false });

    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = "";
    addnameinput.value = "";
    addageinput.value = "";
  }
  showtask();
});

// showtask
function showtask() {
  let taskObj = [];
  let webtask = localStorage.getItem("localtask");
 
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  console.log(taskObj[0]?.task_name?.task);
  let html = "";
  let addedtasklist = document.getElementById("addedtasklist");
  for (let index = 0; index < taskObj.length; index++) {
    html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>
                    ${taskObj[index].task_name.task}
                     <td>
                    <td>${taskObj[index].task_name.name} <td>
                    <td>${taskObj[index].task_name.age} <td>
                
                    <td><button type="button"  class="editTask" onclick="edittask(${index})">Edit</button></td>
                    
                    <td><button type="button" class="deleteTask" onclick="deleteitem(${index})">Delete</button></td>
                </tr>`;
  }
  addedtasklist.innerHTML = html;
}

// edittask
function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let addtaskbtn = document.getElementById("addtaskbtn");
  let savetaskbtn = document.getElementById("savetaskbtn");
  saveindex.value = index;
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);

  addtaskinput.value = taskObj[index]["task_name"]["task"];
  addnameinput.value = taskObj[index]["task_name"]["name"];
  addageinput.value = taskObj[index]["task_name"]["age"];
  addtaskbtn.style.display = "none";
  savetaskbtn.style.display = "inline";
}

// savetask
// savetask
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
  let addtaskbtn = document.getElementById("addtaskbtn");
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;

  for (keys in taskObj[saveindex]) {
    if (keys == "task_name") {
      taskObj[saveindex].task_name.task = addtaskinput.value;
      taskObj[saveindex].task_name.name = addnameinput.value;
      taskObj[saveindex].task_name.age = addageinput.value;
    }
  }
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "inline";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  addtaskinput.value = "";
  addnameinput.value = "";
  addageinput.value = "";
  showtask();
});

// deleteitem
function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

// clearall
let clearallbtn = document.getElementById("clearallbtn");
clearallbtn.addEventListener("click", function () {
  let savetaskbtn = document.getElementById("savetaskbtn");
  let addtaskbtn = document.getElementById("addtaskbtn");
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
    taskObj = [];
  }
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "inline";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
});
