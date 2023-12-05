/* eslint-disable react/prop-types */
import { formatCurrency } from '../../utilities/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
    const { quantity, name, totalPrice } = item;

    return (
        <li className="py-3">
            <div className="flex items-start justify-between gap-4 text-sm ">
                <div className="flex flex-col gap-2">
                    <p>
                        <span className="font-bold">{quantity}&times;</span>{' '}
                        {name}
                    </p>

                    <p className="text-sm capitalize italic text-stone-500">
                        {isLoadingIngredients
                            ? 'loading...'
                            : ingredients.join(', ')}
                    </p>
                </div>

                <p className="font-bold">{formatCurrency(totalPrice)}</p>
            </div>
        </li>
    );
}

export default OrderItem;
