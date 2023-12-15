/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from '../../redux-store/cartSlice';

function DeleteItem({ children, pizzaId }) {
    const dispatch = useDispatch();

    return (
        <Button
            pizzaId={pizzaId}
            type="small"
            onClick={() => dispatch(deleteItem(pizzaId))}
        >
            {children}
        </Button>
    );
}

export default DeleteItem;
