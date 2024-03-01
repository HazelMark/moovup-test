import * as React from 'react'
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import Map, {Marker} from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import type { Friend } from '../typing/model'
import { useParams } from 'react-router'

const FreindDetailsPage = () => {
  const dispatch = useDispatch();
  const markerRef = useRef<mapboxgl.Marker>();
  
  const { id } = useParams() as { id: string };

  const [myFriend, setMyFriend] = React.useState<Friend>();
  const [lastUpdate, setLastUpdate] = React.useState(new Date());

  const myFriends: any[] = useSelector((state: any) => state.data.friends);  

  useEffect(() => {
    setMyFriend(myFriends.find((f:Friend) => f._id === id));
  }, [myFriends, id]);

  useEffect(() => {
    console.log(myFriend)
  }, [myFriend]);

  return <div style={{ width: '100%', maxWidth: 640, backgroundColor: 'background.paper' }}>    
    <Map mapboxAccessToken={'pk.eyJ1IjoidGhpc21hcmsxMjI3IiwiYSI6ImNsdDd2OHhuazAxb3EybG53ZWR1cXI4aDgifQ.-fi1SW6cBUK5AeeKyMifEg'}
        initialViewState={{ 
          latitude: myFriend?.location?.latitude ?? -1, 
          longitude: myFriend?.location?.longitude ?? -1,
          zoom: 5,
      }}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
    <Marker 
      latitude={myFriend?.location?.latitude ?? -1} 
      longitude={myFriend?.location?.longitude ?? -1} 
      
      color="red"  />  
    </Map>
  </div>
}


const Background = styled('div')({
    position: 'relative',
    display: 'flex',
    '-webkit-box-pack': 'center',
    
    justifyContent: 'center',
    
    padding: '24px',
    backgroundColor: 'rgba(243, 246, 249, 0.6)',
    border: '1px solid rgb(229, 234, 242)',

  });

export default FreindDetailsPage;

