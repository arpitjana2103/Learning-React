/* eslint-disable react-refresh/only-export-components */
// https://uibakery.io/regex-library/phone-number

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearCart,
    getCart,
    getTotalCartPrice,
} from '../../redux-store/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../redux-store/store';
import { formatCurrency } from '../../utilities/helpers';
import { useState } from 'react';
import { fetchAddress } from '../../redux-store/userSlice';

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const dispatch = useDispatch();

    const formErrors = useActionData();

    const cart = useSelector(getCart);

    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

    const {
        username,
        status: addressStatus,
        position,
        address,
        error: errorAddress,
    } = useSelector(function (state) {
        return state.user;
    });

    const isLodingAddress = addressStatus === 'loading';

    if (!cart.length) return <EmptyCart />;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8  text-xl font-semibold ">
                Ready to order? Let&apos;s go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="text"
                            name="address"
                            disabled={isLodingAddress}
                            defaultValue={address}
                            required
                        />
                        {errorAddress && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>

                    {!position.latitude && !position.longitude && (
                        <span className="absolute right-[3px] top-[35px] sm:top-[3px] md:top-[5px]">
                            <Button
                                type="small"
                                disabled={isLodingAddress}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(fetchAddress());
                                }}
                            >
                                Get Position
                            </Button>
                        </span>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        className="focus:ring-red-40 h-6 w-6 cursor-pointer accent-red-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label className="font-medium" htmlFor="priority">
                        Want to you give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.longitude
                                ? `${position.latitude}, ${position.longitude}`
                                : ''
                        }
                    />
                    <Button
                        type="primary"
                        disabled={isSubmitting || isLodingAddress}
                    >
                        {isSubmitting
                            ? 'Placing Order...'
                            : `Order Now ${formatCurrency(
                                  totalCartPrice + priorityPrice,
                              )}`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    };

    const errors = {};
    if (!isValidPhone(order.phone))
        errors.phone = 'Please give us your correct phone number.';

    if (Object.keys(errors).length > 0) return errors;

    // If everything is okk create New Order !
    const newOrder = await createOrder(order);

    // Clear Cart // Hack // Do not overUse
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
