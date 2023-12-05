/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import {
    decreaseItemQty,
    increaseItemQuantity,
} from '../../redux-store/cartSlice';

function UpdateItemQunatity({ pizzaId, cartQunatity }) {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-2 md:gap-3">
            <Button
                onClick={() => dispatch(increaseItemQuantity(pizzaId))}
                type="round"
            >
                +
            </Button>
            <span className="font-medium">{cartQunatity}</span>
            <Button
                onClick={() => dispatch(decreaseItemQty(pizzaId))}
                type="round"
            >
                -
            </Button>
        </div>
    );
}

export default UpdateItemQunatity;
