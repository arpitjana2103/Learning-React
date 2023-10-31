import {NavLink} from 'react-router-dom';
import styles from './pageNav.module.css';

function pageNav() {
    return (
        <div>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pricing">Pricing</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product">Product</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default pageNav;
