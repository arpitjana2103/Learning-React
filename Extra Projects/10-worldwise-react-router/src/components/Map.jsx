import {useNavigate} from 'react-router-dom';
import styles from './Map.module.css';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvent,
} from 'react-leaflet';
import {useEffect, useState} from 'react';
import {useCities} from '../contexts/CitiesContext';
import {useGeolocation} from '../hooks/useGeoloacation';
import Button from './Button';
import {useUrlPosition} from '../hooks/useUrlPosition';

function Map() {
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
    const [mapLat, mapLng] = useUrlPosition();

    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
    } = useGeolocation();

    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    useEffect(
        function () {
            if (geoLocationPosition)
                setMapPosition([
                    geoLocationPosition.lat,
                    geoLocationPosition.lng,
                ]);
        },
        [geoLocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? 'Loading...' : 'Use your position'}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                scrollWheelZoom={false}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(function (city) {
                    return (
                        <Marker
                            key={city.id}
                            position={[city.position.lat, city.position.lng]}
                        >
                            <Popup>
                                <span className="emoji">{city.emoji}</span>{' '}
                                <span>{city.cityName}</span>
                            </Popup>
                        </Marker>
                    );
                })}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position, 10);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvent({
        click: function (e) {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
}

export default Map;
