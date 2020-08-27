import ReactMarkdown from 'react-markdown'
import Container from '@material-ui/core/Container'
import React from "react";
import {useParams} from "react-router-dom";
import {withStyles} from "@material-ui/core";

// import ReactMarkdown from 'react-markdown';

const useStyles = {
    root: {
        flexGrow: 1,
        maxWidth: '60vw',
        padding: 0,
        textAlign: 'center',
        overflow: 'hidden',
    },
};

class WhatsNew extends React.Component {
    state = {
        post: null,
    };

    componentDidMount() {
        let file_name = 'Use Python to Build a BTC Auto Trader on Poloniex.md';
        const markdownPath = require('../articles/' + file_name);

        fetch(markdownPath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({post: text})
            })
    }

    render() {
        const {classes} = this.props;
        const {post} = this.state;
        return (
            <Container className={classes.root}>
                <ReactMarkdown source={post}/>
            </Container>
        );
    }
}

export default withStyles(useStyles)(WhatsNew);
