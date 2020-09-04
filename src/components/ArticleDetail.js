import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import React from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";

import 'highlight.js/styles/darcula.css';

import useStyles from './markdownStyle'
import md from './markdownIt'
import article_list from '../article_list.json'
import ScrollToTopOnMount from './ScrollTopOnMount'

const articleList = JSON.parse(article_list);


class Article extends React.Component {
    constructor() {
        super();
        this.state = {
            markdownHTML: null,
        };
    }
    componentDidMount() {
        const article_info = articleList.filter(article => article['uuid'] === this.props.match.params.uuid)[0];
        const file_name = article_info['article_md_path'];
        const markdownPath = require('../articles/' + file_name + '.md');
        fetch(markdownPath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                let markdownHTML = md.render(text);
                this.setState({markdownHTML: markdownHTML});
            });
        // comment info
        let script = document.createElement("script");
        let anchor = document.getElementById("inject-comments-for-uterances");
        script.setAttribute("src", "https://utteranc.es/client.js");
        script.setAttribute("crossorigin", "anonymous");
        script.setAttribute("async", true);
        script.setAttribute("repo", "yirueilu-b/YirueiLuBlog");
        script.setAttribute("issue-term", article_info['uuid']);
        script.setAttribute("theme", this.props.theme.palette.type === 'dark' ? "github-dark" : "github-light");
        anchor.appendChild(script);
    }

    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.root}>
                <ScrollToTopOnMount/>
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
                        <div className={classes.disqus} id="inject-comments-for-uterances">
                        </div>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(withStyles(useStyles)(Article));
