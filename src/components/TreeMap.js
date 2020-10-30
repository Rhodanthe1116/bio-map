import React, { useState, useEffect } from 'react';

// examples:
import GoogleMap from './GoogleMap';

// component

// my component
import TreeMarker from './TreeMarker'
import UserMarker from './UserMarker'

const ntuLocation = {
    center: {
        lat: 25.017319,
        lng: 121.538977
    },
    zoom: 16,
}
const NTU_CENTER = [25.017319, 121.538977]

function TreeMap({ trees, onTreeClick }) {

    const [donate, setDonate] = useState(false)
    const [donatedTree, setDonatedTree] = useState(null)
    function donateTree(tree) {
        setDonatedTree(tree)
        setDonate(true)
    }

    const [userLocation, setUserLocation] = useState({
        lat: 12.12,
        lng: 13.123,
    });
    useEffect(() => {
        const resetUserLocation = setInterval(async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(pos);
                }, function () {
                    handleLocationError(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false);
            }
            function handleLocationError(browserHasGeolocation) {
                console.log(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
            }

        }, 2000);
        return () => clearInterval(resetUserLocation);



    }, []);

    return (
        <>
            <GoogleMap
                defaultZoom={ntuLocation.zoom}
                defaultCenter={NTU_CENTER}
            >
                <UserMarker
                    key={0}
                    lat={userLocation.lat}
                    lng={userLocation.lng}
                    show={true}
                    open={true}
                />
                {trees && trees.map(tree =>
                    (<TreeMarker
                        key={tree.id}
                        lat={tree.lat}
                        lng={tree.lng}
                        show={true}
                        tree={tree}
                        onDonateClick={donateTree}
                        onTreeClick={onTreeClick}
                    />))}
            </GoogleMap>

        </>
    );
}

export default TreeMap;
