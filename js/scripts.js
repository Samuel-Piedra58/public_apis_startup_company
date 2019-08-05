/*
    Treehouse Techdegree Project 05: Public API Requests
    @author: Samuel Piedra
    @created: 07/27/2019
    @github: https://github.com/Samuel-Piedra58/techdegree-project-05
*/

/*
    @ Script Description: This js script provides interactivity in the following ways:
      1. Generates 12 random users, via randomuser.me,  and displays their picture and info.
      2. Provides the functionality to display a single user in a modal window when that user's card is clicked.
      3. While displaying a user via the modal window you can toggle back and forth between all VISIBLE users.
      4. Dynamic search feature that filters visible cards on input based off of the given search term.
*/

// API URL ====================================

const usersUrl = "https://randomuser.me/api/?results=12&nat=us";

// FETCH HANDLER ====================================

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
}

// ADDITIONAL HANDLER FUNCTIONS ====================================

function generateGalleryCards(data) {
  // Function will create and display the cards with each user returned from randomuser response
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

function attachCardListener(data) {
  // attachs an event listener to all the cards to handle modal window operations if clicked
  const cards = Array.from(document.querySelectorAll("div.gallery .card"));

  cards.forEach((card, cardIndex, cards) => {
    // set data-id attribute for each card
    card.setAttribute("data-id", `${cardIndex}`);

    card.addEventListener("click", function() {
      // render the modal window when the card is clicked
      const modalWindow = openModalWindow();

      // dispaly the info of the employee card that was clicked
      modalWindow.info.innerHTML = buildModalCardInfo(data[cardIndex]);

      // attach event listener to modal window close button
      modalWindow.closeButton.addEventListener("click", closeModalWindow);

      // Capture only visible cards displayed and then catpure those cards "dataset id" values
      const visibleCardIds = cards
        .filter(card => {
          return card.style.display !== "none";
        })
        .map(card => {
          return card.dataset.id;
        });

      // variable will help maintain the state of the current index card displaying in the modal window
      // this state will help keep a reference for when we toggle to the previous and next employee
      let displayingCardIndex = visibleCardIds.indexOf(card.dataset.id);

      // attach event listener to modal window prev button
      modalWindow.prevButton.addEventListener("click", () => {
        if (displayingCardIndex - 1 >= 0) {
          displayingCardIndex -= 1;
          modalWindow.info.innerHTML = buildModalCardInfo(
            data[visibleCardIds[displayingCardIndex]]
          );
        }
      });

      // attach event listener to modal window next button
      modalWindow.nextButton.addEventListener("click", () => {
        if (displayingCardIndex + 1 < visibleCardIds.length) {
          displayingCardIndex += 1;
          modalWindow.info.innerHTML = buildModalCardInfo(
            data[visibleCardIds[displayingCardIndex]]
          );
        }
      });
    });
  });
}

// MODAL WINDOW HANDLERS ====================================

function openModalWindow() {
  // function will be called when a user clicks an employee card the function will
  // build a modal window and return an object representing the componenets of the modal window
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
    closeButton: document.querySelector("#modal-close-btn"),
    prevButton: document.querySelector("#modal-prev"),
    nextButton: document.querySelector("#modal-next")
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
    <p class="modal-text cap">
        ${employee.location.street},
        ${employee.location.city},
        ${employee.location.state}
        ${employee.location.postcode}
    </p>
    <p class="modal-text">Birthday: 
      ${new Date(employee.dob.date).toLocaleDateString()}
    </p>
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

// SEACH BAR HANDLERS ====================================

function handleSeachFeature() {
  // Function will add an event listener to dynamically filter
  // employee cards based off of applicable search characters
  const searchBar = displaySearchFeature();

  // Get the reference for all the cards displayed on the page
  const cards = Array.from(document.querySelectorAll("div.gallery .card"));

  searchBar.addEventListener("input", event => {
    const searchValue = event.target.value;
    const regex = new RegExp(searchValue, "i");

    cards.forEach(card => {
      const name = card.querySelector("#name").textContent;
      if (!regex.test(name)) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });
  });
}

function displaySearchFeature() {
  // Function will build the search feature and return an HTMLElement referring to the search input
  const searchContainer = document.querySelector(".search-container");
  const searchHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>
  `;
  searchContainer.innerHTML = searchHTML;
  return document.querySelector("#search-input");
}

// CUSTOM ERROR MESSAGE ====================================

function renderErrorMessage() {
  // If the promise from FETCH Api is rejected, this simple error message will display
  const gallery = document.getElementById("gallery");
  const errHTML = `
    <div id="error">
      <p>Oops! Looks like we had an issue loading this content!</p>
    </div>
  `;
  gallery.innerHTML = errHTML;
}

// WINDOW EVENT LISTENER ====================================

window.onload = function() {
  fetch(usersUrl)
    .then(handleResponse)
    .then(data => generateGalleryCards(data.results))
    .then(data => attachCardListener(data))
    .then(handleSeachFeature)
    .catch(error => {
      console.error(error);
      renderErrorMessage();
    });
};
