import SideBar from '../components/SideBar';
import Map from '../components/Map';
import styles from './AppLayout.module.css';

function appLayout() {
    return (
        <div className={styles.app}>
            <SideBar />
            <Map />
        </div>
    );
}

export default appLayout;
