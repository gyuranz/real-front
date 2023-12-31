import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import { primaryBgColor } from "./components/Styles";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400&display=swap');
    /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
    box-sizing: border-box;
}
body {
    ${primaryBgColor}
    font-weight: 300;
    font-family: 'Source Sans 3', sans-serif;
    /* background:linear-gradient(135deg,#00d2d3,#5f27cd); */

    /* background: linear-gradient(90deg, rgba(106,0,255,0.7) 0%, rgba(77,108,207,0.7) 69%, rgba(255,130,219,0.5) 100%); */
    /* background: linear-gradient(90deg, rgba(106,0,255,0.7) 0%, rgba(77,108,207,0.7) 67%, rgba(95,89,208,0.7) 70%, rgba(220,130,255,0.7) 100%); */
    /* background: linear-gradient(90deg, rgba(126,180,58,1) 0%, rgba(29,253,187,1) 4%, rgba(69,140,252,1) 100%); */

    /* color: white; */
    line-height: 1.2;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
a {
    text-decoration: none;
    color: inherit;
}
.videos_portal_styles {
    /* margin-left: 20%; */
    /* height: calc(100vh - 10%); */
    /* flex-wrap: wrap; */
    /* width: 60vw; */
    /* max-width: 60vw; */
    /* height: 80vh; */
    /* left: 5vw; */
    /* top: 10vh; */
    /* position: absolute; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    padding-top: 3vh;
}
video {
    border-radius: 10px;
}

#dummy_video_canvas {
  display: none;
}
div {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
div::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

`;

ReactDOM.render(
    <RecoilRoot>
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
    </RecoilRoot>,
    document.getElementById("root")
);
