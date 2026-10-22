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
  const columns = [
    { label: "Name", field: "full_name" },
    { label: "Speciality", field: "course" },
    { label: "Age", field: "age" },
    { label: "Gender", field: "gender" },
    { label: "Nationality", field: "country" },
  ];

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
            {columns.map(({ label, field }) => (
              <th key={field} onClick={() => handleSort(field)}>
                {label}{" "}
                {sortField === field && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            ))}
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
