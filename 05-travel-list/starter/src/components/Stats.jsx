export default function Stats({items}) {
    const numItems = items.length;

    if (numItems === 0) {
        return (
            <footer className="stats">
                <p>
                    Start Packing <span className="emoji">🤪</span>
                </p>
            </footer>
        );
    }

    const packedItems = items.filter((item) => item.packed).length;
    const percentage = Math.round((packedItems / numItems) * 100);
    return (
        <footer className="stats">
            {percentage === 100 ? (
                <p>
                    Now your are good to go! <span className="emoji">✈</span>
                </p>
            ) : (
                <p>
                    <span className="emoji">👜</span> You have {numItems} items
                    on your list, and you already packed {packedItems} (
                    {percentage}%)
                </p>
            )}
        </footer>
    );
}
