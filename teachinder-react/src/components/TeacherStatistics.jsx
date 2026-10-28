import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TeacherStatistics({ teachers }) {
  const chartData = useMemo(() => {
    const countryCounts = {};

    teachers.forEach((teacher) => {
      const country = teacher.country || "Unknown";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    return {
      labels: Object.keys(countryCounts),
      datasets: [
        {
          label: "Teachers by country",
          data: Object.values(countryCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#8AC926",
            "#1982C4",
            "#6A4C93",
            "#F15BB5",
            "#00BBF9",
            "#00F5D4",
            "#E76F51",
            "#90BE6D",
            "#F94144",
            "#577590",
            "#F3722C",
            "#43AA8B",
            "#F9C74F",
            "#277DA1",
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };
  }, [teachers]);

  return (
    <section id="section-statistics">
      <h2>Teachers by Country</h2>

      {teachers.length > 0 ? (
        <div className="statistics-chart">
          <Pie data={chartData} />
        </div>
      ) : (
        <p>No teachers to display.</p>
      )}
    </section>
  );
}

export default TeacherStatistics;
