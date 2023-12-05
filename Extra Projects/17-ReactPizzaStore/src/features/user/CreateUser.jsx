/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from '../../redux-store/userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser({ haveCart }) {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username) return;
        dispatch(updateName(username));

        navigate(haveCart ? '/cart' : '/menu');
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="mb-4 text-sm text-stone-600 md:text-base">
                <span className="emoji-txt">👋</span> Welcome! Please start by
                telling us your name,
            </p>

            <input
                type="text"
                placeholder="Enter Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input mb-8 w-72"
            />

            {username && (
                <div>
                    <Button type="primary">
                        {' '}
                        {haveCart ? 'Continue Ordering' : 'Visit Menu'}
                    </Button>
                </div>
            )}
        </form>
    );
}

export default CreateUser;
