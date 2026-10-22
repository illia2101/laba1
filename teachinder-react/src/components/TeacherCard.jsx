function TeacherCard({ teacher, onClick, isFavorite, onToggleFavorite }) {
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
    </div>
  );
}

export default TeacherCard;
