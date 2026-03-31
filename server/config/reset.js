import { pool } from './database.js';
import { cars } from '../data/cars.js';

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            brand VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            wheel VARCHAR(255) NOT NULL,
            color VARCHAR(255) NOT NULL,
            cost INTEGER NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

const seedCarsTable = async () => {
    await createCarsTable()

    cars.forEach((car) => {
        const insertQuery = {
            text: 'INSERT INTO cars (brand, model, wheel, color, cost) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [
            car.brand,
            car.model,
            car.wheel,
            car.color,
            car.cost
        ]

        pool.query(insertQuery, values, (err) => {
            if (err) {
                console.error('⚠️ error inserting car', err)
                return
            }

            console.log(`✅ ${car.brand} ${car.model} added successfully`)
        })
    })
}

seedCarsTable()
