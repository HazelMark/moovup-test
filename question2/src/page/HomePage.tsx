import * as React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { requestThunk } from '../store/requestContainerSlice'
import { GetFriends, GetFriendsAlias } from '../services/FriendApi'
import type { Friend } from '../typing/model'




type Props = {
};
  
const HomePage = (props: Props) => {
  const dispatch = useDispatch();

  const [whenRequestSuccess, setSuccess] = React.useState();
  const [whenRequestFail, setFail] = React.useState<Function>(():void=>{});
  const [lastUpdate, setLastUpdate] = React.useState(new Date());

  const myFriends: any[] = useSelector((state: any) => state.data.friends);  
  const reqGetFriends: any = useSelector((state: any) => state.container.container[GetFriendsAlias]);

  // Actions
  const handleRefresh = async (): Promise<any> => {
    return await new Promise((resolve, reject) => {       
      // setSuccess(resolve)
      // setFail(reject)    
    })
  }

  // Request
  useEffect(() => {
    dispatch(requestThunk(GetFriends()));
  }, [lastUpdate]);
  
  useEffect(() => {
  }, [myFriends]);

  useEffect(() => {
    console.log(reqGetFriends)
    if (reqGetFriends?.isDone === true) {
      // whenRequestSuccess('');
    }
    else if (reqGetFriends) {

    }
  }, [reqGetFriends]);

  return (
    <Background>
        <PullToRefresh onRefresh={handleRefresh}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {myFriends.map((person:Friend) => (
          <ListItem>
            <ListItemButton component={Link} to={`/Friend/${person._id}`}>
              <ListItemAvatar>
                <Avatar>
                  <img src={person.picture} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${person.name?.first}, ${(person.name?.last ?? "").toUpperCase() }`} secondary={person.email} />
              <ListItemText secondary={`${person.location?.latitude}, ${(person.location?.longitude ?? "") }`} />
              </ListItemButton>
          </ListItem>
        ))}
        </List>
        </PullToRefresh>
    </Background>
  )
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

export default HomePage;

