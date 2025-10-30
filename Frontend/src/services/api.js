const API_BASE = 'http://localhost:3000';

// Función para manejar errores de fetch
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
  }
  return response.json();
};

// Headers comunes
const getHeaders = () => ({
  'Content-Type': 'application/json',
});

// Login
export const loginUser = async (email, password) => {
  try {
    console.log('Intentando login con:', { email });
    
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Respuesta del servidor:', response.status, response.statusText);
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en loginUser:', error.message);
    throw new Error(`No se pudo conectar con el servidor: ${error.message}`);
  }
};

// Usuarios
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE}/usuarios`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en getUsers:', error);
    throw error;
  }
};

// Mesas
export const getMesas = async () => {
  try {
    const response = await fetch(`${API_BASE}/mesas`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en getMesas:', error);
    return [];
  }
};

export const updateMesaStatus = async (id, ocupada, idPedido = null) => {
  try {
    const response = await fetch(`${API_BASE}/mesas/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ ocupada, idPedido }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en updateMesaStatus:', error);
    throw error;
  }
};

// Platillos
export const getPlatillos = async () => {
  try {
    const response = await fetch(`${API_BASE}/platillos`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en getPlatillos:', error);
    return [];
  }
};

// Pedidos
export const getPedidos = async () => {
  try {
    const response = await fetch(`${API_BASE}/pedidos`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en getPedidos:', error);
    return [];
  }
};

export const createPedido = async (pedidoData) => {
  try {
    const response = await fetch(`${API_BASE}/pedidos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(pedidoData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en createPedido:', error);
    throw error;
  }
};

export const updatePedidoStatus = async (id, listo) => {
  try {
    const response = await fetch(`${API_BASE}/pedidos/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ listo }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en updatePedidoStatus:', error);
    throw error;
  }
};

// Reservas
export const getReservas = async () => {
  try {
    const response = await fetch(`${API_BASE}/reservas`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en getReservas:', error);
    return [];
  }
};