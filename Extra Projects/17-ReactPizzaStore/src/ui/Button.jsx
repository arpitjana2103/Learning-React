import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ children, disabled, to, type, onClick }) {
    const base =
        'inline-block rounded-full bg-red-600 font-semibold uppercase tracking-wide text-stone-50 transition-colors hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed text-sm';

    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: base + ' px-2.5 py-1 md:px-3.5 md:py-2',
        secondary:
            'inline-block rounded-full border-2 border-stone-200 font-semibold uppercase tracking-wide text-stone-400 transition-colors hover:bg-stone-300 focus:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-4 text-sm',
    };

    if (to) {
        return (
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        );
    }
    return (
        <button
            onClick={onClick ? onClick : () => {}}
            className={styles[type]}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
