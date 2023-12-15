import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearCart,
    getCart,
    getTotalCartQuantity,
} from '../../redux-store/cartSlice';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Cart() {
    const cart = useSelector(getCart);
    const username = useSelector(function (state) {
        return state.user.username;
    });
    const dispatch = useDispatch();
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const navigate = useNavigate();

    useEffect(
        function () {
            if (!username) navigate('/');
        },
        [username, navigate],
    );

    if (!totalCartQuantity) return <EmptyCart />;

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <h2 className="mt-7 text-xl font-semibold">
                Your cart, {username}
            </h2>

            <ul className="mt-3 divide-y divide-stone-200 border-b">
                {cart.map(function (item) {
                    return <CartItem item={item} key={item.pizzaId} />;
                })}
            </ul>

            <div className="mt-6 space-x-2">
                {/* <Link to="/order/new">Order pizzas</Link> */}
                <Button type="primary" to="/order/new">
                    Order pizzas
                </Button>
                <Button type="secondary" onClick={() => dispatch(clearCart())}>
                    Clear cart
                </Button>
            </div>
        </div>
    );
}

export default Cart;
