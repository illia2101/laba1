import { randomUserMock, additionalUsers } from "./FE4U-Lab2-mock (1).js";
const courses = [
  "Mathematics",
  "Physics",
  "English",
  "Computer Science",
  "Dancing",
  "Chess",
  "Biology",
  "Chemistry",
  "Law",
  "Art",
  "Medicine",
  "Statistics",
];

function formatUsers(users) {
  return users.map((user, index) => {
    const fullName = `${user.name.first} ${user.name.last}`;
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];

    return {
      gender: user.gender,
      title: user.name.title,
      full_name: fullName,

      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      postcode: user.location.postcode,
      coordinates: user.location.coordinates,
      timezone: user.location.timezone,

      email: user.email,
      b_date: user.dob.date,
      age: user.dob.age,
      phone: user.phone,

      picture_large: user.picture.large,
      picture_thumbnail: user.picture.thumbnail,
      id: index + 1,
      favorite: false,
      course: randomCourse,
      bg_color: "#ffffff",
      note: "",
    };
  });
}
function formatAdditionalUsers(users) {
  return users.map((user) => {
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    return {
      gender: user.gender,
      title: user.title,
      full_name: user.full_name,
      city: user.city,
      state: user.state,
      country: user.country,
      postcode: user.postcode,
      coordinates: user.coordinates,
      timezone: user.timezone,
      email: user.email,
      b_date: user.b_day,
      age: user.age,
      phone: user.phone,
      picture_large: user.picture_large,
      picture_thumbnail: user.picture_thumbnail,
      id: user.id,
      favorite: user.favorite ?? false,
      course: user.course ?? randomCourse,
      bg_color: user.bg_color ?? "#ffffff",
      note: user.note ?? "",
    };
  });
}
function validateUsers(users) {
  const checkElements = users.every((user) => {
    return (
      typeof user.gender === "string" &&
      typeof user.full_name === "string" &&
      user.full_name.length > 0 &&
      user.full_name[0] === user.full_name[0].toUpperCase() &&
      typeof user.note === "string" &&
      typeof user.state === "string" &&
      user.state.length > 0 &&
      user.state[0] === user.state[0].toUpperCase() &&
      typeof user.city === "string" &&
      user.city.length > 0 &&
      user.city[0] === user.city[0].toUpperCase() &&
      typeof user.country === "string" &&
      user.country.length > 0 &&
      user.country[0] === user.country[0].toUpperCase() &&
      typeof user.age === "number" &&
      typeof user.phone === "string" &&
      typeof user.email === "string" &&
      user.email.includes("@")
    );
  });

  return checkElements;
}
function filterUsers(users, country, age, gender, favorite) {
  return users.filter((user) => {
    const countryMatch = country ? user.country === country : true;
    const ageMatch = age !== undefined ? user.age === age : true;
    const genderMatch = gender ? user.gender === gender : true;
    const favoriteMatch =
      favorite !== undefined ? user.favorite === favorite : true;
    return countryMatch && ageMatch && genderMatch && favoriteMatch;
  });
}
function sortUsers(users, field, order) {
  return [...users].sort((a, b) => {
    if (a[field] === b[field]) {
      return 0;
    }

    if (order === "asc") {
      return a[field] > b[field] ? 1 : -1;
    } else {
      return a[field] < b[field] ? 1 : -1;
    }
  });
}
function searchUsers(users, searchValue) {
  const search = searchValue.toString().toLowerCase();

  return users.find((user) => {
    return (
      user.full_name.toLowerCase().includes(search) ||
      user.note.toLowerCase().includes(search) ||
      (user.age !== undefined && user.age.toString().includes(search))
    );
  });
}
function percentOfUsers(users, age) {
  const totalUsers = users.length;
  const usersWithAge = users.filter((user) => user.age > age).length;
  return (usersWithAge / totalUsers) * 100;
}

const formattedUsers = formatUsers(randomUserMock);
const formattedAdditionalUsers = formatAdditionalUsers(additionalUsers);
const allUsers = [...formattedUsers, ...formattedAdditionalUsers];
const uniqueUsers = allUsers.filter((user, index, array) => {
  return index === array.findIndex((item) => item.full_name === user.full_name);
});

uniqueUsers.forEach((user) => {
  if (
    typeof user.gender !== "string" ||
    typeof user.full_name !== "string" ||
    user.full_name.length === 0 ||
    user.full_name[0] !== user.full_name[0].toUpperCase() ||
    typeof user.note !== "string" ||
    typeof user.state !== "string" ||
    user.state.length === 0 ||
    user.state[0] !== user.state[0].toUpperCase() ||
    typeof user.city !== "string" ||
    user.city.length === 0 ||
    user.city[0] !== user.city[0].toUpperCase() ||
    typeof user.country !== "string" ||
    user.country.length === 0 ||
    user.country[0] !== user.country[0].toUpperCase() ||
    typeof user.age !== "number" ||
    typeof user.phone !== "string" ||
    typeof user.email !== "string" ||
    !user.email.includes("@")
  ) {
    console.log("INVALID:", user);
  }
});

// TASK 1

console.log("\n========== TASK 1: FORMAT USERS ==========");

console.log("Random users:", formattedUsers.length);
console.log("Additional users:", formattedAdditionalUsers.length);
console.log("All users:", allUsers.length);
console.log("Unique users:", uniqueUsers.length);

console.log("\nExample of formatted user:");
console.log(uniqueUsers[0]);

// TASK 2

console.log("\n========== TASK 2: VALIDATION ==========");

const validationResult = validateUsers(uniqueUsers);

console.log(validationResult);

// TASK 3

console.log("\n========== TASK 3: FILTERING ==========");

const filteredUsers = filterUsers(
  uniqueUsers,
  "United States",
  30,
  "male",
  true,
);

console.log("Filter:");
console.log("Country: United States");
console.log("Age: 30");
console.log("Gender: male");
console.log("Favorite: true");

console.log("Found users:", filteredUsers.length);
console.log(filteredUsers);

// TASK 4

console.log("\n========== TASK 4: SORTING ==========");

const sortedAsc = sortUsers(uniqueUsers, "age", "asc");
const sortedDesc = sortUsers(uniqueUsers, "age", "desc");

console.log("Age ascending:");

console.log(
  sortedAsc.map((user) => ({
    name: user.full_name,
    age: user.age,
  })),
);

console.log("Age descending:");

console.log(
  sortedDesc.map((user) => ({
    name: user.full_name,
    age: user.age,
  })),
);

// TASK 5

console.log("\n========== TASK 5: SEARCH ==========");

const searchByName = searchUsers(uniqueUsers, "Joe");

console.log('Search: "Joe"');
console.log("Result:", searchByName);

const searchByAge = searchUsers(uniqueUsers, 30);

console.log("Search: 30");
console.log("Result:", searchByAge);

// TASK 6

console.log("\n========== TASK 6: PERCENTAGE ==========");

const percentage = percentOfUsers(uniqueUsers, 30);

console.log("Condition: age > 30");
console.log("Total users:", uniqueUsers.length);
console.log(
  "Users with age > 30:",
  uniqueUsers.filter((user) => user.age > 30).length,
);
console.log("Percentage:", percentage.toFixed(2) + "%");

console.log("\n========== ALL TASKS COMPLETED ==========");

const teachers = document.querySelector("#section-teachers .grid");
console.log(teachers);
function renderTeachers(teachers) {}
