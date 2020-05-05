import markdownIt from 'markdown-it';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttribution from 'markdown-it-attribution';
import markdownItEmoji from 'markdown-it-emoji';
import markdownItFigureCaption from 'markdown-it-figure-caption';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItGithubHeadings from 'markdown-it-github-headings';
import markdownItKatex from '@iktakahiro/markdown-it-katex';
import markdownItKbd from 'markdown-it-kbd';
import markdownItMdi from 'markdown-it-mdi';
import markdownItPrism from 'markdown-it-prism';
import markdownItSamp from 'markdown-it-samp';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

var md = new markdownIt({html: true})
    .use(markdownItAbbr)
    .use(markdownItAnchor)
    .use(markdownItAttribution)
    .use(markdownItEmoji)
    .use(markdownItFigureCaption)
    .use(markdownItFootnote)
    .use(markdownItGithubHeadings, {
        className: 'github-heading',
        prefixHeadingIds: true,
        prefix: 'head-',
        enableHeadingLinkIcons: true,
    })
    .use(markdownItKatex)
    .use(markdownItKbd)
    .use(markdownItMdi)
    .use(markdownItPrism)
    .use(markdownItSamp)
    .use(markdownItTocDoneRight);

var defaultLinkRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self)
{
    return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self)
{
    var attrIndex = tokens[idx].attrIndex('target');

    if (attrIndex < 0)
    {
        tokens[idx].attrPush(['target', '_blank']);
    }
    else
    {
        tokens[idx].attrs[attrIndex][1] = '_blank';
    }

    return defaultLinkRender(tokens, idx, options, env, self);
};

export { md };

