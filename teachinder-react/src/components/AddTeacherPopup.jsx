import { useState } from "react";

function AddTeacherPopup({ onClose, onAddTeacher }) {
  return (
    <div className="modal add-teacher-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span>Add Teacher</span>
          <button type="button" className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);

            const newTeacher = {
              id: Date.now(),
              full_name: formData.get("full_name"),
              course: formData.get("course"),
              country: formData.get("country"),
              city: formData.get("city"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              b_day: formData.get("b_day"),
              gender: formData.get("gender"),
              note: formData.get("note"),
              favorite: false,
              age: 0,
              picture_large: "",
              picture_thumbnail: "",
            };

            onAddTeacher(newTeacher);
          }}
        >
          <label htmlFor="teacher-name">Name</label>
          <input
            type="text"
            id="teacher-name"
            name="full_name"
            placeholder="Enter name"
            required
          />

          <label htmlFor="speciality">Speciality</label>
          <select id="speciality" name="course" required>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Computer Science</option>
            <option>Biology</option>
            <option>Chess</option>
          </select>

          <div className="form-row">
            <div>
              <label htmlFor="country">Country</label>
              <select id="country" name="country">
                <option>Ukraine</option>
                <option>USA</option>
                <option>Germany</option>
                <option>Poland</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
          </div>

          <label htmlFor="birth-date">Date of birth</label>
          <input type="date" id="birth-date" name="birth_date" />

          <div className="gender">
            <span>Sex</span>

            <label>
              <input type="radio" name="sex" />
              Male
            </label>

            <label>
              <input type="radio" name="sex" />
              Female
            </label>
          </div>

          <label htmlFor="notes">Notes (optional)</label>

          <textarea id="notes" rows="5"></textarea>

          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddTeacherPopup;
