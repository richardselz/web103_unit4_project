const colorMap = {
    Red: '#e74c3c',
    Blue: '#2980b9',
    Black: '#1a1a1a',
    White: '#f0f0f0',
    Silver: '#bdc3c7',
}

const wheelIcon = {
    Alloy: '◎',
    Steel: '○',
}

const CarPreview = ({ brand, model, wheel, color }) => {
    if (!color && !brand) return null

    const bgColor = colorMap[color] || '#ccc'
    const textColor = color === 'White' || color === 'Silver' ? '#333' : '#fff'

    return (
        <div style={{
            backgroundColor: bgColor,
            color: textColor,
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            margin: '16px 0',
            transition: 'background-color 0.3s ease',
        }}>
            <div style={{ fontSize: '64px' }}>🚗</div>
            {brand && <p style={{ margin: '4px 0' }}><strong>{brand}</strong> {model || ''}</p>}
            {wheel && <p style={{ margin: '4px 0' }}>{wheelIcon[wheel]} {wheel} wheels</p>}
            {color && <p style={{ margin: '4px 0' }}>{color}</p>}
        </div>
    )
}

export default CarPreview
