import styles from './CityList.module.css';
import Spinner from '../components/Spinner';
import CityItem from './CityItem';
import Message from '../components/Message';
import {useCities} from '../contexts/CitiesContext';

function CityList() {
    const {cities, isLoading} = useCities();

    if (isLoading) return <Spinner />;
    if (cities.length === 0) {
        return <Message message="Add your first city by clicking on the Map" />;
    }
    return (
        <ul className={styles.cityList}>
            {cities.map(function (city) {
                return <CityItem key={city.id} city={city} />;
            })}
        </ul>
    );
}

export default CityList;
