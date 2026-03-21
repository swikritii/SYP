const API_BASE = 'http://localhost:3000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const courtService = {
  async getAllCourts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.location) params.append('location', filters.location);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.amenities) params.append('amenities', filters.amenities.join(','));

    const res = await fetch(`${API_BASE}/courts?${params.toString()}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch courts');
    return data;
  },

  async getCourtById(id) {
    const res = await fetch(`${API_BASE}/courts/${id}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Court not found');
    return data;
  },

  async createCourt(courtData) {
    const res = await fetch(`${API_BASE}/courts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(courtData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create court');
    return data;
  },

  async updateCourt(id, courtData) {
    const res = await fetch(`${API_BASE}/courts/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(courtData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update court');
    return data;
  },

  async deleteCourt(id) {
    const res = await fetch(`${API_BASE}/courts/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete court');
    return data;
  },
};
