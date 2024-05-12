let tabledata = [
  { name: `Black Panther`, strength: 66, age: 53 },
  { name: `Captain America`, strength: 79, age: 137 },
  { name: `Captain Marvel`, strength: 97, age: 26 },
  { name: `Hulk`, strength: 80, age: 49 },
  { name: `Iron Man`, strength: 88, age: 48 },
  { name: `Spider-Man`, strength: 78, age: 16 },
  { name: `Thanos`, strength: 99, age: 1000 },
  { name: `Thor`, strength: 95, age: 1000 },
  { name: `Yon-Rogg`, strength: 73, age: 52 },
];

let sorting = {
  sortBy: "",
  order: "",
};

let notification = document.querySelector("#notification");
notification.textContent = "Sorting by Name, order: ASC";

function createTable() {
  let placeholder = document.getElementById("placeholder");
  placeholder.innerHTML = ""; // Clear previous content
  let table = document.createElement("table");
  let head = ["name", "strength", "age"]; // Updated to lowercase for consistency
  let header = document.createElement("tr");

  for (let i = 0; i < head.length; i++) {
    let item = document.createElement("th");
    item.textContent = head[i].charAt(0).toUpperCase() + head[i].slice(1); // Capitalize first letter
    item.setAttribute("onclick", `sortBy('${head[i]}')`);
    header.appendChild(item);
  }

  table.appendChild(header);

  for (let i = 0; i < tabledata.length; i++) {
    let row = document.createElement("tr");
    let keys = Object.keys(tabledata[i]);

    for (let j = 0; j < keys.length; j++) {
      let item = document.createElement("td");
      item.textContent = tabledata[i][keys[j]];
      row.appendChild(item);
    }

    table.appendChild(row);
  }

  placeholder.appendChild(table);
}

function sortBy(column) {
  if (sorting.sortBy === column) {
    sorting.order = sorting.order === "ASC" ? "DESC" : "ASC";
  } else {
    sorting.sortBy = column;
    sorting.order = "ASC";
  }

  tabledata.sort((a, b) => {
    const valA =
      typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
    const valB =
      typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

    if (sorting.order === "ASC") {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });

  notification.textContent = `Sorting by ${capitalizeFirstLetter(
    column
  )}, order: ${sorting.order}`;
  createTable();
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

createTable();
