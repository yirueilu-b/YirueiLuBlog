import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import React from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";

import 'highlight.js/styles/darcula.css';

import useStyles from './markdownStyle'
import md from './markdownIt'
import article_list from '../article_list.json'
import Disqus from "disqus-react"


class Article extends React.Component {
    state = {
        markdownHTML: null,
        disqusShortname: "yirueilublog",
        disqusConfig: {
            url: "",
            identifier: "",
            title: "",
        }
    };

    componentDidMount() {
        const articleList = JSON.parse(article_list);
        const article_info = articleList.filter(article => article['uuid'] === this.props.match.params.uuid)[0];
        const file_name = article_info['article_md_path'];
        this.setState({
                disqusConfig: {
                    url: window.location.href,
                    identifier: article_info['uuid'],
                    title: article_info['article_title'],
                }
            }
        );
        const markdownPath = require('../articles/' + file_name + '.md');
        fetch(markdownPath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                let markdownHTML = md.render(text);
                this.setState({markdownHTML: markdownHTML});
            });
    }

    render() {
        const {classes} = this.props;
        console.log(this.state.disqusConfig);
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
                    <Grid container
                          item
                          xs={12}
                          md={9}
                          className={classes.comment_section}
                    >
                        <Disqus.DiscussionEmbed
                            className={classes.disqus}
                            shortname={this.state.disqusShortname}
                            config={this.state.disqusConfig}
                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(withStyles(useStyles)(Article));
