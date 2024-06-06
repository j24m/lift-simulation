let mainContainer = document.querySelector(".main-container");
let numberOFloors = document.querySelector("#floors");
let numberOfLifts = document.querySelector("#lifts");
let userInputModal = document.querySelector(".user-input-container");
let simulateBtn = document.querySelector(".btn-simulate");
let toastContainer = document.querySelector(".toast-container");
let toastMessage = document.querySelector(".toast-message");
let closeToast = document.querySelector(".btn-close");

simulateBtn.addEventListener("click", generateLiftsAndFloors);

toastContainer.style.display = "none";

closeToast.addEventListener("click", hideToast);

function hideToast() {
  toastContainer.style.display = "none";
}

function generateLiftsAndFloors() {
  let floorCount = Number(numberOFloors.value);
  let liftCount = Number(numberOfLifts.value);
  console.log(typeof floorCount, liftCount);
  if (floorCount < 0 || liftCount < 0) {
    toastContainer.style.display = "flex";
    toastMessage.innerHTML = "Please enter a positive value";
  } else if (floorCount === 0 || liftCount === 0) {
    toastContainer.style.display = "flex";
    toastMessage.innerHTML = "Values cannot be 0 or empty";
  } else if (liftCount > floorCount) {
    toastContainer.style.display = "flex";
    toastMessage.innerHTML = "Lift count cannot exceed floor count";
  }
}
