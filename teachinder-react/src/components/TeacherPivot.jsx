import { useEffect, useMemo, useRef, useState } from "react";
import WebDataRocks from "@webdatarocks/webdatarocks";

function TeacherPivot({ teachers }) {
  const containerRef = useRef(null);
  const pivotRef = useRef(null);
  const [flatMode, setFlatMode] = useState(false);

  const data = useMemo(
    () =>
      teachers.map((teacher) => ({
        Name: teacher.full_name ?? "",
        Country: teacher.country ?? "Unknown",
        Gender: teacher.gender ?? "Unknown",
        Age: Number(teacher.age) || 0,
      })),
    [teachers],
  );

  const dataRef = useRef(data);
  dataRef.current = data;

  const createReport = (flat) => ({
    dataSource: { data: dataRef.current },
    options: {
      grid: {
        type: flat ? "flat" : "compact",
      },
    },
    slice: flat
      ? {
          flatOrder: [
            { uniqueName: "Name" },
            { uniqueName: "Country" },
            { uniqueName: "Gender" },
            { uniqueName: "Age" },
          ],
        }
      : {
          rows: [{ uniqueName: "Country", caption: "Country" }],
          columns: [{ uniqueName: "Gender", caption: "Gender" }],
          measures: [
            {
              uniqueName: "Name",
              aggregation: "count",
              caption: "Number of teachers",
            },
          ],
        },
  });

  useEffect(() => {
    if (!containerRef.current || pivotRef.current) return;

    const pivot = new WebDataRocks({
      container: containerRef.current,
      toolbar: true,
      report: createReport(false),
    });

    pivotRef.current = pivot;

    return () => {
      pivot.dispose();
      pivotRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!pivotRef.current) return;

    pivotRef.current.setReport(createReport(flatMode));
  }, [flatMode]);

  useEffect(() => {
    if (!pivotRef.current) return;

    pivotRef.current.updateData({ data });
  }, [data]);

  return (
    <section id="section-pivot">
      <h2>Teachers Pivot Table</h2>

      <button
        type="button"
        onClick={() => setFlatMode((previous) => !previous)}
      >
        {flatMode ? "Show country report" : "Show all teachers"}
      </button>

      <div
        ref={containerRef}
        style={{ width: "100%", height: "500px", marginTop: "12px" }}
      />
    </section>
  );
}

export default TeacherPivot;
