import { useState } from "react";

const courts = [
  {
    id: 1,
    name: "Urban Arena Futsal",
    location: "Jakarta, Indonesia",
    price: 75,
    hours: "09:00 AM - 11:00 PM",
    amenities: ["Locker Room", "Parking", "Cafe", "WiFi"],
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80",
  },
  {
    id: 2,
    name: "Elite Futsal Center",
    location: "Bandung, Indonesia",
    price: 90,
    hours: "08:00 AM - 10:00 PM",
    amenities: ["Locker Room", "Water Fountain", "WiFi"],
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&q=80",
  },
  {
    id: 3,
    name: "Greenlight Sports Arena",
    location: "Surabaya, Indonesia",
    price: 60,
    hours: "07:00 AM - 09:00 PM",
    amenities: ["Parking", "Water Fountain"],
    image: "https://images.unsplash.com/photo-1551958219-acbc608fda15?w=400&q=80",
  },
  {
    id: 4,
    name: "Victory Futsal Court",
    location: "Medan, Indonesia",
    price: 80,
    hours: "10:00 AM - 12:00 AM",
    amenities: ["Locker Room", "Cafe", "WiFi"],
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80",
  },
  {
    id: 5,
    name: "Pekanbaru Sport Hall",
    location: "Pekanbaru, Indonesia",
    price: 70,
    hours: "09:00 AM - 10:00 PM",
    amenities: ["Parking", "Locker Room"],
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&q=80",
  },
  {
    id: 6,
    name: "Mega Futsal Arena",
    location: "Jakarta, Indonesia",
    price: 95,
    hours: "08:30 AM - 11:30 PM",
    amenities: ["Locker Room", "Parking", "Cafe", "WiFi", "Water Fountain"],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80",
  },
];

const amenityIcons = {
  "Locker Room": "🚿",
  Parking: "🅿️",
  "Water Fountain": "💧",
  Cafe: "☕",
  WiFi: "📶",
};

const StarRating = ({ filled }) => (
  <span style={{ color: filled ? "#f59e0b" : "#d1d5db", fontSize: 14 }}>★</span>
);

export default function App() {
  const [priceRange, setPriceRange] = useState(150);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [location, setLocation] = useState("All Locations");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleAmenity = (a) =>
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const filteredCourts = courts.filter((c) => {
    if (c.price > priceRange) return false;
    if (location !== "All Locations" && !c.location.includes(location)) return false;
    if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => c.amenities.includes(a)))
      return false;
    return true;
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f3f4f6" }}>
      {/* Navbar */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 18, color: "#1e3a8a" }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: "#1e3a8a",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 14,
              }}
            >
              ⚽
            </div>
            FutsalFlow
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 14 }}>
            {["Home", "Browse Courts", "Workout Hub"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: item === "Browse Courts" ? "#1e3a8a" : "#6b7280",
                  textDecoration: "none",
                  fontWeight: item === "Browse Courts" ? 600 : 400,
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ cursor: "pointer", color: "#6b7280", fontSize: 18 }}>🔍</span>
          <a href="#" style={{ color: "#374151", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>
            Login
          </a>
          <button
            style={{
              background: "#1e3a8a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 18px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Page title bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 24px", fontSize: 13, color: "#6b7280" }}>
        Browse Courts
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px", display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Sidebar Filters */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            border: "1px solid #e5e7eb",
            position: "sticky",
            top: 80,
          }}
        >
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#111827" }}>Filters</h3>

          {/* Location */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>Location</span>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>▾</span>
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 13,
                color: "#374151",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              {["All Locations", "Jakarta", "Bandung", "Surabaya", "Medan", "Pekanbaru"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>Price Range</span>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>▾</span>
            </div>
            <input
              type="range"
              min={50}
              max={150}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#1e3a8a" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              <span>$50</span>
              <span style={{ fontWeight: 600, color: "#1e3a8a" }}>${priceRange}</span>
              <span>$150</span>
            </div>
          </div>

          {/* Ratings */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>Ratings</span>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>▾</span>
            </div>
            {[5, 4].map((r) => (
              <label key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 13 }}>
                <input type="radio" name="rating" style={{ accentColor: "#1e3a8a" }} />
                <span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarRating key={i} filled={i < r} />
                  ))}
                  {" & Up"}
                </span>
              </label>
            ))}
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>Amenities</span>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>▾</span>
            </div>
            {["Locker Room", "Parking", "Water Fountain", "Cafe"].map((a) => (
              <label key={a} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                  style={{ accentColor: "#1e3a8a" }}
                />
                {a}
              </label>
            ))}
          </div>

          <button
            style={{
              width: "100%",
              background: "#1e3a8a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Apply Filters
          </button>
        </aside>

        {/* Court listings */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 24 }}>
            Discover Futsal Courts
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {filteredCourts.map((court) => (
              <div
                key={court.id}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ height: 140, overflow: "hidden" }}>
                  <img
                    src={court.image}
                    alt={court.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.background = "#e5e7eb";
                      e.target.src = `https://placehold.co/400x140/1e3a8a/white?text=${encodeURIComponent(court.name)}`;
                    }}
                  />
                </div>
                <div style={{ padding: 14 }}>
                  <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#111827" }}>
                    {court.name}
                  </h3>
                  <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280" }}>
                    📍 {court.location}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#1e3a8a" }}>
                      ${court.price}
                      <span style={{ fontSize: 12, fontWeight: 400, color: "#6b7280" }}> / hour</span>
                    </span>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>🕐 {court.hours}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {court.amenities.map((a) => (
                      <span
                        key={a}
                        style={{
                          background: "#f3f4f6",
                          borderRadius: 6,
                          padding: "3px 8px",
                          fontSize: 11,
                          color: "#374151",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        {amenityIcons[a]} {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourts.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⚽</div>
              <p>No courts match your filters. Try adjusting them!</p>
            </div>
          )}

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 32 }}>
            <button
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#fff",
                color: "#6b7280",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              ← Previous
            </button>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Page 1 of 2</span>
            <button
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#fff",
                color: "#374151",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb", marginTop: 48, padding: "40px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 16, color: "#1e3a8a", marginBottom: 10 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: "#1e3a8a",
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 12,
                }}
              >
                ⚽
              </div>
              FutsalFlow
            </div>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
              Your ultimate platform for booking futsal courts and staying active.
            </p>
          </div>
          {[
            { title: "Company", links: ["About Us", "Careers", "Press"] },
            { title: "Support", links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"] },
            { title: "For Owners", links: ["List Your Court", "Owner Dashboard"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#111827" }}>{col.title}</h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{ display: "block", fontSize: 13, color: "#6b7280", textDecoration: "none", marginBottom: 8 }}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "#9ca3af", borderTop: "1px solid #f3f4f6", paddingTop: 20 }}>
          © 2025 FutsalFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}