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

            const birthDate = formData.get("birth_date");
            const today = new Date();
            const birth = new Date(`${birthDate}T00:00:00`);

            let age = today.getFullYear() - birth.getFullYear();

            if (
              today.getMonth() < birth.getMonth() ||
              (today.getMonth() === birth.getMonth() &&
                today.getDate() < birth.getDate())
            ) {
              age--;
            }

            if (age < 18 || age > 100) {
              alert("Age must be between 18 and 100.");
              return;
            }

            const newTeacher = {
              id: Date.now(),
              full_name: formData.get("full_name").trim(),
              course: formData.get("course"),
              country: formData.get("country"),
              city: formData.get("city").trim(),
              email: formData.get("email").trim(),
              phone: formData.get("phone").trim(),
              b_date: birthDate,
              gender: formData.get("gender"),
              note: formData.get("note").trim(),
              favorite: false,
              age,
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
              <input type="email" id="email" name="email" required />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
          </div>

          <label htmlFor="birth-date">Date of birth</label>
          <input type="date" id="birth-date" name="birth_date" required />

          <div className="gender">
            <span>Sex</span>

            <label>
              <input type="radio" name="sex" value="male" required />
              Male
            </label>

            <label>
              <input type="radio" name="sex" value="female" required />
              Female
            </label>
          </div>

          <label htmlFor="notes">Notes (optional)</label>

          <textarea id="notes" name="note" rows="5"></textarea>

          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddTeacherPopup;
