
// Note: Mapbox integration
import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'

function Map({ searchResults }) {

  const [selectedLocation, setSelectedLocation] = useState({})

  const coordinates = searchResults.map(({lat, long}) => ({
    latitude: lat,
    longitude: long
  }))

  // Note: Compute the center from a bunch of coordinates
  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    height: '100%',
    width: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
  })

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/mehulgala007/cktq01f7n2qfw19ndw2d9v5m1'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={newViewport => setViewport(newViewport)}
    >
      {searchResults.map(result => (
        <div key={result.long}>
          <Marker
            latitude={result.lat}
            longitude={result.long}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p 
              className='cursor-pointer text-2xl animate-bounce'
              onClick={() => setSelectedLocation(result)}
            >
              📌
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (false)}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map
