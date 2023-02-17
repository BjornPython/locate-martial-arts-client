import "../css/addresses.css"

function Addresses({ x, y, label, handleAddressClick }) {
    return (
        <div onClick={() => { handleAddressClick(x, y) }} className="address-sg">
            <h3 className="address-label">{label}</h3>
        </div>
    )
}

export default Addresses