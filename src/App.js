import { useState, useEffect } from "react"

export default function App() {
  const [inventory, setInventory] = useState([])
  const [newItem, setNewItem] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    fuel: "",
    cost: "",
  })

  useEffect(() => {
    getData()
  }, [])

  const placeholder = (event) => {
    setNewItem((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const getData = async () => {
    try {
      const response = await fetch("/api/getCars")
      const data = await response.json()
      setInventory(data)
    } catch (error) {
      console.log("Error in fetching data", error)
    }
  }

  const addCars = async () => {
    try {
      const response = await fetch("/api/addCars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
      })
      const data = await response.json()
      console.log("POST data", data)
      getData()
    } catch (error) {
      console.log("Error in POST data", error)
    }
  }


  const deleteCar = async (id) => {
    try {
      const response = await fetch(`/api/deleteCar/${id}`, {
        method: "DELETE"
      })
      const data = await response.json()
      console.log("delete data", data)
      getData()
    } catch (error) {
      console.log("Error deleting item")
    }
  }

  return (
    <>
      <h1> Car Dealership </h1>
      <h3> Reconditioned Cars, Reasonable Prices </h3>
      <p> New inventory item entry form: </p>
      <br />
      <div className="placeholders">
        <input name="brand" className="brand" placeholder="Brand" onChange={placeholder} value={newItem.brand} />
        <input name="model" className="model" placeholder="Model" onChange={placeholder} value={newItem.model} />
        <input name="year" className="year" placeholder="Year" onChange={placeholder} value={newItem.year} />
        <input name="color" className="color" placeholder="Color" onChange={placeholder} value={newItem.color} />
        <input name="fuel" className="fuel" placeholder="Fuel Type" onChange={placeholder} value={newItem.fuel} />
        <input name="cost" className="cost" placeholder="Cost" onChange={placeholder} value={newItem.cost} />
      </div>
      <button onClick={addCars}>Add to Inventory</button>

      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Fuel</th>
            <th>Cost</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) =>
            <tr key={item.id}>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.year}</td>
              <td>{item.color}</td>
              <td>{item.fuel}</td>
              <td>{item.cost}</td>
              <td><button onClick={() => deleteCar(item.id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
