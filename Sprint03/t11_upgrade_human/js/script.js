class Human {
  constructor(options) {
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.gender = options.gender;
    this.age = options.age;
    this.calories = options.calories;
    this.hero = false;
  }

  sleepFor() {
    document.querySelector("#info").innerHTML = "I'm sleeping";
  }

  feed() {
    document.querySelector("#info").innerHTML = "Nom nom nom";
  }
}

class Superhero extends Human {
  fly() {
    document.querySelector("#info").innerHTML = `I'm flying`;
  }

  fight() {
    document.querySelector("#info").innerHTML =
      "Khhhh-chh..." + "Bang-g-g-g... Evil is defeated!";
  }
}

let human = new Human({
  firstName: setFirstName(),
  lastName: setLastName(),
  gender: setGender(),
  age: setAge(),
  calories: setCalories(600),
  hero: false,
});
let superhero = new Superhero(human);

document.querySelector("#fly").disabled = true;
document.querySelector("#fight").disabled = true;

function updateCaloriesAndHunger() {
  if (isHuman()) {
    if (human.calories > 0) {
      human.calories -= 200;
      setCalories(human.calories);
    }
    if (human.calories < 500) {
      document.querySelector("#turnSuperhero").disabled = true;
      document.querySelector("#info").innerHTML = "I'm still hungry";
    } else {
      document.querySelector("#turnSuperhero").disabled = false;
    }
  } else {
    if (superhero.calories > 0) {
      superhero.calories -= 200;
      setCalories(superhero.calories);
    }
    if (superhero.calories < 500) {
      document.querySelector("#info").innerHTML = "I'm still hungry";
    }
  }
}

setInterval(updateCaloriesAndHunger, 5000);

function feed() {
  if (isHuman()) {
    if (human.calories < 500) {
      document.body.style.backgroundImage =
        "url('https://ugc.futurelearn.com/uploads/images/dd/f6/header_ddf6b560-c986-42d7-af3b-04d3dc0b272e.jpg')";
      human.feed();
      disableHumanActivities();
      setTimeout(() => {
        human.calories += 1000;
        setCalories(human.calories);
        document.querySelector("#info").innerHTML = "I'm human";
        enableHumanActivities();
        changeBackgroundToDefault();
      }, 10000);
    } else {
      document.querySelector("#info").innerHTML = "I am not hungry";
    }
  } else {
    if (superhero.calories < 500) {
      document.body.style.backgroundImage =
        "url('https://ugc.futurelearn.com/uploads/images/dd/f6/header_ddf6b560-c986-42d7-af3b-04d3dc0b272e.jpg')";
      superhero.feed();
      disableSuperheroActivities();
      setTimeout(() => {
        superhero.calories += 1000;
        setCalories(superhero.calories);
        enableSuperheroActivities();
        changeBackgroundToDefault();
      }, 10000);
    } else {
      document.querySelector("#info").innerHTML = "I am not hungry";
    }
  }
}

function sleep() {
  document.body.style.backgroundImage =
    "url('https://www.usnews.com/object/image/00000186-7512-d40d-a596-7537abab0000/coverimage.png')";
  if (isHuman()) {
    disableHumanActivities();
    human.sleepFor();
    setTimeout(() => {
      document.querySelector("#info").innerHTML = "I'm awake now";
      setTimeout(() => {
        document.querySelector("#info").innerHTML = "I'm human";
        enableHumanActivities();
        changeBackgroundToDefault();
      }, 2000);
    }, 10000);
  } else {
    disableSuperheroActivities();
    human.sleepFor();
    setTimeout(() => {
      document.querySelector("#info").innerHTML = "I'm awake now";
      setTimeout(() => {
        document.querySelector("#info").innerHTML = "I'm Superhero";
        enableSuperheroActivities();
        changeBackgroundToDefault();
      }, 2000);
    }, 10000);
  }
}

function turnIntoSuperhero() {
  if (human.calories >= 500) {
    // Update displayed properties and methods
    document.querySelector("#info").innerHTML = "I'm Superhero";
    document.querySelector("#turnSuperhero").disabled = true;

    enableSuperheroActivities();
  } else {
    alert("Can't turn into Superhero, not enough calories!");
  }
}

