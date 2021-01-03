import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vsDark, githubLight } from "./SyntaxHighligherStyles";
/* istanbul ignore next - Don’t crash on old React. */
const supportsStringRender = parseInt((React.version || "16").slice(0, 2), 10) >= 16;
const createElement = React.createElement;

export const Renderers = {
  break: "br",
  paragraph: "p",
  emphasis: "em",
  strong: "strong",
  thematicBreak: "hr",
  blockquote: "blockquote",
  delete: "del",
  link: "a",
  image: "img",
  linkReference: "a",
  imageReference: "img",
  table: SimpleRenderer.bind(null, "table"),
  tableHead: SimpleRenderer.bind(null, "thead"),
  tableBody: SimpleRenderer.bind(null, "tbody"),
  tableRow: SimpleRenderer.bind(null, "tr"),

  root: Root,
  text: TextRenderer,
  list: List,
  listItem: ListItem,
  definition: NullRenderer,
  heading: Heading,
  inlineCode: InlineCode,
  code: CodeBlock,
  html: Html,
  virtualHtml: VirtualHtml,
  parsedHtml: ParsedHtml,
};

function TextRenderer(props) {
  /* istanbul ignore next - a text node w/o a value could be injected by plugins */
  const children = props.children || "";
  /* istanbul ignore next - `span` is a fallback for old React. */
  return supportsStringRender ? children : createElement("span", null, children);
}

function Root(props) {
  const { className } = props;
  const root = (!className && React.Fragment) || "div";
  return createElement(root, className ? { className } : null, props.children);
}

function SimpleRenderer(tag, props) {
  return createElement(tag, getCoreProps(props), props.children);
}

function Heading(props) {
  return createElement(`h${props.level}`, getCoreProps(props), props.children);
}

function List(props) {
  const attrs = getCoreProps(props);
  if (props.start !== null && props.start !== 1 && props.start !== undefined) {
    attrs.start = props.start.toString();
  }

  return createElement(props.ordered ? "ol" : "ul", attrs, props.children);
}

function ListItem(props) {
  let checkbox = null;
  if (props.checked !== null && props.checked !== undefined) {
    const checked = props.checked;
    checkbox = createElement("input", { type: "checkbox", checked, readOnly: true });
  }

  return createElement("li", getCoreProps(props), checkbox, props.children);
}

function CodeBlock({ language, value }) {
  return (
    <SyntaxHighlighter language={language} style={githubLight}>
      {value}
    </SyntaxHighlighter>
  );
}

function InlineCode(props) {
  return createElement("code", getCoreProps(props), props.children);
}

function Html(props) {
  if (props.skipHtml) {
    return null;
  }

  const dangerous = props.allowDangerousHtml || props.escapeHtml === false;

  const tag = props.isBlock ? "div" : "span";

  if (!dangerous) {
    /* istanbul ignore next - `tag` is a fallback for old React. */
    return createElement(React.Fragment || tag, null, props.value);
  }

  const nodeProps = { dangerouslySetInnerHTML: { __html: props.value } };
  return createElement(tag, nodeProps);
}

function ParsedHtml(props) {
  /* To do: `React.cloneElement` is slow, is it really needed? */
  return props["data-sourcepos"]
    ? React.cloneElement(props.element, { "data-sourcepos": props["data-sourcepos"] })
    : props.element;
}

function VirtualHtml(props) {
  return createElement(props.tag, getCoreProps(props), props.children);
}

function NullRenderer() {
  return null;
}

function getCoreProps(props) {
  const source = props["data-sourcepos"];
  /* istanbul ignore next - nodes from plugins w/o position */
  return source ? { "data-sourcepos": source } : {};
}
