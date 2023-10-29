function Options({question}) {
    return (
        <div className="options">
            {question.options.map(function (option) {
                return (
                    <button className="btn btn-option" key={option}>
                        {option}
                    </button>
                );
            })}
        </div>
    );
}

export default Options;
