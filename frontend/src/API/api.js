const isDev = import.meta.env.DEV;

export const API_BASE = import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:5001/api' : '/api');
export const MEDIA_BASE = import.meta.env.VITE_MEDIA_URL || (isDev ? 'http://localhost:5001' : '');

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${MEDIA_BASE}${path}`;
};

// Get token from localStorage
const getToken = () => localStorage.getItem('vhrc_admin_token');

// Generic fetch wrapper
const apiFetch = async (endpoint, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const config = {
    headers: {
      ...options.headers,
    },
    ...options,
  };

  if (!isFormData) {
    config.headers['Content-Type'] = 'application/json';
  }

  // Add auth token if available
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// ============ AUTH ============
export const loginAdmin = (credentials) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

export const getMe = () => apiFetch('/auth/me');

// ============ DOCTORS ============
export const getDoctors = () => apiFetch('/doctors');
export const getAllDoctors = () => apiFetch('/doctors/all');
export const getDoctor = (id) => apiFetch(`/doctors/${id}`);
export const createDoctor = (data) =>
  apiFetch('/doctors', { method: 'POST', body: data instanceof FormData ? data : JSON.stringify(data) });
export const updateDoctor = (id, data) =>
  apiFetch(`/doctors/${id}`, { method: 'PUT', body: data instanceof FormData ? data : JSON.stringify(data) });
export const deleteDoctor = (id) =>
  apiFetch(`/doctors/${id}`, { method: 'DELETE' });

// ============ SERVICES ============
export const getServices = () => apiFetch('/services');
export const getAllServices = () => apiFetch('/services/all');
export const createService = (data) =>
  apiFetch('/services', { method: 'POST', body: JSON.stringify(data) });
export const updateService = (id, data) =>
  apiFetch(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteService = (id) =>
  apiFetch(`/services/${id}`, { method: 'DELETE' });

// ============ SERVICE DETAILS ============
export const getServiceDetails = () => apiFetch('/service-details');
export const getAllServiceDetails = () => apiFetch('/service-details/all');
export const createServiceDetail = (data) =>
  apiFetch('/service-details', { method: 'POST', body: JSON.stringify(data) });
export const updateServiceDetail = (id, data) =>
  apiFetch(`/service-details/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteServiceDetail = (id) =>
  apiFetch(`/service-details/${id}`, { method: 'DELETE' });

// ============ DEPARTMENTS ============
export const getDepartments = () => apiFetch('/departments');
export const getAllDepartments = () => apiFetch('/departments/all');
export const createDepartment = (data) =>
  apiFetch('/departments', { method: 'POST', body: JSON.stringify(data) });
export const updateDepartment = (id, data) =>
  apiFetch(`/departments/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteDepartment = (id) =>
  apiFetch(`/departments/${id}`, { method: 'DELETE' });

// ============ APPOINTMENTS ============
export const getAppointments = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`/appointments?${params}`);
};
export const getAppointmentStats = () => apiFetch('/appointments/stats');
export const createAppointment = (data) =>
  apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) });
export const updateAppointment = (id, data) =>
  apiFetch(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAppointment = (id) =>
  apiFetch(`/appointments/${id}`, { method: 'DELETE' });

// ============ CONTACT ============
export const submitContact = (data) =>
  apiFetch('/contact', { method: 'POST', body: JSON.stringify(data) });
export const getContacts = () => apiFetch('/contact');
export const updateContact = (id, data) =>
  apiFetch(`/contact/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteContact = (id) =>
  apiFetch(`/contact/${id}`, { method: 'DELETE' });
