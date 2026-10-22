// import { uniqueUsers } from "./formatUsers.js";
import TeacherList from "./components/TeacherList.jsx";
import TeacherFilters from "./components/TeacherFilters.jsx";
import AddTeacherPopup from "./components/AddTeacherPopup.jsx";
import Notes from "./components/Notes.jsx";
import { getUsers, formatUsers } from "./formatUsers.js";
import "./App.css";
import TeacherStatistics from "./components/TeacherStatistics.jsx";
import TeacherCard from "./components/TeacherCard.jsx";
import { useEffect, useRef, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const favoritesGridRef = useRef(null);
  const favoriteTeachers = teachers.filter((teacher) =>
    favorites.includes(teacher.id),
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function loadUsers() {
      const users = await getUsers(50, 1);
      const formattedUsers = formatUsers(users);
      setTeachers(formattedUsers);
    }

    loadUsers();
  }, []);

  const handleLoadMore = async () => {
    const nextPage = Math.floor(teachers.length / 10) + 1;
    const users = await getUsers(10, nextPage);
    const formattedUsers = formatUsers(users, teachers.length);

    setTeachers((prevTeachers) => [...prevTeachers, ...formattedUsers]);
    setPage(nextPage);
  };

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const handleAddTeacher = async (newTeacher) => {
    try {
      const response = await fetch("http://localhost:3001/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const savedTeacher = await response.json();
      setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);
      setIsAddTeacherOpen(false);
    } catch (error) {
      console.log("failed to save teacher: ", error);
      alert("cant save teacher");
    }
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
  const scrollFavorites = (direction) => {
    favoritesGridRef.current?.scrollBy({
      left: direction * 200,
      behavior: "smooth",
    });
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
        <TeacherFilters
          onFiltersChange={handleFiltersChange}
          teachers={teachers}
        />
        <TeacherList
          teachers={teachers}
          favorites={favorites}
          setFavorites={setFavorites}
          filters={filters}
          searchTerm={searchTerm}
          onFilteredTeachersChange={setFilteredTeachers}
        />
        <button onClick={handleLoadMore}>Next</button>
      </section>

      <TeacherStatistics teachers={filteredTeachers} />

      <section id="section-favorites">
        <h2>Favorites</h2>

        <div className="favorites-container">
          <button
            className="arrow left-arrow"
            onClick={() => scrollFavorites(-1)}
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
            onClick={() => scrollFavorites(1)}
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
