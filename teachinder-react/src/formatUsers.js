import { randomUserMock, additionalUsers } from "./data/FE4U-Lab2-mock (1).js";
import _ from "lodash";
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

export function formatUsers(users, startId = 0) {
  return _.map(users, (user, index) => {
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
      id: startId + index + 1,
      favorite: false,
      course: randomCourse,
      bg_color: "#ffffff",
      note: "",
    };
  });
}
function formatAdditionalUsers(users) {
  return _.map(users, (user) => {
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
const formattedUsers = formatUsers(randomUserMock);
const formattedAdditionalUsers = formatAdditionalUsers(additionalUsers);
const allUsers = [...formattedUsers, ...formattedAdditionalUsers];
export const uniqueUsers = _.uniqBy(allUsers, "full_name");

_.forEach(uniqueUsers, (user) => {
  if (!isValidUser(user)) {
    console.log("INVALID:", user);
  }
});

export function isValidUser(user) {
  return (
    _.isString(user.gender) &&
    _.isString(user.full_name) &&
    user.full_name.length > 0 &&
    user.full_name[0] === user.full_name[0].toUpperCase() &&
    _.isString(user.note) &&
    _.isString(user.state) &&
    user.state.length > 0 &&
    user.state[0] === user.state[0].toUpperCase() &&
    _.isString(user.city) &&
    user.city.length > 0 &&
    user.city[0] === user.city[0].toUpperCase() &&
    _.isString(user.country) &&
    user.country.length > 0 &&
    user.country[0] === user.country[0].toUpperCase() &&
    _.isNumber(user.age) &&
    _.isString(user.phone) &&
    _.isString(user.email) &&
    _.includes(user.email, "@")
  );
}

export async function getUsers(results = 50, page = 1) {
  const url = `https://randomuser.me/api?results=${results}&page=${page}&seed=teachinder`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
