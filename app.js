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
let building;

let floor;
let clouds;
let sun;
let road;
let roadMarking;
let liftsArray = [];
let pendingRequests = [];

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
  } else if (floorCount < 2) {
    toastContainer.style.display = "flex";
    toastMessage.innerHTML = "Floor count should be atleast 2";
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
    mainContainer.style.backgroundColor = "skyblue";
    userInputModal.style.display = "none";
    backBtn.style.display = "block";
    backBtn.classList.add("btn", "btn-floating", "btn-primary", "backBtn");
    backBtn.title = "Go Back";
    backBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z"/></svg>`;
    mainContainer.appendChild(backBtn);
    building = document.createElement("div");
    building.classList.add("building-container");
    let roof = document.createElement("div");
    roof.classList.add("roof");
    roof.textContent = "LIFT SIMULATION";
    building.appendChild(roof);
    let floorContainer = document.createElement("div");
    floorContainer.classList.add("floor-container");

    for (let i = floorCount; i > 0; i--) {
      floor = document.createElement("div");
      floor.classList.add("floor");
      floor.setAttribute("id", `floor-${i}`);
      let liftSystem = document.createElement("div");
      liftSystem.classList.add("lift-system");
      let liftControls = document.createElement("div");
      liftControls.classList.add("lift-controls");
      let btnUp = document.createElement("button");
      btnUp.classList.add("btn-up");
      btnUp.setAttribute("id", `btnUp-${i}`);
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
      btnUp.addEventListener("click", () => {
        let floorNumber = i;
        moveLiftToFloor(floorNumber);
      });
      let floorTitle = document.createElement("div");
      floorTitle.classList.add("floor-number");
      floorTitle.textContent = `Floor ${i}`;
      let btnDown = document.createElement("button");
      btnDown.setAttribute("id", `btnDown-${i}`);
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

      btnDown.addEventListener("click", () => {
        let floorNumber = i;
        moveLiftToFloor(floorNumber);
      });

      liftControls.appendChild(btnUp);
      liftControls.appendChild(floorTitle);
      liftControls.appendChild(btnDown);
      let liftContainer = document.createElement("div");
      liftContainer.classList.add("lift-container");
      liftSystem.appendChild(liftControls);

      if (i === 1) {
        for (j = 1; j <= liftCount; j++) {
          let lift = document.createElement("div");
          lift.classList.add("lift");
          lift.setAttribute("data-currentfloor", "1");
          lift.setAttribute("data-state", "free");
          let leftDoor = document.createElement("div");
          leftDoor.classList.add("left-door");
          let rightDoor = document.createElement("div");
          rightDoor.classList.add("right-door");
          lift.appendChild(leftDoor);
          lift.appendChild(rightDoor);
          liftContainer.appendChild(lift);
          floor.appendChild(liftContainer);
          liftsArray.push(lift);
          liftSystem.appendChild(liftContainer);
        }
      }
      floor.appendChild(liftSystem);
      let wall = document.createElement("div");
      wall.classList.add("wall");
      let window = document.createElement("div");
      window.classList.add("window");
      window.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M11 11V3H5c-1.1 0-2 .9-2 2v6zm2 0h8V5c0-1.1-.9-2-2-2h-6zm-2 2H3v6c0 1.1.9 2 2 2h6zm2 0v8h6c1.1 0 2-.9 2-2v-6z"/></svg>`;
      wall.appendChild(window);
      floor.appendChild(wall);
      floorContainer.appendChild(floor);
    }
    building.appendChild(floorContainer);
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
    for (let i = 1; i <= 8; i++) {
      let roadMarking1 = document.createElement("div");
      roadMarking1.classList.add("road-marking");
      roadMarking.appendChild(roadMarking1);
    }
    road.appendChild(roadMarking);
    mainContainer.appendChild(road);
    numberOFloors.value = "";
    numberOfLifts.value = "";
  }
}

