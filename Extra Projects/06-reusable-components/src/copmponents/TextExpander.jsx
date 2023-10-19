import {useState} from 'react';

export default function TextExpander({
    collapsedNumWords = 20,
    expandButtonText = 'show more',
    collapseButtonText = 'show less',
    buttonColor = 'blue',
    expanded = false,
    className,
    children,
}) {
    const [isExpanded, setIsExpanded] = useState(expanded);
    const disPlayText = isExpanded
        ? children
        : children.split(' ').slice(0, collapsedNumWords).join(' ') + '...';

    const buttonSt = {
        background: 'none',
        border: 'none',
        font: 'inherit',
        cursor: 'pointer',
        marginLeft: '6px',
        color: buttonColor,
    };

    const boxSt = {
        padding: '20px',
        lineHeight: '20px',
        border: '1px solid #ccc',
        borderRadius: '7px',
        backgroundColor: '#f7f7f7',
        margin: '2rem 0rem',
    };

    return (
        <div style={boxSt}>
            <span>{disPlayText}</span>
            <button
                onClick={() => setIsExpanded((exp) => !exp)}
                style={buttonSt}
            >
                {isExpanded ? collapseButtonText : expandButtonText}
            </button>
        </div>
    );
}
