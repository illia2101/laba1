import { uniqueUsers } from "../formatUsers.js";
import TeacherCard from "./TeacherCard.jsx";
import { useState } from "react";

function TeacherFilters({ onFiltersChange }) {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedSex, setSelectedSex] = useState("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="teacher-filters">
      <label htmlFor="age">Age:</label>
      <select
        id="age"
        name="age"
        value={selectedAgeRange}
        onChange={(event) => {
          const newAgeRange = event.target.value;

          setSelectedAgeRange(newAgeRange);

          onFiltersChange({
            country: selectedCountry,
            sex: selectedSex,
            ageRange: newAgeRange,
            onlyWithPhoto,
            onlyFavorites,
          });
        }}
      >
        <option value="all">All</option>
        <option value="18-31">18-31</option>
        <option value="31-45">31-45</option>
        <option value="45-70">45-70</option>
      </select>

      <label htmlFor="country">Country:</label>
      <select
        id="country"
        name="country"
        value={selectedCountry}
        onChange={(event) => {
          const newCountry = event.target.value;
          setSelectedCountry(newCountry);

          onFiltersChange({
            country: newCountry,
            sex: selectedSex,
            ageRange: selectedAgeRange,
            onlyWithPhoto,
            onlyFavorites,
          });
        }}
      >
        <option value="all">All</option>
        {[...new Set(uniqueUsers.map((teacher) => teacher.country))]
          .filter(Boolean)
          .sort()
          .map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
      </select>

      <label htmlFor="sex">Sex:</label>
      <select
        id="sex"
        name="sex"
        value={selectedSex}
        onChange={(event) => {
          const newSex = event.target.value;

          setSelectedSex(newSex);

          onFiltersChange({
            country: selectedCountry,
            sex: newSex,
            ageRange: selectedAgeRange,
            onlyWithPhoto,
            onlyFavorites,
          });
        }}
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="only-with-photo">
        {" "}
        <input
          type="checkbox"
          checked={onlyWithPhoto}
          onChange={(event) => {
            const newValue = event.target.checked;
            setOnlyWithPhoto(newValue);

            onFiltersChange({
              country: selectedCountry,
              sex: selectedSex,
              ageRange: selectedAgeRange,
              onlyWithPhoto: newValue,
              onlyFavorites,
            });
          }}
        />{" "}
        Only with photo{" "}
      </label>
      <label>
        {" "}
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(event) => {
            const newValue = event.target.checked;
            setOnlyFavorites(newValue);

            onFiltersChange({
              country: selectedCountry,
              sex: selectedSex,
              ageRange: selectedAgeRange,
              onlyWithPhoto,
              onlyFavorites: newValue,
            });
          }}
        />{" "}
        Only favorites{" "}
      </label>
    </div>
  );
}
export default TeacherFilters;
