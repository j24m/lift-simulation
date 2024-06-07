let mainContainer = document.querySelector(".main-container");
let numberOFloors = document.querySelector("#floors");
let numberOfLifts = document.querySelector("#lifts");
let userInputModal = document.querySelector(".user-input-container");
let simulateBtn = document.querySelector(".btn-simulate");
let toastContainer = document.querySelector(".toast-container");
let toastMessage = document.querySelector(".toast-message");
let btnCloseToast = document.querySelector(".btn-close");
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--primary-color")
  .trim();
const secondaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--secondary-color")
  .trim();
let backBtn = document.createElement("button");
// console.log(getComputedStyle(document.documentElement));
toastContainer.style.display = "none";

btnCloseToast.addEventListener("click", hideToast);
function hideToast() {
  toastContainer.style.display = "none";
}

simulateBtn.addEventListener("click", generateLiftsAndFloors);
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
  } else {
    setTimeout(() => {
      mainContainer.style.backgroundColor = secondaryColor;
      userInputModal.style.display = "none";
      backBtn.style.display = "block";
      console.log(backBtn);
      backBtn.classList.add("btn", "btn-floating", "btn-primary", "backBtn");
      backBtn.title = "Go Back";
      backBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z"/></svg>`;
      mainContainer.appendChild(backBtn);
    }, 500);
  }
}

backBtn.addEventListener("click", displayUserInputModal);
function displayUserInputModal() {
  mainContainer.style.backgroundColor = primaryColor;
  userInputModal.style.display = "flex";
  backBtn.style.display = "none";
}
