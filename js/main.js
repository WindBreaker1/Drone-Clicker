//HTML elements

let dronesText = document.getElementById("drones-text");
let clickButton = document.getElementById("click-button");
let dpsText = document.getElementById("dps-text");
let humanWorkerButton = document.getElementById("human-worker-button");
let saveText = document.getElementById("save-text");
let saveButton = document.getElementById("save-button");
let resetButton = document.getElementById("reset-button");

//common variables

let clickPower = 1;
let drones = Math.trunc(JSON.parse(localStorage.getItem("drones")));
let dps = Math.trunc(JSON.parse(localStorage.getItem("dps")));

//update text functions

function updateText() {
  dronesText.innerText = `Drones: ${Math.trunc(drones)}`;
  setInterval(function () {dronesText.innerText = `Drones: ${Math.trunc(drones)}`}, 1000);

  dpsText.innerText = `DPS: ${Math.trunc(dps)}`;

  humanWorkerButton.innerText = `Human Worker \n Amount: ${humanWorker.amount} \n Cost: ${Math.trunc(humanWorker.cost)} Drones`;
}

//click function

function getDrones(){
  drones += clickPower;
  updateText();
}
clickButton.addEventListener("click", getDrones);

//activate passive drones (maybe deprecate this)

function getPassiveDrones() {
	if (dps > 0) {
	  setInterval(function () {drones += dps;}, 1000);
 	}	
}

//passive upgrades

class Upgrade {
  constructor(id, amount, cost, dps) {
    this.id = id;
    this.amount = amount;
    this.cost = cost;
    this.dps = dps;
  }
}

let humanWorker = new Upgrade(1, 0, 10, 1);
humanWorker = JSON.parse(localStorage.getItem("humanWorker"));

function buyHumanWorker() {
  if (drones >= humanWorker.cost){
    humanWorker.amount += 1;
    dps += humanWorker.dps;
    drones -= humanWorker.cost;
    humanWorker.cost *= 1.15;
    getPassiveDrones();
    updateText();
  }
}
humanWorkerButton.addEventListener("click", buyHumanWorker);



//save progress

function saveProgress() {
  JSON.stringify(localStorage.setItem("drones", drones));

  JSON.stringify(localStorage.setItem("dps", dps));

  localStorage.setItem("humanWorker", JSON.stringify(humanWorker));

  saveText.style.visibility = "visible";
  setTimeout(function () {saveText.style.visibility = "hidden"}, 3000);
}
saveButton.addEventListener("click", saveProgress);

//reset progress

function resetProgress() {
  JSON.stringify(localStorage.setItem("drones", 0));
  drones = 0;
  dronesText.innerText = `Drones: 0`;

  JSON.stringify(localStorage.setItem("dps", 0));
  dps = 0;
  dpsText.innerText = `DPS: 0`;

  localStorage.setItem("humanWorker", JSON.stringify(humanWorker = {id:1, amount:0, cost:10, dps:1}));
  updateText();
}
resetButton.addEventListener("click", resetProgress);

//loads saved values

updateText();
getPassiveDrones();