import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
    getTotalCartPrice,
    getTotalCartQuantity,
} from '../../redux-store/cartSlice';
import { formatCurrency } from '../../utilities/helpers';

function CartOverview() {
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const location = useLocation();

    if (!totalCartQuantity) return null;
    return (
        <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
            <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
                <span>{totalCartQuantity} pizzas</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>

            {location.pathname !== '/cart' && (
                <Link to="/cart">Open cart &rarr;</Link>
            )}
        </div>
    );
}

export default CartOverview;