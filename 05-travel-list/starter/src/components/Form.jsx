import {useState} from 'react';

export default function Form({onAddItem}) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = {description, quantity, packed: false, id: Date.now()};
        onAddItem(newItem);
        setDescription('');
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>
                What do you need for your
                <span className="emoji">😍</span> trip ?
            </h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
            >
                {new Array(20).fill(0).map(function (el, ind) {
                    return (
                        <option value={ind + 1} key={ind + 1}>
                            {ind + 1}
                        </option>
                    );
                })}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
