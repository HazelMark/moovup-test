import * as React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { requestThunk } from '../store/requestContainerSlice'
import { GetFriends, GetFriendsAlias } from '../services/FriendApi'
import type { Friend } from '../typing/model'

type Props = {
};
  
const HomePage = (props: Props) => {
  const dispatch = useDispatch();

  const [lastUpdate, setLastUpdate] = React.useState(new Date());

  const myFriends: any[] = useSelector((state: any) => state.data.friends);  
  const reqGetFriends: any = useSelector((state: any) => state.container.container[GetFriendsAlias]);

  // Actions
  const handleRefresh = async (): Promise<any> => {
    return await new Promise((resolve, reject) => {    
      setLastUpdate(new Date())
      resolve("done")
    })
  }

  // Request
  useEffect(() => {
    dispatch(requestThunk(GetFriends()));
  }, [lastUpdate]);
  
  useEffect(() => {
  }, [myFriends]);

  return (
      <PullToRefresh onRefresh={handleRefresh} >
        <List sx={{ maxWidth: '100%', maxHeight: 'calc(100vh - 160px)', overflow: 'auto', bgcolor: 'background.paper' }}>
          
        {myFriends.map((person:Friend) => (
          <ListItem>
            <ListItemButton component={Link} to={`/Friend/${person._id}`}>
              <ListItemAvatar>
                <Avatar>
                  <img src={person.picture} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${person.name?.first}, ${(person.name?.last ?? "").toUpperCase() }`} secondary={person.email} />
              </ListItemButton>
          </ListItem>
        ))}
        </List>
      </PullToRefresh>
  )
}

export default HomePage;

