import katex from '@iktakahiro/markdown-it-katex'
import highlight from './markdownItHighlight';

const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
});

md.use(katex);
md.use(highlight);

export default md