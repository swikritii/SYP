# 📖 Understanding CRUD in FutsalFlow

This guide explains how **CRUD** (Create, Read, Update, Delete) is already working in your project. No changes were made to your app's behavior; this is just for your understanding.

---

## 1. What is CRUD?
CRUD is the standard way applications handle data:
- **C (Create)**: Adding new information (e.g., Adding a Court).
- **R (Read)**: Viewing information (e.g., Browsing the list of Courts).
- **U (Update)**: Changing existing information (e.g., Cancelling a booking).
- **D (Delete)**: Removing information (e.g., Deleting a court).

---

## 2. Where is it in the Code?

### **COURTS (Backend)**
Look at `Backend/src/controllers/courtController.js`:
- **Create**: The `addCourt` function (around line 64) uses `INSERT INTO courts ...`.
- **Read**: The `getAllCourts` function (around line 9) uses `SELECT * FROM courts ...`.
- **Update**: The `updateCourt` function (around line 96) uses `UPDATE courts SET ...`.
- **Delete**: The `deleteCourt` function (around line 128) uses `DELETE FROM courts ...`.

### **BOOKINGS (Backend)**
Look at `Backend/src/controllers/bookingController.js`:
- **Create**: `createBooking` (line 9) saves a new booking.
- **Read**: `getMyBookings` (line 65) shows your personal bookings.
- **Update**: `cancelBooking` (line 147) updates the status to 'cancelled'.

---

## 3. How is it "Saved"?
When you click "Save" or "Book" in the app:
1. The **Frontend** sends a request to the **Backend**.
2. The **Backend** receives the data and runs a **SQL Query**.
3. The **MySQL Database** stores that data in a table (`courts` or `bookings`).
4. Even if you refresh the page or restart the computer, the data stays in the database.

---

## 4. How to verify it without changing code?
You can use **MySQL Workbench** or any database tool to see the data directly:
- Run `SELECT * FROM courts;` to see all courts.
- Run `SELECT * FROM bookings;` to see all bookings.

This is the best way to show your teacher: "Look, I created this court in the app, and here it is inside the database table!"
