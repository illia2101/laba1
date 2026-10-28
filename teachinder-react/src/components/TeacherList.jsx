import TeacherCard from "./TeacherCard.jsx";
import { useEffect, useState, useMemo } from "react";
import TeacherMap from "./TeacherMap";
import _ from "lodash";

function TeacherList({
  favorites,
  setFavorites,
  filters,
  searchTerm,
  teachers,
  onFilteredTeachersChange,
}) {
  const query = _.toLower(_.trim(searchTerm));

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const filteredTeachers = useMemo(() => {
    return _.filter(teachers, (teacher) => {
      const matchesSearchTerm =
        _.includes(_.toLower(String(teacher.full_name ?? "")), query) ||
        _.includes(_.toLower(String(teacher.note ?? "")), query) ||
        _.includes(String(teacher.age ?? ""), query);

      const matchesCountry =
        filters.country === "all" || teacher.country === filters.country;

      const matchesSex =
        filters.sex === "all" ||
        _.toLower(String(teacher.gender ?? "")) === filters.sex;

      const matchesAge = (() => {
        if (filters.ageRange === "all") return true;

        const [minAge, maxAge] = _.map(_.split(filters.ageRange, "-"), Number);

        const age = Number(teacher.age);

        return age >= minAge && age <= maxAge;
      })();

      const matchesPhoto =
        !filters.onlyWithPhoto || Boolean(teacher.picture_large);

      const matchesFavorite =
        !filters.onlyFavorites || _.includes(favorites, teacher.id);

      return (
        matchesSearchTerm &&
        matchesCountry &&
        matchesSex &&
        matchesAge &&
        matchesPhoto &&
        matchesFavorite
      );
    });
  }, [teachers, query, filters, favorites]);

  useEffect(() => {
    onFilteredTeachersChange(filteredTeachers);
  }, [filteredTeachers, onFilteredTeachersChange]);

  const toggleFavorite = (teacher, event) => {
    event.stopPropagation();

    setFavorites((prevFavorites) =>
      prevFavorites.includes(teacher.id)
        ? prevFavorites.filter((id) => id !== teacher.id)
        : [...prevFavorites, teacher.id],
    );
  };
  return (
    <div className="grid">
      {_.map(filteredTeachers, (teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          onClick={() => setSelectedTeacher(teacher)}
          isFavorite={_.includes(favorites, teacher.id)}
          onToggleFavorite={() => {
            setFavorites((prev) =>
              _.includes(prev, teacher.id)
                ? _.filter(prev, (id) => id !== teacher.id)
                : [...prev, teacher.id],
            );
          }}
        />
      ))}
      {selectedTeacher && (
        <div
          className="modal teacher-info-modal"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <span>Teacher Info</span>
              <button
                className="close-button"
                onClick={() => setSelectedTeacher(null)}
              >
                &times;
              </button>
            </div>

            <div className="teacher-info">
              <div className="teacher-info-main">
                <div className="teacher-info-avatar">
                  {selectedTeacher.picture_large ? (
                    <img
                      src={selectedTeacher.picture_large}
                      alt={selectedTeacher.full_name}
                    />
                  ) : (
                    <span>{selectedTeacher.full_name}</span>
                  )}
                </div>

                <div className="teacher-details">
                  <div className="teacher-details-header">
                    <h2>{selectedTeacher.full_name}</h2>

                    <button
                      className="favorite-star"
                      onClick={(event) =>
                        toggleFavorite(selectedTeacher, event)
                      }
                      aria-label="Toggle favorite"
                    >
                      {favorites.includes(selectedTeacher.id) ? "★" : "☆"}
                    </button>
                  </div>
                  <p>
                    <strong>Speciality:</strong> {selectedTeacher.course}
                  </p>
                  <p>
                    <strong>Country:</strong> {selectedTeacher.country}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedTeacher.city}
                  </p>
                  <p>
                    <strong>Age:</strong> {selectedTeacher.age}
                  </p>
                  <p>
                    <strong>Sex:</strong> {selectedTeacher.gender}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedTeacher.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedTeacher.phone}
                  </p>
                </div>
              </div>

              <p className="teacher-notes">{selectedTeacher.note}</p>
              <button type="button" onClick={() => setShowMap((prev) => !prev)}>
                {showMap ? "Hide map" : "Show map"}
              </button>

              {showMap && (
                <TeacherMap
                  latitude={selectedTeacher.coordinates?.latitude}
                  longitude={selectedTeacher.coordinates?.longitude}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default TeacherList;
