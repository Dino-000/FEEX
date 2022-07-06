let uploadFile = document.getElementById("uploadFile");
let createTable = document.getElementById("createTable");
let map = document.getElementById("classMap");
let students = document.querySelectorAll("td");
let rowCount = document.getElementById("rowCount");
let columnCount = document.getElementById("columnCount");



createTable.addEventListener("click", () => {
  let table = document.createElement("TABLE");
  let colgroup = document.createElement("COLGROUP");
  let  







  for (row = 0; row < rowCount.value; row++) {
    let currentRow = document.createElement("TR");
    let currentRowHeader = document.createElement("TH");
    currentRowHeader.innerHTML = "row-" + (row + 1);
    currentRow.append(currentRowHeader);
    for (col = 0; col < columnCount.value; col++) {
      let currentCell = document.createElement("TD");
      currentCell.innerText = "Empty Seat";
      currentRow.append(currentCell);
    }
    table.append(currentRow);
  }
  map.innerHTML = table.outerHTML;
  console.log(table);
});










uploadFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  readExcelFile(file);
});

async function readExcelFile(file) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    let data = new Uint8Array(reader.result);
    let workbook = XLSX.read(data);
    const studentList = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
      { header: 1 }
    );

    if (studentList.length == 0) {
      alert("no data found");
    }
    createList(studentList);
  };
}






// document.addEventListener("DOMNodeInserted", (event) => {
let items = document.querySelectorAll(".box");

function handleDragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragEnd(e) {
  this.style.opacity = "1";
  items.forEach(function (item) {
    console.log(items);
    item.classList.remove("over");
  });
}
function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  e.stopPropagation();
  // e.preventDefault();

  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

//   items.forEach(function (item) {
//     item.addEventListener("dragstart", handleDragStart);
//     item.addEventListener("dragover", handleDragOver);
//     item.addEventListener("dragenter", handleDragEnter);
//     item.addEventListener("dragleave", handleDragLeave);
//     item.addEventListener("dragend", handleDragEnd);
//     item.addEventListener("drop", handleDrop);
//   });
// });

createList = (list) => {
  let itemsInRow = 4;
  let currentRow = 1;
  let currentColumn = 1;

  getPosition = () => {
    return `<em>(${currentRow}-${currentColumn})</em>`;
  };
  moveToNextStudent = () => {
    if (currentColumn === itemsInRow) {
      currentColumn = 1;
      currentRow++;
    } else {
      currentColumn++;
    }
  };
  //   for (student of list) {
  //     let div = document.createElement("DIV");
  //     // div.classList.add("btn");
  //     // div.classList.add("btn-outline-primary");
  //     // div.classList.add("col-sm-3");
  //     div.classList.add("box");
  //     div.setAttribute("draggable", "true");
  //     div.innerHTML = student[0] + " " + getPosition();
  //     div.addEventListener("dragstart", handleDragStart);
  //     div.addEventListener("dragover", handleDragOver);
  //     div.addEventListener("dragenter", handleDragEnter);
  //     div.addEventListener("dragleave", handleDragLeave);
  //     div.addEventListener("dragend", handleDragEnd);
  //     div.addEventListener("drop", handleDrop);

  //     map.append(div);
  //     // console.log(getPosition());
  //     moveToNextStudent();
  //   }
  for (i = 0; i < list.length; i++) {
    students[i].innerHTML = list[i][0] + " " + getPosition();
    moveToNextStudent();
  }
};
