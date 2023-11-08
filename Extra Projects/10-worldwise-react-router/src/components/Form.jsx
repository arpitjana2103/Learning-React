import {useEffect, useState} from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';
import {useUrlPosition} from '../hooks/useUrlPosition';

function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');

    const [emoji, setEmoji] = useState('');
    const [geoCodingErr, setGeoCodingErr] = useState('');

    const [mapLat, mapLng] = useUrlPosition();

    const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

    useEffect(
        function () {
            if (!mapLat && !mapLng) return;
            async function fetchCityData() {
                try {
                    setGeoCodingErr('');
                    setIsLoadingGeocoding(true);
                    const res = await fetch(
                        `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
                    );

                    const data = await res.json();

                    if (!data.countryCode)
                        throw new Error(
                            "That doesn't seem to be a city. Click somewhere else."
                        );
                    setCityName(data.city || data.locality || '');
                    setCountry(data.countryName);
                    setEmoji(convertToEmoji(data.countryCode));
                } catch (error) {
                    setGeoCodingErr(error.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }

            fetchCityData();
        },
        [mapLat, mapLng, BASE_URL]
    );

    if (isLoadingGeocoding) return <Spinner />;
    if (geoCodingErr) return <Message message={geoCodingErr} />;
    if (!mapLat && !mapLng)
        return <Message message="Start by Clicking on the Map" />;

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={`${styles.flag} emoji`}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