function moveLiftToFloor(targetFloor) {
  let clickedUpBtn = document.getElementById(`btnUp-${targetFloor}`);
  let clickedDownBtn = document.getElementById(`btnDown-${targetFloor}`);
  clickedUpBtn.disabled = true;
  clickedDownBtn.disabled = true;
  if (clickedUpBtn.disabled === true && clickedDownBtn.disabled === true) {
    clickedUpBtn.style.borderColor = "red";
    clickedDownBtn.style.borderColor = "red";
    clickedUpBtn.addEventListener("mouseenter", () => {
      clickedUpBtn.style.borderColor = "red";
    });
    clickedUpBtn.addEventListener("mouseleave", () => {
      clickedUpBtn.style.borderColor = "red";
    });
    clickedDownBtn.addEventListener("mouseenter", () => {
      clickedDownBtn.style.borderColor = "red";
    });
    clickedDownBtn.addEventListener("mouseleave", () => {
      clickedDownBtn.style.borderColor = "red";
    });
  }

  let freeLiftOnTargetFloor = liftsArray.find((lift) => {
    return (
      Number(lift.getAttribute("data-currentfloor")) === targetFloor &&
      lift.getAttribute("data-state") === "free"
    );
  });

  if (freeLiftOnTargetFloor) {
    let leftDoor = freeLiftOnTargetFloor.childNodes[0];
    let rightDoor = freeLiftOnTargetFloor.childNodes[1];
    freeLiftOnTargetFloor.setAttribute("data-state", "busy");
    openDoor(leftDoor, rightDoor);
    setTimeout(() => {
      closeDoor(leftDoor, rightDoor);
      setTimeout(() => {
        clickedUpBtn.disabled = false;
        clickedDownBtn.disabled = false;

        if (
          clickedUpBtn.disabled === false &&
          clickedDownBtn.disabled === false
        ) {
          clickedUpBtn.style.borderColor = "black";
          clickedDownBtn.style.borderColor = "black";
          clickedUpBtn.style.boxShadow = `inset 0px 0px 2px 1px gray, inset 0px -3px 4px rgba(0, 0, 0, 0.3),
            inset 0px 3px 4px rgba(255, 255, 255, 0.6), 0px -2px 3px rgba(0, 0, 0, 0.6),
            0px 1px 2px rgba(255, 255, 255, 0.7), 0px 0px 1px 1px black,
            0px 0px 0px 5px gray, 0px 0px 1px 6px black`;
          clickedDownBtn.style.boxShadow = `inset 0px 0px 2px 1px gray, inset 0px -3px 4px rgba(0, 0, 0, 0.3),
            inset 0px 3px 4px rgba(255, 255, 255, 0.6), 0px -2px 3px rgba(0, 0, 0, 0.6),
            0px 1px 2px rgba(255, 255, 255, 0.7), 0px 0px 1px 1px black,
            0px 0px 0px 5px gray, 0px 0px 1px 6px black`;
          clickedUpBtn.addEventListener("mouseenter", () => {
            clickedUpBtn.style.borderColor = "lime";
          });
          clickedUpBtn.addEventListener("mouseleave", () => {
            clickedUpBtn.style.borderColor = "black";
          });
          clickedDownBtn.addEventListener("mouseenter", () => {
            clickedDownBtn.style.borderColor = "lime";
          });
          clickedDownBtn.addEventListener("mouseleave", () => {
            clickedDownBtn.style.borderColor = "black";
          });
        }
        freeLiftOnTargetFloor.setAttribute("data-state", "free");
        if (pendingRequests.length > 0) {
          moveLiftToFloor(pendingRequests[0]);
          pendingRequests.shift();
        }
      }, 1000);
    }, 1000);
  } else if (
    freeLiftOnTargetFloor === undefined &&
    !liftsArray.find((lift) => {
      return lift.getAttribute("data-state") === "free";
    })
  ) {
    pendingRequests.push(targetFloor);
  } else if (freeLiftOnTargetFloor === undefined) {
    function findNearestLift() {
      let freeLiftsArray = liftsArray.filter(
        (lift) => lift.getAttribute("data-state") === "free"
      );
      let closestLift = freeLiftsArray.find((lift) => {
        return lift.getAttribute("data-state") === "free";
      });
      let assumedClosestFloorValue;
      assumedClosestFloorValue = Math.abs(
        targetFloor - closestLift.getAttribute("data-currentfloor")
      );
      freeLiftsArray.forEach((lift) => {
        let currentFloorValue = lift.getAttribute("data-currentfloor");
        let difference = Math.abs(targetFloor - currentFloorValue);
        if (difference < assumedClosestFloorValue) {
          assumedClosestFloorValue = difference;
          closestLift = lift;
        }
      });
      return closestLift;
    }

    let firstFreeLift = findNearestLift();
    let currentFloor = firstFreeLift.getAttribute("data-currentfloor");
    distanceToMove = -((targetFloor - 1) * 150);
    firstFreeLift.style.transform = `translateY(${distanceToMove}px)`;
    firstFreeLift.style.transitionDuration = `${
      Math.abs(targetFloor - currentFloor) * 1.5
    }s`;
    firstFreeLift.setAttribute("data-state", "busy");
    setTimeout(() => {
      firstFreeLift.setAttribute("data-currentfloor", `${targetFloor}`);
      let leftDoor = firstFreeLift.childNodes[0];
      let rightDoor = firstFreeLift.childNodes[1];

      openDoor(leftDoor, rightDoor);
      setTimeout(() => {
        closeDoor(leftDoor, rightDoor);
        setTimeout(() => {
          clickedUpBtn.disabled = false;
          clickedDownBtn.disabled = false;

          if (
            clickedUpBtn.disabled === false &&
            clickedDownBtn.disabled === false
          ) {
            clickedUpBtn.style.borderColor = "black";
            clickedDownBtn.style.borderColor = "black";
            clickedUpBtn.style.boxShadow = `inset 0px 0px 2px 1px gray, inset 0px -3px 4px rgba(0, 0, 0, 0.3),
            inset 0px 3px 4px rgba(255, 255, 255, 0.6), 0px -2px 3px rgba(0, 0, 0, 0.6),
            0px 1px 2px rgba(255, 255, 255, 0.7), 0px 0px 1px 1px black,
            0px 0px 0px 5px gray, 0px 0px 1px 6px black`;
            clickedDownBtn.style.boxShadow = `inset 0px 0px 2px 1px gray, inset 0px -3px 4px rgba(0, 0, 0, 0.3),
            inset 0px 3px 4px rgba(255, 255, 255, 0.6), 0px -2px 3px rgba(0, 0, 0, 0.6),
            0px 1px 2px rgba(255, 255, 255, 0.7), 0px 0px 1px 1px black,
            0px 0px 0px 5px gray, 0px 0px 1px 6px black`;
            clickedUpBtn.addEventListener("mouseenter", () => {
              clickedUpBtn.style.borderColor = "lime";
            });
            clickedUpBtn.addEventListener("mouseleave", () => {
              clickedUpBtn.style.borderColor = "black";
            });
            clickedDownBtn.addEventListener("mouseenter", () => {
              clickedDownBtn.style.borderColor = "lime";
            });
            clickedDownBtn.addEventListener("mouseleave", () => {
              clickedDownBtn.style.borderColor = "black";
            });
          }

          firstFreeLift.setAttribute("data-state", "free");
          if (pendingRequests.length > 0) {
            moveLiftToFloor(pendingRequests[0]);
            pendingRequests.shift();
          }
        }, 1000);
      }, 1000);
    }, `${Math.abs(targetFloor - currentFloor) * 1.5 * 1000}`);
  }
}

function openDoor(leftDoor, rightDoor) {
  leftDoor.style.transform = `translateX(-50px)`;
  leftDoor.style.transitionDuration = `${1}s`;
  rightDoor.style.transform = `translateX(50px)`;
  rightDoor.style.transitionDuration = `${1}s`;
}

function closeDoor(leftDoor, rightDoor) {
  leftDoor.style.transform = `translateX(0px)`;
  leftDoor.style.transitionDuration = `${1}s`;
  rightDoor.style.transform = `translateX(0px)`;
  rightDoor.style.transitionDuration = `${1}s`;
}

backBtn.addEventListener("click", displayUserInputModal);
function displayUserInputModal() {
  liftsArray = [];
  if (building) {
    let removeBuilding = mainContainer.removeChild(building);
  }
  clouds.style.display = "none";
  sun.style.display = "none";
  road.style.display = "none";
  mainContainer.style.backgroundColor = primaryColor;
  userInputModal.style.display = "flex";
  backBtn.style.display = "none";
}
