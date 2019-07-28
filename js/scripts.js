/*
    Treehouse Techdegree Project 05: Public API Requests
    @author: Samuel Piedra
    @created: 07/27/2019
    @github: 
    
    @purpose: project will dynamically update the index.html file with 12 random "employees"
                and display the following information for each "employee":
                (1) image
                (2) first and last name
                (3) email
                (4) city or location
             project will also allow the user to select a single "employee" and display a modal window
            containing the following information:
                (1) image
                (2) name
                (3) email
                (4) city or location
                (5) cell number
                (6) detailed address
                (7) birthday
*/

// GLOBAL VARIABLES ==============================

const usersUrl = "https://randomuser.me/api/?results=12&nat=us";

// FETCH FUNCTIONS ==============================

function getDataFromServer(url) {
  return fetch(url).then(response => response.json());
}

// HANDLER FUNCTIONS ==============================

function generateGalleryCards(data) {
  const gallery = document.getElementById("gallery");
  const people = data
    .map(person => {
      return `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="
                    ${person.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">
                        ${person.name.first} ${person.name.last}
                    </h3>
                    <p class="card-text">
                        ${person.email}
                    </p>
                    <p class="card-text cap">
                        ${person.location.city}, ${person.location.state}
                    </p>
                </div>
            </div>`;
    })
    .join("");
  gallery.innerHTML = people;
  return data;
}

function attachEventListener(data) {
  // attach an event listener to all the cards
  const cards = Array.from(document.querySelectorAll("div.gallery .card"));
  cards.forEach((card, cardIndex, cards) => {
    card.addEventListener("click", () => {
      // set value for card index currently displayed in the modal...
      // this value will decrement by 1 when the "prev" button is clicked
      // and increment by 1 when the next card is clicked
      let cardIndexDisplayed = cardIndex;
      // render the modal window
      const modalWindow = openModalWindow();

      // dispaly the info of the employee card that was clicked
      modalWindow.info.innerHTML = buildModalCardInfo(data[cardIndex]);

      // attach event listener to modal window close button
      modalWindow.close.addEventListener("click", closeModalWindow);

      // attach event listener to modal window prev button
      modalWindow.prev.addEventListener("click", () => {
        if (cardIndexDisplayed > 0) {
          cardIndexDisplayed -= 1;
          modalWindow.info.innerHTML = buildModalCardInfo(
            data[cardIndexDisplayed]
          );
        }
      });

      // attach event listener to modal window prev button
      modalWindow.next.addEventListener("click", () => {
        if (cardIndexDisplayed < cards.length - 1) {
          cardIndexDisplayed += 1;
          modalWindow.info.innerHTML = buildModalCardInfo(
            data[cardIndexDisplayed]
          );
        }
      });
    });
  });
}

function openModalWindow() {
  // function will be called when a user clicks an employee card
  // the function will build a modal window and return an object
  // the object represents all of the elements in the modal window
  // we will want to interact with later
  const modalWindow = getModalWindow();
  const modalHTML = `
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn">
            <strong>X</strong>
          </button>
          <div class="modal-info-container"></div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  `;
  modalWindow.innerHTML = modalHTML;

  return {
    info: document.querySelector(".modal-info-container"),
    close: document.querySelector("#modal-close-btn"),
    prev: document.querySelector("#modal-prev"),
    next: document.querySelector("#modal-next")
  };
}

function getModalWindow() {
  // function will check for a modal window in the page.
  // a modal window will either be created and rendered or rendered
  // function will return the modal window
  const gallery = document.getElementById("gallery");
  let modalWindow = document.querySelector("div.modal-container");

  if (modalWindow === null) {
    modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-container");
    gallery.parentNode.insertBefore(modalWindow, gallery.nextSibling);
  }
  return modalWindow;
}

function buildModalCardInfo(employee) {
  // return the unique html content that will update the modal window info section
  return `
    <img class="modal-img" src="
      ${employee.picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">
        ${employee.name.first} ${employee.name.last}
    </h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text cap">${employee.location.city}</p>
    <hr>
    <p class="modal-text">${employee.phone}</p>
    <p class="modal-text">
        ${employee.location.street},
        ${employee.location.city},
        ${employee.location.state}
        ${employee.location.postcode}
    </p>
    <p class="modal-text">Birthday: ${employee.dob.date}</p>
    `;
}

function closeModalWindow(event) {
  // function is called when the modal window "close" button is clicked"
  // check for the appropriate element that was clicked and then remove the modal div accordingly
  if (event.target.tagName == "STRONG") {
    event.target.parentNode.parentNode.parentNode.remove();
  } else if (event.target.tagName == "BUTTON") {
    event.target.parentNode.parentNode.remove();
  }
}

// EVENT LISTENERS ==============================

window.onload = function() {
  getDataFromServer(usersUrl)
    .then(data => generateGalleryCards(data.results))
    .then(data => attachEventListener(data));
};

//TODO's
//   (1) Insert the search feature and dynamically search through cards
//   (2) How do we filter the cards for the matching results?
//        -Remove the cards?
//        -Sort the cards?
