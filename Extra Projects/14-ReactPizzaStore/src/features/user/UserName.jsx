import { useSelector } from 'react-redux';

function UserName() {
    // Getting User form Redux - Store
    const username = useSelector(function (state) {
        return state.user.username;
    });

    if (!username) return null;

    return (
        <div className="hidden text-sm font-semibold text-slate-50 md:block">
            {username}
        </div>
    );
}

export default UserName;
