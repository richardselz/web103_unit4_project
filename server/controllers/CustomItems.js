import { pool } from '../config/database.js';

const getCars = async (_request, response) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC');
        response.status(200).json(results.rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

const getCar = async (request, response) => {
    try {
        const { id } = request.params;
        const results = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
        response.status(200).json(results.rows[0]);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

const createCar = async (request, response) => {
    try {
        const { brand, model, wheel, color, cost } = request.body;
        const results = await pool.query(
            'INSERT INTO cars (brand, model, wheel, color, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [brand, model, wheel, color, cost]
        );
        response.status(201).json(results.rows[0]);
    } catch (error) {
        response.status(409).json({ error: error.message });
    }
}

const editCar = async (request, response) => {
    try {
        const { id } = request.params;
        const fields = [];
        const values = [];
        let i = 1;

        for (const col of ['brand', 'model', 'wheel', 'color', 'cost']) {
            if (request.body[col] !== undefined) {
                fields.push(`${col} = $${i++}`);
                values.push(request.body[col]);
            }
        }

        values.push(id);
        const results = await pool.query(
            `UPDATE cars SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
            values
        );
        response.status(200).json(results.rows[0]);
    } catch (error) {
        response.status(409).json({ error: error.message });
    }
}

const deleteCar = async (request, response) => {
    try {
        const { id } = request.params;
        await pool.query('DELETE FROM cars WHERE id = $1', [id]);
        response.status(200).json({ message: `Car ${id} deleted successfully` });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export default {
    getCar,
    getCars,
    createCar,
    editCar,
    deleteCar
}
