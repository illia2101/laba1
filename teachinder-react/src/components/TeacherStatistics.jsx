import { uniqueUsers } from "../formatUsers.js";
import { useState } from "react";

function TeacherStatistics({ teachers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const teachersPerPage = 10;

  const sortedTeachers = [...teachers].sort((a, b) => {
    const valueA = a[sortField] ?? "";
    const valueB = b[sortField] ?? "";

    let result;

    if (sortField === "age") {
      result = Number(valueA) - Number(valueB);
    } else {
      result = String(valueA).localeCompare(String(valueB), undefined, {
        sensitivity: "base",
      });
    }

    return sortDirection === "asc" ? result : -result;
  });
  const totalPages = Math.ceil(sortedTeachers.length / teachersPerPage);

  const startIndex = (currentPage - 1) * teachersPerPage;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const currentTeachers = sortedTeachers.slice(
    startIndex,
    startIndex + teachersPerPage,
  );
  return (
    <section id="section-statistics">
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("full_name")}>
              Name{" "}
              {sortField === "full_name" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>

            <th onClick={() => handleSort("course")}>
              Speciality{" "}
              {sortField === "course" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>

            <th onClick={() => handleSort("age")}>
              Age {sortField === "age" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>

            <th onClick={() => handleSort("gender")}>
              Gender{" "}
              {sortField === "gender" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>

            <th onClick={() => handleSort("country")}>
              Nationality{" "}
              {sortField === "country" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.full_name}</td>
              <td>{teacher.course}</td>
              <td>{teacher.age}</td>
              <td>{teacher.gender}</td>
              <td>{teacher.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={currentPage === page ? "active-page" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </section>
  );
}
export default TeacherStatistics;
