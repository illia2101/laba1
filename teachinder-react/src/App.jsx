import { uniqueUsers } from "./formatUsers.js";
import TeacherList from "./components/TeacherList.jsx";
import TeacherFilters from "./components/TeacherFilters.jsx";
import AddTeacherPopup from "./components/AddTeacherPopup.jsx";
import Notes from "./components/Notes.jsx";
import "./App.css";
import TeacherStatistics from "./components/TeacherStatistics.jsx";
import TeacherCard from "./components/TeacherCard.jsx";
import { useRef, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [teachers, setTeachers] = useState(uniqueUsers);
  const favoritesGridRef = useRef(null);
  const favoriteTeachers = teachers.filter((teacher) =>
    favorites.includes(teacher.id),
  );
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  const handleAddTeacher = (newTeacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);

    setIsAddTeacherOpen(false);
  };

  const [filters, setFilters] = useState({
    country: "all",
    sex: "all",
    ageRange: "all",
    onlyWithPhoto: false,
    onlyFavorites: false,
  });
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <main>
      <div className="search-container">
        <h1>Teachinder</h1>
        <input
          type="text"
          placeholder="Name, note or age search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={() => setSearchTerm(searchInput)}>Search</button>
      </div>
      <section className="navigation">
        <a href="#section-teachers">Teachers</a>
        <a href="#section-statistics">Statistics</a>
        <a href="#section-favorites">Favorites</a>
        <a href="#section-about">About</a>

        <button onClick={() => setIsAddTeacherOpen(true)}>Add Teacher</button>
      </section>
      {isAddTeacherOpen && (
        <AddTeacherPopup
          onClose={() => setIsAddTeacherOpen(false)}
          onAddTeacher={handleAddTeacher}
        />
      )}

      <section id="section-teachers">
        <h2>Top Teachers</h2>
        <TeacherFilters onFiltersChange={handleFiltersChange} />
        <TeacherList
          teachers={teachers}
          favorites={favorites}
          setFavorites={setFavorites}
          filters={filters}
          searchTerm={searchTerm}
        />
      </section>

      <TeacherStatistics teachers={teachers} />

      <section id="section-favorites">
        <h2>Favorites</h2>

        <div className="favorites-container">
          <button
            className="arrow left-arrow"
            onClick={() =>
              favoritesGridRef.current?.scrollBy({
                left: -200,
                behavior: "smooth",
              })
            }
          >
            &#10094;
          </button>

          <div className="favorites-grid" ref={favoritesGridRef}>
            {favoriteTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onClick={() => {}}
                isFavorite={true}
                onToggleFavorite={() => {
                  setFavorites((prevFavorites) =>
                    prevFavorites.filter((id) => id !== teacher.id),
                  );
                }}
              />
            ))}
          </div>

          <button
            className="arrow right-arrow"
            onClick={() =>
              favoritesGridRef.current?.scrollBy({
                left: 200,
                behavior: "smooth",
              })
            }
          >
            &#10095;
          </button>
        </div>
      </section>

      <Notes />

      <section className="navigation">
        <a href="#section-teachers">Teachers</a>
        <a href="#section-statistics">Statistics</a>
        <a href="#section-favorites">Favorites</a>
        <a href="#section-about">About</a>

        <button onClick={() => setIsAddTeacherOpen(true)}>Add Teacher</button>
      </section>
      {isAddTeacherOpen && (
        <AddTeacherPopup
          onClose={() => setIsAddTeacherOpen(false)}
          onAddTeacher={handleAddTeacher}
        />
      )}
    </main>
  );
}

export default App;
