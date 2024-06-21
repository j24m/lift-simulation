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
let building = document.createElement("div");
// console.log(getComputedStyle(document.documentElement));
building.style.display = "none";
let floor;

toastContainer.style.display = "none";

btnCloseToast.addEventListener("click", hideToast);
function hideToast() {
  toastContainer.style.display = "none";
}

simulateBtn.addEventListener("click", generateLiftsAndFloors);
function generateLiftsAndFloors() {
  let floorCount = Number(numberOFloors.value);
  let liftCount = Number(numberOfLifts.value);
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
      backBtn.classList.add("btn", "btn-floating", "btn-primary", "backBtn");
      backBtn.title = "Go Back";
      backBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z"/></svg>`;
      mainContainer.appendChild(backBtn);
      building.style.display = "flex";
      building.classList.add("building-container");
      let roof = document.createElement("div");
      roof.classList.add("roof");
      building.appendChild(roof);
      for (i = floorCount; i > 0; i--) {
        floor = document.createElement("div");
        floor.classList.add("floor");
        floor.setAttribute("id", `floor-${i}`);
        let liftControls = document.createElement("div");
        liftControls.classList.add("lift-controls");
        let btnUp = document.createElement("button");
        btnUp.classList.add("btn-up");
        btnUp.innerHTML = `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 17.59L7.41 19L12 14.42L16.59 19L18 17.59l-6-6z"
                />
                <path
                  fill="currentColor"
                  d="m6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"
                />
              </svg>`;
        let floorTitle = document.createElement("div");
        floorTitle.classList.add("floor-number");
        floorTitle.textContent = `Floor ${i}`;
        let btnDown = document.createElement("button");
        btnDown.classList.add("btn-down");
        btnDown.innerHTML = `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18 6.41L16.59 5L12 9.58L7.41 5L6 6.41l6 6z"
                />
                <path
                  fill="currentColor"
                  d="m18 13l-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"
                />
              </svg>`;
        let wall = document.createElement("div");
        wall.classList.add("wall");
        let window = document.createElement("div");
        window.classList.add("window");
        liftControls.appendChild(btnUp);
        liftControls.appendChild(floorTitle);
        liftControls.appendChild(btnDown);
        floor.appendChild(liftControls);
        building.appendChild(floor);

        if (i === 1) {
          for (j = 1; j <= liftCount; j++) {
            let liftContainer = document.createElement("div");
            liftContainer.classList.add("lift-container");
            let lift = document.createElement("div");
            lift.classList.add("lift");
            let leftDoor = document.createElement("div");
            leftDoor.classList.add("left-door");
            let rightDoor = document.createElement("div");
            rightDoor.classList.add("right-door");
            lift.appendChild(leftDoor);
            lift.appendChild(rightDoor);
            liftContainer.appendChild(lift);
            floor.appendChild(liftContainer);
          }
        }
        wall.appendChild(window);
        floor.appendChild(wall);
      }
      let bottom = document.createElement("div");
      bottom.classList.add("bottom");
      building.appendChild(bottom);
      mainContainer.appendChild(building);
      numberOFloors.value = "";
      numberOfLifts.value = "";
    }, 500);
  }
}

backBtn.addEventListener("click", displayUserInputModal);
function displayUserInputModal() {
  console.log(mainContainer);
  console.log(building);
  building.innerHTML = "";
  mainContainer.style.backgroundColor = primaryColor;
  userInputModal.style.display = "flex";
  backBtn.style.display = "none";
  building.style.display = "none";
}
