import ReactMarkdown from 'react-markdown'
import Container from '@material-ui/core/Container'
import React from "react";
import {useParams, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";

// import ReactMarkdown from 'react-markdown';

const useStyles = {
    root: {
        flexGrow: 1,
        // maxWidth: '',
        padding: 0,
        textAlign: 'left',
        overflow: 'hidden',
    },
};

class Article extends React.Component {
    state = {
        post: null,
    };

    componentDidMount() {
        const file_name = this.props.match.params.file_name;
        const markdownPath = require('../articles/' + file_name + '.md');
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

export default withRouter(withStyles(useStyles)(Article));
