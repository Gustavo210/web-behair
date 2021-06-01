import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import MarkerIcon from '../../utils/markerIcon'

interface PropsMapContainer {
  handleMapClick: (event: LeafletMouseEvent) => void
  position: {
    latitude: number
    longitude: number
  }
}
const MapContainer: React.FC<PropsMapContainer> = (props) => {
  return (
    <Map
      center={[-19.8736366, -44.9973021]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      onclick={props.handleMapClick}
    >
      {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAP}`}
      />

      {props.position.latitude !== 0 && (
        <Marker
          interactive={false}
          icon={MarkerIcon}
          position={[props.position.latitude, props.position.longitude]}
        >
          Teste
        </Marker>
      )}
    </Map>
  )
}

export default MapContainer
