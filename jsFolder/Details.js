//first year
let cse1arr = ["20CSE101", "20CSE101", "20CSE101", "20CSE102"];
let ece1arr = ["20CSE101", "20CSE101", "20CSE101", "20CSE102"];
let eee1arr = ["20CSE101", "20CSE101", "20CSE101", "20CSE102"];
//secondyear
let cse2arr = ["20CSE201", "20CSE101", "20CSE101", "20CSE102"];
let ece2arr = ["20CSE201", "20CSE101", "20CSE101", "20CSE102"];
let eee2arr = ["20CSE201", "20CSE101", "20CSE101", "20CSE102"];

//thirdyear
let cse3arr = ["20CSE301", "20CSE101", "20CSE101", "20CSE102"];
let ece3arr = ["20CSE301", "20CSE101", "20CSE101", "20CSE102"];
let eee3arr = ["20CSE301", "20CSE101", "20CSE101", "20CSE102"];

//appending first year

firyearcse(cse1arr);
function firyearcse(cse1arr) {
  for (let i = 0; i < cse1arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = cse1arr[i];
    document.getElementById("cse").append(div);
  }
}
firyearece(ece1arr);
function firyearece(ece1arr) {
  for (let i = 0; i < ece1arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = ece1arr[i];
    document.getElementById("ece").append(div);
  }
}
firyeareee(eee1arr);
function firyeareee(eee1arr) {
  for (let i = 0; i < eee1arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = eee1arr[i];
    document.getElementById("eee").append(div);
  }
}
//second year
secyearcse(cse2arr);
function secyearcse(cse2arr) {
  for (let i = 0; i < cse2arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = cse2arr[i];
    document.getElementById("cse2").append(div);
  }
}

secyearece(ece2arr);
function secyearece(ece2arr) {
  for (let i = 0; i < ece2arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = ece2arr[i];
    document.getElementById("ece2").append(div);
  }
}
secyeareee(eee2arr);
function secyeareee(eee2arr) {
  for (let i = 0; i < eee2arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = ece2arr[i];
    document.getElementById("eee2").append(div);
  }
}

//third year
thiyearcse(cse3arr);
function thiyearcse(cse3arr) {
  for (let i = 0; i < cse3arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = cse3arr[i];
    document.getElementById("cse3").append(div);
  }
}
thiyearece(ece3arr);
function thiyearece(ece3arr) {
  for (let i = 0; i < ece3arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = ece3arr[i];
    document.getElementById("ece3").append(div);
  }
}
thiyeareee(eee3arr);
function thiyeareee(eee3arr) {
  for (let i = 0; i < eee3arr.length; i++) {
    let div = document.createElement("div");
    div.innerText = eee3arr[i];
    document.getElementById("eee3").append(div);
  }
}
//adding toggle
let firstyear = document.getElementById("firstyear");
document.getElementById("fir").addEventListener("click", () => {
  firstyear.classList.toggle("active");
});
let secondyear = document.getElementById("secondyear");
document.getElementById("sec").addEventListener("click", () => {
  secondyear.classList.toggle("active");
});
let thirdyear = document.getElementById("thirdyear");
document.getElementById("thi").addEventListener("click", () => {
  thirdyear.classList.toggle("active");
});
//first year object
let branchesObj = {};
let CSE = [];
let ECE = [];
let EEE = [];

