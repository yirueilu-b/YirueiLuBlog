# Use Utterances Comments with React App and Github page

I am building my personal blog and wondering if there is a simple way to implement a simple comment system, and then I found Disqus which is very easy to install but unfortunately super slow and got some bugs with my React App. 

I finally got my comment system works with Utterances. It's a lightweight comments widget built on GitHub issues. This post is for taking a note of how to use it with React App and Github page in this post.

## Install Utterances

![](https://i.imgur.com/rpGDKAu.png)

Install Utterances is super simple, it just need few clicks and everything is done.

- Install the Utterances Github App for letting Utterances access your repository.

    [Install Utterances Github App here](https://github.com/apps/utterances)

- After Installing the App, get the Utterances scripts which should be included in the page later.

    [Check this page for auto generated script settings](https://utteranc.es/)

Utterances is ready to go now.

## Add Utterances in a React App

- Load the Utterances script in a component within `componentDidMount`

```
componentDidMount() {
        let script = document.createElement("script");
        let anchor = document.getElementById("inject-comments-for-uterances");
        script.setAttribute("src", "https://utteranc.es/client.js");
        script.setAttribute("crossorigin", "anonymous");
        script.setAttribute("async", true);
        script.setAttribute("repo", [USER_NAME/REPO_NAME]);
        script.setAttribute("issue-term", [UNIQUE_ID]);
        script.setAttribute("theme", [THEME]);
        anchor.appendChild(script);
}
```

I use `creat-react-app` to build the blog and use the `hash-router` in `react-router-dom` so there could be some issue when I load the comment widget.

Because the parameters after `#` would be ignored, Utterances bot will reference `url` or `path` to the root/base URL and all posts will load the same comments.

Therefore, at the `issue-term` attribute, I provide an unique ID of the post `UNIQUE_ID` so that the Utterances bot could reference to each posts independently.

- After loading the scripts, the comments are now ready to be rendered as below.

```
<div id="inject-comments-for-uterances">
</div>
```

The comment widget should have shown on the page and everything is done.

![](https://i.imgur.com/BEwSuJh.png)

## Reference

[example for react use #161](https://github.com/utterance/utterances/issues/161)

[2 Pages have same comments #119](https://github.com/utterance/utterances/issues/119)

###### tags: `Web`