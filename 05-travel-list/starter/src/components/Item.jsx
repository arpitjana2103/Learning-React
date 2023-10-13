export default function Item({item, onDeleteItem, onToggleItem}) {
    const style = {textDecoration: 'line-through'};
    return (
        <li>
            <input
                type="checkbox"
                checked={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? style : null}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}
