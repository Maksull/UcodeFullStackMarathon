// SET
const guestList = new Set();

guestList.add("Test1");
guestList.add("Second");
guestList.add("Three");
guestList.add("Chvert");

if (guestList.has("Already")) {
  console.log("Name already exist!");
} else {
  console.log("Name added!");
  guestList.add("Already");
}

console.log(guestList);
console.log(guestList.size);

if (!guestList.has("Smert")) {
  console.log("User does not exist");
} else {
  console.log("User deleted");
  guestList.delete("Already");
}
guestList.clear();
console.log(guestList);

// MAP
const menu = new Map([
  ["First", "150 uah"],
  ["Second", "110 uah"],
]);

menu.set("Third", "30 uah");
menu.set("Fourth", "40 uah");
menu.set("Fifth", "50 uah");
menu.set("Sixth", "60 uah");
menu.set("Seventh", "70 uah");
console.log(menu);

// WEAK SET
const bankVault = new WeakSet();

let user1 = {
  safe1: {
    cell: "1150",
    password: "Secret123$",
    messages: [{ text: "Hola", from: "user2" }],
  },
};

let user2 = {
  safe2: {
    cell: "1200",
    password: "Secret12#$",
    messages: [{ text: "HALLO", from: "user1" }],
  },
};

let user3 = {
  safe3: {
    cell: "1250",
    password: "Secret1@#$",
    messages: [
      { text: "HALLO", from: "user1" },
      { text: "Hola", from: "user2" },
      { text: "Pryvit", from: "user3" },
    ],
  },
};

bankVault.add(user1);
bankVault.add(user2);
bankVault.add(user3);
console.log(bankVault);

// WEAK MAP
const coinCollection = new WeakMap();

// Creating coin objects
let coin1 = {};
let coin2 = {};
let coin3 = {};
let coin4 = {};
let coin5 = {};

// Adding information to the coins using the WeakMap
coinCollection.set(coin1, { denomination: "quarter", year: 1999 });
coinCollection.set(coin2, { denomination: "dime", year: 2005 });
coinCollection.set(coin3, { denomination: "nickel", year: 2010 });
coinCollection.set(coin4, { denomination: "penny", year: 2000 });
coinCollection.set(coin5, { denomination: "half dollar", year: 1980 });

console.log(coinCollection);
