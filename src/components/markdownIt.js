import katex from '@iktakahiro/markdown-it-katex'
import hljs from 'highlight.js';

const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code class="hljs">' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) {
            }
        } else {
            try {
                return '<pre class="hljs"><code class="hljs">' + hljs.highlightAuto(str).value + '</code></pre>';
            } catch (__) {
            }
        }
        return '<pre class="hljs"><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
    },
});

md.use(katex);

export default md