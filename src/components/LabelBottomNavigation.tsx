import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
// import BeenhereIcon from '@material-ui/icons/Beenhere';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
// import GradeIcon from '@material-ui/icons/Grade';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
const useStyles = makeStyles(theme => ({

  appBar: {
    top: 'auto',
    bottom: 0,
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  fabButton: {
    width: theme.spacing(8),
    height: theme.spacing(8),

    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function LabelBottomNavigation({  }) {
  const classes = useStyles();
  const location = useLocation();
  const value = location.pathname ;
  // const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    // setValue(newValue);
  };

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      {/* <Fab component={NavLink} to="/own" color="secondary" aria-label="add" className={classes.fabButton}>
                <CenterFocusWeakIcon />
            </Fab> */}
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction color="secondary" component={NavLink} to="/maps" label="地圖" value="/maps" icon={<EqualizerIcon />} />
        <BottomNavigationAction color="secondary" component={NavLink} to="/stories" label="地圖故事" value="/stories" icon={<FavoriteIcon />} />
        <BottomNavigationAction color="secondary" component={NavLink} to="/camera" label="拍照" value="/camera" icon={<CenterFocusWeakIcon />} />
        <BottomNavigationAction color="secondary" component={NavLink} to="/achievement" label="成就" value="/achievement" icon={<EmojiEventsIcon />} />
        <BottomNavigationAction color="secondary" component={NavLink} to="/share" label="分享" value="/share" icon={<Avatar
          alt="Your head"
          // src={profile && profile.pictureUrl}
          className={classes.smallAvatar}
        />} />
      </BottomNavigation>
    </AppBar>
  );
}
