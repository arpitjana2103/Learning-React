import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
    return (
        <div className="flex items-center justify-between border-b border-stone-200 bg-red-600 px-4 py-3 font-semibold uppercase sm:px-6">
            <Link to="/" className="text-xl font-medium text-slate-50">
                Red Pizza Co.
            </Link>
            <div className="flex items-center gap-3">
                <SearchOrder />
                <UserName />
            </div>
        </div>
    );
}

export default Header;
