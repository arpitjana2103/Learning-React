/* eslint-disable react/prop-types */
import { formatCurrency } from '../../utilities/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCartQty } from '../../redux-store/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQunatity from '../cart/UpdateItemQunatity';

function MenuItem({ pizza }) {
    const dispatch = useDispatch();
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

    const cartQty = useSelector(getCartQty(id));

    function handleAddToCart() {
        const newItem = {
            pizzaId: id,
            name: name,
            quantity: 1,
            unitPrice: unitPrice,
            totalPrice: unitPrice * 1,
        };
        dispatch(addItem(newItem));
    }

    return (
        <li className="flex gap-4 py-2">
            <img
                className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
                src={imageUrl}
                alt={name}
            />
            <div className="flex flex-grow flex-col pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitalize text-stone-500">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm font-medium uppercase text-stone-500">
                            Sold out
                        </p>
                    )}

                    {cartQty > 0 && (
                        <div className="flex gap-2 sm:gap-8">
                            <UpdateItemQunatity
                                pizzaId={id}
                                cartQunatity={cartQty}
                            />
                            <DeleteItem pizzaId={id}>Remove</DeleteItem>
                        </div>
                    )}

                    {cartQty === 0 && !soldOut && (
                        <Button type="small" onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
