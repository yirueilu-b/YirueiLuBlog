import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import React from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";

import 'highlight.js/styles/darcula.css';

import useStyles from './markdownStyle'
import md from './markdownIt'

class Article extends React.Component {
    state = {
        markdownHTML: null,
    };

    componentDidMount() {
        const file_name = this.props.match.params.file_name;
        const markdownPath = require('../articles/' + file_name + '.md');
        fetch(markdownPath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                let markdownHTML = md.render(text);
                this.setState({markdownHTML: markdownHTML});
            })
    }

    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.root}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="flex-start"
                    justify="center">

                    <Grid container
                          item
                          xs={12}
                          md={9}
                          className={classes.article_section}
                    >
                        <div
                            className={classes.markdown_style}
                            dangerouslySetInnerHTML={{__html: this.state.markdownHTML}}>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(withStyles(useStyles)(Article));
