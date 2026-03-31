import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCars, deleteCar } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCars().then(setCars)
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        await deleteCar(id)
        setCars(cars.filter(car => car.id !== id))
    }

    return (
        <div>
            <h1>Custom Cars</h1>
            <ul>
                {cars.map(car => (
                    <li key={car.id}>
                        <span onClick={() => navigate(`/customcars/${car.id}`)}>{car.color} {car.model}</span>
                        <button onClick={(e) => { e.stopPropagation(); navigate(`/edit/${car.id}`) }}>Edit</button>
                        <button onClick={(e) => handleDelete(e, car.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ViewCars
