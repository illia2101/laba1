import dayjs from "dayjs";

function TeacherCard({ teacher, onClick, isFavorite, onToggleFavorite }) {
  const today = dayjs().startOf("day");
  const birthday = dayjs(teacher.b_date);

  let daysUntilBirthday = null;

  if (birthday.isValid()) {
    let nextBirthday = birthday.year(today.year()).startOf("day");

    if (nextBirthday.isBefore(today)) {
      nextBirthday = nextBirthday.add(1, "year");
    }

    daysUntilBirthday = nextBirthday.diff(today, "day");
  }

  console.log("Days until birthday:", teacher.full_name, daysUntilBirthday);

  return (
    <div className="profile-card" onClick={onClick}>
      <div className="avatar-container">
        {teacher.picture_large ? (
          <img src={teacher.picture_large} alt={teacher.full_name} />
        ) : (
          <span>{teacher.full_name}</span>
        )}

        <button
          type="button"
          className={`favorite-star ${isFavorite ? "active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <h3 className="profile-name">{teacher.full_name}</h3>
      <p className="profile-course">{teacher.course}</p>
      <p className="profile-info">{teacher.country}</p>
      <p
        style={{
          display: "block",
          visibility: "visible",
          opacity: 1,
          color: "#ffd000",
          fontSize: "10px",
          margin: "6px 0",
          lineHeight: 1.4,
        }}
      >
        {daysUntilBirthday === null
          ? "Birthday unavailable"
          : daysUntilBirthday === 0
            ? "Birthday today!"
            : `${daysUntilBirthday} days until birthday`}
      </p>
    </div>
  );
}

export default TeacherCard;
