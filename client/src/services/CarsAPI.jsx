const API_URL = '/api';

const getCars = async () => {
    const response = await fetch(`${API_URL}/`);
    return response.json();
}

const getCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

const createCar = async (car) => {
    const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    });
    return response.json();
}

const editCar = async (id, car) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    });
    return response.json();
}

const deleteCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}

export { 
    getCars, 
    getCar, 
    createCar, 
    editCar, 
    deleteCar 
}
