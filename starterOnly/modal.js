// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


//close btn element
const closeBtn = document.querySelector(".close");

//entry elements

const inputs = document.querySelectorAll(
  'input[type="text"],input[type="email"],input[type="date"],input[type="number"]'
);

const dateInput = document.getElementById("birthdate");

const cities = document.querySelectorAll('input[type="radio"]');
const citycheck = document.getElementById("citycheck");

const checkbox1 = document.querySelector("#checkbox1");
const conditions = document.getElementById("conditionscheck");

const checkbox2 = document.querySelector("#checkbox2");

const submit = document.querySelector(".content");

const thanksPage = document.getElementById("thankspage");

const closePageCross = document.getElementById("thanksclosecross");
const closePageButton = document.getElementById("thanksclosebutton");
let first,
  last,
  email,
  quantity,
  town,
  conditionAccepted,
  newsletter,
  birthdate;

//Function
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("#" + tag);
  const span = document.querySelector("#" + tag + " +span");
  if (!valid) {
    container.classList.add("error");
    span.classList.add("error-message");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const firstChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    errorDisplay(
      "first",
      "Veuillez entrer 2 caractères ou plus pour le prénom."
    );
    first = null;
  } else if (
    !value.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    errorDisplay("first", "Le prénom doit contenir des lettres uniquement.");
    first = null;
  } else {
    errorDisplay("first", "", true);
    first = value;
  }
};

const lastChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    errorDisplay("last", "Veuillez entrer 2 caractères ou plus pour le nom.");
    last = null;
  } else if (
    !value.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    errorDisplay("last", "Le nom doit contenir des lettres uniquement.");
    last = null;
  } else {
    errorDisplay("last", "", true);
    last = value;
  }
};

const emailChecker = (value) => {
  if (
    !value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    errorDisplay("email", "Le Mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const tournamentQuantityChecker = (value) => {
  if (!value.match(/^\d+$/)) {
    errorDisplay("quantity", "Vous devez entrer un nombre entier");
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = value;
  }
};
const birthdateCheker = (value) => {
  let date = new Date(value);

  if (date instanceof Date && value.length === 10) {
    errorDisplay("birthdate", "", true);
    birthdate = value;
  } else {
    errorDisplay("birthdate", "Veuilez completer votre date de naissance");
    birthdate = null;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstChecker(e.target.value);
        break;
      case "last":
        lastChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "quantity":
        tournamentQuantityChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

dateInput.addEventListener("focusout", (e) => {
  birthdateCheker(e.target.value);
});
cities.forEach((city) => {
  city.addEventListener("input", (e) => {
    let cityValue;
    if (city.checked) {
      cityValue = city.value;
    }
    if (cityValue) {
      citycheck.classList.add("display");
      town = e.target.value;
    }
  });
});

checkbox1.addEventListener("input", (e) => {
  if (checkbox1.checked) {
    conditionAccepted = checkbox1.value;
  } else {
    conditionAccepted = null;
  }
  if (conditionAccepted) {
    conditionAccepted = e.target.value;
    conditions.classList.add("display");
  }
});

checkbox2.addEventListener("input", () => {
  if (checkbox2.checked) {
    newsletter = true;
  }
});

submit.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!first) {
    errorDisplay("first", "Veuillez completer ce champ");
  }
  if (!last) {
    errorDisplay("last", "Veuillez completer ce champ");
  }
  if (!email) {
    errorDisplay("email", "Veuillez completer ce champ");
  }
  if (!quantity) {
    errorDisplay("quantity", "Veuillez completer ce champ");
  }
  if (!birthdate) {
    errorDisplay("birthdate", "Veuillez completer ce champ");
  }
  if (!town) {
    citycheck.classList.remove("display");
  }
  if (!conditionAccepted) {
    conditions.classList.remove("display");
  }
  if (
    first &&
    last &&
    email &&
    quantity &&
    town &&
    conditionAccepted &&
    birthdate
  ) {
    const data = {
      first: first,
      last: last,
      email: email,
      quantity: quantity,
      town: town,
      conditionAccepted: conditionAccepted,
      newsletter: newsletter,
      birthdate: birthdate,
    };

    thanksPage.style.display = "block";
    modalbg.style.display = "none";

    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    cities.forEach((city) => (city.checked = false));
    checkbox1.checked = false;
    checkbox2.checked = false;
    first = null;
    last = null;
    email = null;
    quantity = null;
    town = null;
    conditionAccepted = null;
    newsletter = null;
    birthdate = null;

    modalBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        thanksPage.style.display = "block";
        modalbg.style.display = "none";
      })
    );
  }
});

// close modal event
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});
// close thanks modal

closePageButton.addEventListener("click", () => {
  thanksPage.style.display = "none";
});

closePageCross.addEventListener("click", () => {
  thanksPage.style.display = "none";
});
//End of work
