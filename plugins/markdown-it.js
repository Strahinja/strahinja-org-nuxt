import { md } from '../markdown-it';

//eslint-disable-next-line no-unused-vars
export default({ app }, inject) =>
{
    inject('mdRender', markdown => md.render(markdown));
};

