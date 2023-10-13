import {useState} from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

const initialItems = [
    // {id: 1, description: 'Passports', quantity: 2, packed: false},
    // {id: 2, description: 'Socks', quantity: 12, packed: false},
    // {id: 3, description: 'Charger', quantity: 1, packed: true},
    // {id: 4, description: 'Glass', quantity: 2, packed: true},
];

function App() {
    const [items, setItems] = useState(initialItems);

    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? {...item, packed: !item.packed} : item
            )
        );
    }

    function handleClearItems() {
        const confirmed = window.confirm('Clear the List ?');
        if (confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItem} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
                onClearItems={handleClearItems}
            />
            <Stats items={items} />
        </div>
    );
}

export default App;
