import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Maps = ({start, end}: any) => (
  <APIProvider apiKey={"AIzaSyDc1twOSQPAQJovZ0CzmtJCuDwPQ41i4oQ"}>
    <Map
      style={{width: '100vw', height: '300px'}}
      defaultCenter={start}
      zoom={13.5}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
        <Marker position={start} />
        <Marker position={end} />
  
    </Map>
  </APIProvider>
);
