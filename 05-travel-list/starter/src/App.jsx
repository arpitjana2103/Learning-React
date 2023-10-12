const initialItems = [
    {id: 1, description: 'Passports', quantity: 2, packed: false},
    {id: 2, description: 'Socks', quantity: 12, packed: false},
    {id: 3, description: 'Charger', quantity: 1, packed: true},
    {id: 4, description: 'Glass', quantity: 2, packed: true},
];

function App() {
    return (
        <div className="app">
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    );
}

function Logo() {
    return (
        <h1>
            <span className="emoji">🏝️</span> Far Away
            <span className="emoji">🧳</span>
        </h1>
    );
}

function Form() {
    return (
        <div className="add-form">
            <h3>
                What do you need for your <span className="emoji">😍</span> trip
                ?
            </h3>
        </div>
    );
}

function PackingList() {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item) => (
                    <Item item={item} />
                ))}
            </ul>
        </div>
    );
}

function Item({item}) {
    const style = {textDecoration: 'line-through'};
    return (
        <li>
            <span style={item.packed ? style : null}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>
                <span className="emoji">👜</span> You have X items on your list,
                and you already packed X (X%)
            </em>
        </footer>
    );
}

export default App;
