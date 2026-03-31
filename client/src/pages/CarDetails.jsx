import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        getCar(id).then(setCar)
    }, [id])

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    if (!car) return <p>Loading...</p>

    return (
        <div>
            <h1>{car.color} {car.model}</h1>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Wheels:</strong> {car.wheel}</p>
            <p><strong>Cost:</strong> ${car.cost.toLocaleString()}</p>
            <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate('/customcars')}>Back</button>
        </div>
    )
}

export default CarDetails
