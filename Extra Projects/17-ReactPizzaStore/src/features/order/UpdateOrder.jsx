/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
import { useState } from 'react';

function UpdateOrder({ order }) {
    const fetcher = useFetcher();
    const [clicked, setClicked] = useState();

    return (
        <fetcher.Form method="PATCH" className="text-right">
            <Button onClick={() => setClicked(true)} type="small">
                {clicked ? 'Prioritizing this order...' : 'Make Priority'}
            </Button>
        </fetcher.Form>
    );
}

export default UpdateOrder;

export async function action({ request, params }) {
    const data = { priority: true };
    await updateOrder(params.orderId, data);
    return null;
}