let csedata = document.querySelectorAll("#cse div");
for (var i = 0; i < csedata.length; i++) {
  csedata[i].addEventListener("click", csefun);
}
function csefun(event) {
  csedata = event.target.textContent;
  CSE.push(csedata);
  if (CSE.length > 1) {
    CSE.shift();
  }
  if (CSE.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("c1").innerText = `1CSE: ${CSE}`;
}
let ecedata = document.querySelectorAll("#ece div");
for (var i = 0; i < ecedata.length; i++) {
  ecedata[i].addEventListener("click", ecefun);
}
function ecefun(event) {
  ecedata = event.target.textContent;
  ECE.push(ecedata);
  if (ECE.length > 1) {
    ECE.shift();
  }
  if (ECE.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("ec1").innerText = `1ECE: ${ECE}`;
}
let eeedata = document.querySelectorAll("#eee div");
for (var i = 0; i < eeedata.length; i++) {
  eeedata[i].addEventListener("click", eeefun);
}
function eeefun(event) {
  eeedata = event.target.textContent;
  EEE.push(eeedata);
  if (EEE.length > 1) {
    EEE.shift();
  }
  if (EEE.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }

  document.getElementById("e1").innerText = `1EEE: ${EEE}`;
}
//second year object
let branchesObj2 = {};
let CSE2 = [];
let ECE2 = [];
let EEE2 = [];

let cse2data = document.querySelectorAll("#cse2 div");
for (var i = 0; i < cse2data.length; i++) {
  cse2data[i].addEventListener("click", cse2fun);
}
function cse2fun(event) {
  cse2data = event.target.textContent;
  CSE2.push(cse2data);
  if (CSE2.length > 1) {
    CSE2.shift();
  }
  if (CSE2.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("c2").innerText = `2CSE: ${CSE2}`;
}
let ece2data = document.querySelectorAll("#ece2 div");
for (var i = 0; i < ece2data.length; i++) {
  ece2data[i].addEventListener("click", ece2fun);
}
function ece2fun(event) {
  ece2data = event.target.textContent;
  ECE2.push(ece2data);
  if (ECE2.length > 1) {
    ECE2.shift();
  }
  if (ECE2.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("ec2").innerText = `2ECE: ${ECE2}`;
}
let eee2data = document.querySelectorAll("#eee2 div");
for (var i = 0; i < eee2data.length; i++) {
  eee2data[i].addEventListener("click", eee2fun);
}
function eee2fun(event) {
  eee2data = event.target.textContent;
  EEE2.push(eee2data);
  if (EEE2.length > 1) {
    EEE2.shift();
  }
  if (EEE2.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("e2").innerText = `2EEE: ${EEE2}`;
}

//Third Year object
let branchesObj3 = {};
let CSE3 = [];
let ECE3 = [];
let EEE3 = [];

let cse3data = document.querySelectorAll("#cse3 div");
for (var i = 0; i < cse3data.length; i++) {
  cse3data[i].addEventListener("click", cse3fun);
}
function cse3fun(event) {
  cse3data = event.target.textContent;
  CSE3.push(cse3data);
  if (CSE3.length > 1) {
    CSE3.shift();
  }
  if (CSE3.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("c3").innerText = `3CSE: ${CSE3}`;
}
let ece3data = document.querySelectorAll("#ece3 div");
for (var i = 0; i < ece3data.length; i++) {
  ece3data[i].addEventListener("click", ece3fun);
}
function ece3fun(event) {
  ece3data = event.target.textContent;
  ECE3.push(ece3data);
  if (ECE3.length > 1) {
    ECE3.shift();
  }
  if (ECE3.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("ec3").innerText = `3ECE: ${ECE3}`;
}
let eee3data = document.querySelectorAll("#eee3 div");
for (var i = 0; i < eee3data.length; i++) {
  eee3data[i].addEventListener("click", eee3fun);
}
function eee3fun(event) {
  eee3data = event.target.textContent;
  EEE3.push(eee3data);
  if (EEE3.length > 1) {
    EEE3.shift();
  }
  if (EEE3.length == 1) {
    document.getElementById("firstokay").style.display = "initial";
  }
  document.getElementById("e3").innerText = `3EEE: ${EEE3}`;
}

document.getElementById("firstokay").addEventListener("click", () => {
  branchesObj.CSE = CSE;
  branchesObj.ECE = ECE;
  branchesObj.EEE = EEE;
  branchesObj2.CSE2 = CSE2;
  branchesObj2.ECE2 = ECE2;
  branchesObj2.EEE2 = EEE2;
  branchesObj3.CSE3 = CSE3;
  branchesObj3.ECE3 = ECE3;
  branchesObj3.EEE3 = EEE3;
  console.log(branchesObj);
  console.log(branchesObj2);
  console.log(branchesObj3);
});

//blocks js code
document.getElementById("west").addEventListener("click", () => {
  document.getElementById("t1").style.display = "block";
});
document.getElementById("east").addEventListener("click", () => {
  document.getElementById("t2").style.display = "block";
});
document.getElementById("south").addEventListener("click", () => {
  document.getElementById("t3").style.display = "block";
});

//data fetching
let roomsObj = {};
let west = new Set();
let east = new Set();
let south = new Set();

/// rooms for west block
let table1 = document.querySelectorAll("#t1 td");
for (let i = 0; i < table1.length; i++) {
  table1[i].addEventListener("click", tablefun);
}

function tablefun(event) {
  table1data = event.target.textContent;
  west.add(table1data);
  if (west.size > 0) {
    document.getElementById("secondokay").style.display = "initial";
  }
  document.getElementById("wblock").innerHTML = `West Block: ${Array.from(
    west
  )}`;
}
/// rooms for east block

let table2 = document.querySelectorAll("#t2 td");
for (let i = 0; i < table2.length; i++) {
  table2[i].addEventListener("click", tablefun2);
}

function tablefun2(event) {
  table2data = event.target.textContent;
  east.add(table2data);
  if (east.size > 0) {
    document.getElementById("secondokay").style.display = "initial";
  }
  document.getElementById("Eblock").innerHTML = `East Block: ${Array.from(
    east
  )}`;
}

/// rooms for south block

let table3 = document.querySelectorAll("#t3 td");
for (let i = 0; i < table3.length; i++) {
  table3[i].addEventListener("click", tablefun3);
}

function tablefun3(event) {
  table3data = event.target.textContent;
  south.add(table3data);
  if (south.size > 0) {
    document.getElementById("secondokay").style.display = "initial";
  }
  document.getElementById("Sblock").innerHTML = `South Block: ${Array.from(
    south
  )}`;
}

document.getElementById("secondokay").addEventListener("click", () => {
  roomsObj.westBlock = Array.from(west);
  roomsObj.eastBlock = Array.from(east);
  roomsObj.southBlock = Array.from(south);
  console.log(roomsObj);
});
