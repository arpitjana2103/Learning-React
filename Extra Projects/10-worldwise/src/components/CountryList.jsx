import styles from './CountrYList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

function CountryList({cities, isLoading}) {
    if (isLoading) return <Spinner />;

    if (cities.length === 0) {
        return <Message message="Add your first city by clicking on the Map" />;
    }

    const countries = Object.values(
        cities.reduce(function (prev, curr) {
            prev[curr.country] = curr;
            return prev;
        }, {})
    );

    return (
        <ul className={styles.countryList}>
            {countries.map(function (country) {
                return <CountryItem key={country.id} country={country} />;
            })}
        </ul>
    );
}

export default CountryList;
