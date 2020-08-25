import React from 'react';
import './App.css';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import {unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';


import Navbar from './components/Navbar'
import ArticleList from './components/ArticleList'

let myTheme = unstable_createMuiStrictModeTheme({
    palette: {
        type: 'dark'
    }
});

const useStyles = {
    root: {
        flexGrow: 1,
        maxWidth: '100vw',
        minHeight: 'calc(100vh - 68px)',
        textAlign: 'center',
    },
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: myTheme,
        };
        this.toggleDarkTheme = this.toggleDarkTheme.bind(this)
    }

    toggleDarkTheme = (event) => {
        let newPaletteType = this.state.theme.palette.type === "light" ? "dark" : "light";
        myTheme = unstable_createMuiStrictModeTheme({palette: {type: newPaletteType}});
        this.setState({theme: myTheme});
    };

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={myTheme}>
                <CssBaseline/>
                <Container className={classes.root}>

                    <div className="App">
                        <Navbar theme={this.state.theme} onToggleDark={this.toggleDarkTheme}/>
                        <ArticleList/>
                    </div>

                </Container>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(App);

