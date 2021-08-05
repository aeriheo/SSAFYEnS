import React, {useState} from 'react';
import store from 'store';
import {useHistory} from 'react-router-dom';
import {AppBar, Typography, Toolbar, Button, Grid, IconButton, Divider, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import GroupIcon from '@material-ui/icons/Group';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Wrapper from './styles';
import logo from '../../images/logo2.png';

const Header = props=>{
    let history = useHistory();
    const [open, setOpen] = useState(false);
    const [islogin, setLogin] = useState(true);
    
    const handleDrawerOpen = () =>{  
        setOpen(true);
    };

    const handleDrawerClose = () =>{ 
        setOpen(false);
    };

    const handleLogin = () => {
        setLogin(true);
    };

    const handleLogout = () => {
        setLogin(false);
    };

    const onClickRedirectPathHandler = name => e =>{
        window.scrollTo(0, 0);
        if ( name === '/plan'){
            if(history.location.pathname === name){
                history.goBack();
                store.remove('plan');
            }else{
                history.push(name);
            }
        }else if ( name === '/'){
            if(history.location.pathname === name){
                history.goBack();
                store.remove('/');
            }else{
                history.push(name);
            }
        }else if ( name === '/login'){
            if(history.location.pathname === name){
                history.goBack();
                store.remove('/login');
            }else{
                history.push(name);
            }
        }

        
    };

    return(
        <Wrapper >
            <AppBar style={{background:'#ffffff', color:'#A3CCA3'}}>
                <Grid container justifyContent='space-between' direction = "row" alignItems = "center">     
                    <Grid>
                        <Toolbar>
                            <IconButton onClick = {handleDrawerOpen}>
                                <MenuIcon fontSize = "large" style={{color:'#A3CCA3'}} />
                            </IconButton>
                        </Toolbar>
                    </Grid>
                    <Grid >
                        <Typography variant = "h3" onClick={onClickRedirectPathHandler('/')}>
                            <img src={logo} style={{width:'250px', height:'80px', marginTop:'3px'}}/>
                        </Typography>
                    </Grid>
                    <Grid style ={{justifyContent:'space-between'}}>
                        {islogin?(
                            <div>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}}>jbj님 환영합니다</Button>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}} onClick={handleLogout}>로그아웃</Button>
                            </div>
                        ):(
                            <div>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}}>회원가입</Button>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}}
                            onClick={onClickRedirectPathHandler('/login')}>로그인</Button>
                            </div>
                        )}
                    </Grid>
                </Grid>           
            </AppBar>
            <Drawer anchor = "left" open = {open}>
                <div>
                    <IconButton onClick = {handleDrawerClose} edge = 'end' >
                        <ArrowLeftIcon fontSize = "large" style={{color:'#A3CCA3'}} />
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button onClick={onClickRedirectPathHandler('/plan')}>
                            <CalendarTodayIcon fontSize = "large" style={{color:'#A3CCA3', margin:'10px'}} />
                            <ListItemText primary="일정" style={{color:'#A3CCA3', margin:'10px', fontWeight:'bold'}}/>
                    </ListItem>
                    <ListItem button>
                            <GroupIcon fontSize = "large" style={{color:'#A3CCA3', margin:'10px'}} />
                            <ListItemText primary="그룹" style={{color:'#A3CCA3', margin:'10px', fontWeight:'bold'}}/>
                    </ListItem>
                </List>
            </Drawer>
        </Wrapper>
    );
};

export default Header;