import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importing the CSS file for styling

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  // Fetch all items
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:8080/api/inventory')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching items:', error));
  };

  // Add item
  const addItem = () => {
    axios.post('http://localhost:8080/api/inventory', newItem)
      .then(() => {
        fetchItems();  // Refresh items list after adding
        setNewItem({ name: '', quantity: 0 });  // Reset form
      })
      .catch(error => console.error('Error adding item:', error));
  };

  // Delete item
  const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/api/inventory/${id}`)
      .then(() => {
        fetchItems();  // Refresh items list after deleting
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="app-container">
      <h1>Inventory Management</h1>
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item">
            <span>{item.name} (Quantity: {item.quantity})</span>
            <button onClick={() => deleteItem(item.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
          className="input-field"
        />
        <button onClick={addItem} className="add-button">Add Item</button>
      </div>
    </div>
  );
}

export default App;
