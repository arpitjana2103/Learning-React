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
    return <div className="list">List</div>;
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
