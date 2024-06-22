let body = document.querySelector("body");
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
let clouds;
let sun;
let road;
let roadMarking;

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
    sun = document.createElement("div");
    sun.classList.add("sun");
    sun.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24"><path fill="currentColor" d="m6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91l-1.41-1.41l-1.79 1.79l1.41 1.41zm-3.21 13.7l1.79 1.8l1.41-1.41l-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91l1.41 1.41l1.79-1.8l-1.41-1.41z"/></svg>`;
    clouds = document.createElement("div");
    let cloud1 = document.createElement("div");
    let cloud2 = document.createElement("div");
    let cloud3 = document.createElement("div");
    let cloud4 = document.createElement("div");
    let cloud5 = document.createElement("div");

    clouds.classList.add("clouds");
    cloud1.classList.add("cloud");
    cloud2.classList.add("cloud");
    cloud3.classList.add("cloud");
    cloud4.classList.add("cloud");
    cloud5.classList.add("cloud");

    cloud1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 19q-1.871 0-3.185-1.306Q2 16.39 2 14.517q0-1.719 1.175-3.051t2.921-1.431q.337-2.185 2.01-3.61T12 5q2.502 0 4.251 1.749T18 11v1h.616q1.436.046 2.41 1.055T22 15.5q0 1.471-1.014 2.486Q19.97 19 18.5 19z"/></svg>`;
    cloud2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 19q-1.871 0-3.185-1.306Q2 16.39 2 14.517q0-1.719 1.175-3.051t2.921-1.431q.337-2.185 2.01-3.61T12 5q2.502 0 4.251 1.749T18 11v1h.616q1.436.046 2.41 1.055T22 15.5q0 1.471-1.014 2.486Q19.97 19 18.5 19z"/></svg>`;
    cloud3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 19q-1.871 0-3.185-1.306Q2 16.39 2 14.517q0-1.719 1.175-3.051t2.921-1.431q.337-2.185 2.01-3.61T12 5q2.502 0 4.251 1.749T18 11v1h.616q1.436.046 2.41 1.055T22 15.5q0 1.471-1.014 2.486Q19.97 19 18.5 19z"/></svg>`;
    cloud4.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 19q-1.871 0-3.185-1.306Q2 16.39 2 14.517q0-1.719 1.175-3.051t2.921-1.431q.337-2.185 2.01-3.61T12 5q2.502 0 4.251 1.749T18 11v1h.616q1.436.046 2.41 1.055T22 15.5q0 1.471-1.014 2.486Q19.97 19 18.5 19z"/></svg>`;
    cloud5.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 19q-1.871 0-3.185-1.306Q2 16.39 2 14.517q0-1.719 1.175-3.051t2.921-1.431q.337-2.185 2.01-3.61T12 5q2.502 0 4.251 1.749T18 11v1h.616q1.436.046 2.41 1.055T22 15.5q0 1.471-1.014 2.486Q19.97 19 18.5 19z"/></svg>`;
    mainContainer.appendChild(sun);
    clouds.appendChild(cloud1);
    clouds.appendChild(cloud2);
    clouds.appendChild(cloud3);
    clouds.appendChild(cloud4);
    clouds.appendChild(cloud5);
    mainContainer.appendChild(clouds);
    mainContainer.style.backgroundColor = "transparent";
    body.style.backgroundColor = "skyblue";
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
    roof.textContent = "LIFT SIMULATION";
    building.appendChild(roof);
    let floorContainer = document.createElement("div");
    floorContainer.classList.add("floor-container");

    for (i = floorCount; i > 0; i--) {
      floor = document.createElement("div");
      floor.classList.add("floor");
      floor.setAttribute("id", `floor-${i}`);
      let liftSystem = document.createElement("div");
      liftSystem.classList.add("lift-system");
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
      liftSystem.appendChild;
      // floor.appendChild(liftControls);
      floorContainer.appendChild(floor);
      building.appendChild(floorContainer);
      let liftContainer = document.createElement("div");
      liftContainer.classList.add("lift-container");

      if (i === 1) {
        for (j = 1; j <= liftCount; j++) {
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
      liftSystem.appendChild(liftControls);
      liftSystem.appendChild(liftContainer);
      floor.appendChild(liftSystem);
      wall.appendChild(window);
      floor.appendChild(wall);
    }
    let groundFloor = document.createElement("div");
    let bottom = document.createElement("div");
    bottom.classList.add("bottom");
    groundFloor.classList.add("ground-floor");
    let entrance = document.createElement("div");
    entrance.classList.add("entrance");
    let leftDoorEntrance = document.createElement("div");
    let rightDoorEntrance = document.createElement("div");
    leftDoorEntrance.classList.add("left-entrance-door");
    rightDoorEntrance.classList.add("right-entrance-door");
    entrance.appendChild(leftDoorEntrance);
    let entrySign = document.createElement("div");
    entrySign.classList.add("entry-sign");
    entrySign.textContent = "ENTRY";
    leftDoorEntrance.appendChild(entrySign);
    entrance.appendChild(rightDoorEntrance);
    groundFloor.appendChild(entrance);
    building.appendChild(groundFloor);
    building.appendChild(bottom);
    mainContainer.appendChild(building);
    road = document.createElement("div");
    road.classList.add("road");
    roadMarking = document.createElement("div");
    roadMarking.classList.add("road-marking-container");
    let roadMarking1 = document.createElement("div");
    roadMarking1.classList.add("road-marking");
    roadMarking.appendChild(roadMarking1);
    let roadMarking2 = document.createElement("div");
    roadMarking2.classList.add("road-marking");
    roadMarking.appendChild(roadMarking2);
    let roadMarking3 = document.createElement("div");
    roadMarking3.classList.add("road-marking");
    roadMarking.appendChild(roadMarking3);
    let roadMarking4 = document.createElement("div");
    roadMarking4.classList.add("road-marking");
    roadMarking.appendChild(roadMarking4);
    let roadMarking5 = document.createElement("div");
    roadMarking5.classList.add("road-marking");
    roadMarking.appendChild(roadMarking5);
    let roadMarking6 = document.createElement("div");
    roadMarking6.classList.add("road-marking");
    roadMarking.appendChild(roadMarking6);
    let roadMarking7 = document.createElement("div");
    roadMarking7.classList.add("road-marking");
    roadMarking.appendChild(roadMarking7);
    let roadMarking8 = document.createElement("div");
    roadMarking8.classList.add("road-marking");
    roadMarking.appendChild(roadMarking8);
    road.appendChild(roadMarking);
    mainContainer.appendChild(road);
    numberOFloors.value = "";
    numberOfLifts.value = "";
  }
}

backBtn.addEventListener("click", displayUserInputModal);
function displayUserInputModal() {
  building.innerHTML = "";
  clouds.style.display = "none";
  sun.style.display = "none";
  road.style.display = "none";
  mainContainer.style.backgroundColor = primaryColor;
  userInputModal.style.display = "flex";
  backBtn.style.display = "none";
  building.style.display = "none";
}
