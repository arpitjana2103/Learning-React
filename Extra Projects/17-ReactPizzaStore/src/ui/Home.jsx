import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import { getTotalCartQuantity } from '../redux-store/cartSlice';

function Home() {
    const username = useSelector(function (state) {
        return state.user.username;
    });

    const cartQunatity = useSelector(getTotalCartQuantity);

    return (
        <div className="my-10 h-full px-4 text-center sm:my-16">
            <div>
                <img
                    src="https://i.pinimg.com/564x/61/63/3b/61633b124746dadf8df7c911c3cec274.jpg"
                    alt="hero img"
                    className="m-auto my-10 w-60 border-4 border-red-600"
                />
            </div>
            <h1 className="mb-8 text-xl  font-semibold text-stone-700 md:text-3xl">
                The best pizza.
                <br />
                <span className="text-red-600">
                    Straight out of the oven, straight to you.
                </span>
            </h1>

            {username === '' ? (
                <CreateUser haveCart={cartQunatity > 0} />
            ) : (
                <Button
                    to={cartQunatity > 0 ? '/cart' : '/menu'}
                    type="primary"
                >
                    Continue Ordering, {username}{' '}
                    <span className="emoji-txt">🤤</span>
                </Button>
            )}
        </div>
    );
}

export default Home;