function fly() {
  document.body.style.backgroundImage =
    "url('https://as2.ftcdn.net/v2/jpg/00/83/56/17/1000_F_83561700_kNNzo97sxZcndSNE84vGTHppSBRAKb5u.jpg')";
  superhero.fly();
  disableSuperheroActivities();
  setTimeout(() => {
    document.querySelector("#info").innerHTML = "I'm Superhero";
    enableSuperheroActivities();
    changeBackgroundToDefault();
  }, 10000);
}

function fight() {
  document.body.style.backgroundImage =
    "url('https://www.telegraph.co.uk/multimedia/archive/02510/Knight-Warrior-_2510327b.jpg')";
  superhero.fight();
  disableSuperheroActivities();
  setTimeout(() => {
    document.querySelector("#info").innerHTML = "I'm Superhero";
    enableSuperheroActivities();
    changeBackgroundToDefault();
  }, 10000);
}

function setFirstName(name) {
  let firstName = document.getElementById("firstName");
  if (name == undefined) {
    while (firstName.innerText == "" || firstName.innerText == null) {
      firstName.innerText = prompt("Enter the name of your hero?", "");
      const regex = RegExp("^[a-zA-Z]+$");
      if (firstName.innerText.length > 20 || !regex.test(firstName.innerText)) {
        alert(
          "Accepts only one word, which consists only of Latin letters and its length does not exceed 20 characters."
        );
        firstName.innerText = null;
      }
    }
  } else {
    firstName.innerText = name;
  }
  return firstName.innerText;
}

function setLastName(name) {
  let lastName = document.getElementById("lastName");
  if (name == undefined) {
    while (lastName.innerText == "" || lastName.innerText == null) {
      lastName.innerText = prompt("Enter the last name of your hero?", "");
      const regex = RegExp("^[a-zA-Z]+$");
      if (lastName.innerTextlength > 20 || !regex.test(lastName.innerText)) {
        alert(
          "Accepts only one word, which consists only of Latin letters and its length does not exceed 20 characters."
        );
        lastName.innerText = null;
      }
    }
  } else {
    lastName.innerText = name;
  }
  return lastName.innerText;
}

function setGender() {
  let gender = document.getElementById("gender");
  while (gender.innerText == "" || gender.innerText == null) {
    gender.innerText = prompt("Enter gender (male or female)?", "");
    const regex = RegExp("^male$|^female$|^$", "i");
    if (!regex.test(gender.innerText)) {
      alert("Accepts only male or female gender!");
      gender.innerText = null;
    }
  }
  return gender.innerText;
}

function setAge() {
  let age = document.getElementById("age");
  while (age.innerText == "" || age.innerText == null) {
    age.innerText = prompt("Enter the age of your hero?", "");
    const regex = RegExp(/^[1-9]|[0-9]{0,4}$/);
    if (age.innerText.length > 3 || !regex.test(age.innerText)) {
      alert(
        "Accepts only digits, cannot start with a zero, no more than 3 characters!"
      );
      age.innerText = null;
    }
  }
  return age.innerText;
}

function setCalories(calories) {
  let data = document.getElementById("calories");
  data.innerText = calories;
  return data.innerText;
}

function isHuman() {
  return superhero.hero == false;
}

function disableHumanActivities() {
  document.querySelector("#feed").disabled = true;
  document.querySelector("#sleep").disabled = true;
}
function enableHumanActivities() {
  document.querySelector("#feed").disabled = false;
  document.querySelector("#sleep").disabled = false;
}

function disableSuperheroActivities() {
  disableHumanActivities();
  document.querySelector("#fly").disabled = true;
  document.querySelector("#fight").disabled = true;
}
function enableSuperheroActivities() {
  enableHumanActivities();
  document.querySelector("#fly").disabled = false;
  document.querySelector("#fight").disabled = false;
}

function changeBackgroundToDefault() {
  document.body.style.backgroundImage =
    "url('https://www.thespruce.com/thmb/VJXTTBjliNANi0rNwjnQIGmvgYc=/2500x0/filters:no_upscale():max_bytes(150000):strip_icc()/40.UptownTownhousebyChangoCo-RecreationRoomSeatingArea-7603584a62a54f69a7f10a0ce621c0ca-d474eb2c1c5c43de80802f9aa4846a47.jpg')";
}
