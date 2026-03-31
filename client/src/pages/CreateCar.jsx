import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { calcCost, brandOptions, wheelOptions, colorOptions, validateCar, getDisabledWheels } from '../utilities/calcprice'
import CarPreview from '../components/CarPreview'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ brand: '', model: '', wheel: '', color: '' })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationError = validateCar(form)
        if (validationError) {
            setError(validationError)
            return
        }
        const cost = calcCost(form)
        await createCar({ ...form, cost })
        navigate('/customcars')
    }

    const cost = calcCost(form)

    return (
        <div>
            <h1>Create Car</h1>
            <CarPreview {...form} />
            <form onSubmit={handleSubmit}>
                <label>Brand
                    <select name="brand" value={form.brand} onChange={handleChange}>
                        <option value="">Select a brand</option>
                        {brandOptions.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </label>
                <label>Model
                    <input name="model" value={form.model} onChange={handleChange} />
                </label>
                <label>Wheel
                    <select name="wheel" value={form.wheel} onChange={handleChange}>
                        <option value="">Select a wheel</option>
                        {wheelOptions.map(w => <option key={w} value={w} disabled={getDisabledWheels(form.brand).includes(w)}>{w}</option>)}
                    </select>
                </label>
                <label>Color
                    <select name="color" value={form.color} onChange={handleChange}>
                        <option value="">Select a color</option>
                        {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {form.brand && form.wheel && form.color && (
                    <p><strong>Estimated Cost:</strong> ${cost.toLocaleString()}</p>
                )}
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateCar
