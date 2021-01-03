const vsDark = {
  'pre[class*="language-"]': {
    color: "#d4d4d4",
    fontSize: "16px",
    textShadow: "none",
    fontFamily: "'Inter', sans-serif",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",
    background: "#0f0f0f",
    borderRadius: 5,
    border: "1px solid #242424",
  },
  'code[class*="language-"]': {
    color: "#d4d4d4",
    fontSize: "13px",
    textShadow: "none",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]::selection': {
    textShadow: "none",
    background: "#b3d4fc",
  },
  'code[class*="language-"]::selection': {
    textShadow: "none",
    background: "#b3d4fc",
  },
  ':not(pre) > code[class*="language-"]': {
    padding: ".1em .3em",
    borderRadius: ".3em",
    color: "#db4c69",
    background: "#f9f2f4",
  },
  ".namespace": {
    Opacity: ".7",
  },
  comment: {
    color: "#6a9955",
  },
  prolog: {
    color: "#6a9955",
  },
  doctype: {
    color: "#6a9955",
  },
  cdata: {
    color: "#6a9955",
  },
  punctuation: {
    color: "#d4d4d4",
  },
  property: {
    color: "#9cdcfe",
  },
  tag: {
    color: "#569cd6",
  },
  boolean: {
    color: "#569cd6",
  },
  number: {
    color: "#b5cea8",
  },
  constant: {
    color: "#9CDCFE",
  },
  symbol: {
    color: "#b5cea8",
  },
  deleted: {
    color: "#b5cea8",
  },
  selector: {
    color: "#d7ba7d",
  },
  "attr-name": {
    color: "#9cdcfe",
  },
  string: {
    color: "#ce9178",
  },
  char: {
    color: "#ce9178",
  },
  builtin: {
    color: "#ce9178",
  },
  inserted: {
    color: "#ce9178",
  },
  operator: {
    color: "#d4d4d4",
    background: "#0f0f0f",
  },
  entity: {
    color: "#4ec9b0",
    background: "#0f0f0f",
    cursor: "unset",
  },
  url: {
    color: "#d4d4d4",
    background: "#0f0f0f",
  },
  ".language-css .token.string": {
    color: "#d4d4d4",
    background: "#0f0f0f",
  },
  ".style .token.string": {
    color: "#d4d4d4",
    background: "#0f0f0f",
  },
  atrule: {
    color: "#c586c0",
  },
  "attr-value": {
    color: "#ce9178",
  },
  keyword: {
    color: "#c586c0",
  },
  function: {
    color: "#dcdcaa",
  },
  regex: {
    color: "#d16969",
  },
  important: {
    color: "#d16969",
    fontWeight: "bold",
  },
  variable: {
    color: "#d16969",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  "class-name": {
    color: "#4EC9B0",
  },
  parameter: {
    color: "#9CDCFE",
  },
  interpolation: {
    color: "#9CDCFE",
  },
  "punctuation.interpolation-punctuation": {
    color: "#569cd6",
  },
  namespace: {
    color: "#4ec9b0",
  },
  'pre[class*="language-javascript"]': {
    color: "#4ec9b0",
  },
  'code[class*="language-javascript"]': {
    color: "#4ec9b0",
  },
  'pre[class*="language-css"]': {
    color: "#CE9178",
  },
  'code[class*="language-css"]': {
    color: "#CE9178",
  },
  'pre[class*="language-html"]': {
    color: "#d4d4d4",
  },
  'code[class*="language-html"]': {
    color: "#d4d4d4",
  },
  ".language-html .token.punctuation": {
    color: "#808080",
  },
  "pre[data-line]": {
    position: "relative",
  },
  'pre[class*="language-"] > code[class*="language-"]': {
    position: "relative",
    zIndex: "1",
  },
  ".line-highlight": {
    position: "absolute",
    left: "0",
    right: "0",
    padding: "inherit 0",
    marginTop: "1em",
    background: "#f7ebc6",
    boxShadow: "inset 5px 0 0 #f7d87c",
    zIndex: "0",
    pointerEvents: "none",
    lineHeight: "inherit",
    whiteSpace: "pre",
  },
};

const githubLight = {
  'code[class*="language-"]': {
    fontFamily:
      'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
    fontSize: "14px",
    lineHeight: "1.375",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    color: "#5e6687",
  },
  'pre[class*="language-"]': {
    fontFamily:
      'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
    fontSize: "14px",
    lineHeight: "1.375",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    background: "#f5f7ff",
    color: "#5e6687",
    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",
    background: "#f9f9f9",
    borderRadius: 5,
    border: "1px solid #eee",
  },
  'pre > code[class*="language-"]': {
    fontSize: "1em",
  },
  'pre[class*="language-"]::-moz-selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  'pre[class*="language-"] ::-moz-selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  'code[class*="language-"]::-moz-selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  'code[class*="language-"] ::-moz-selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  'pre[class*="language-"]::selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  'pre[class*="language-"] ::selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  'code[class*="language-"]::selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  'code[class*="language-"] ::selection': {
    textShadow: "none",
    background: "#dfe2f1",
  },
  ':not(pre) > code[class*="language-"]': {
    padding: ".1em",
    borderRadius: ".3em",
  },
  comment: {
    color: "#898ea4",
  },
  prolog: {
    color: "#898ea4",
  },
  doctype: {
    color: "#898ea4",
  },
  cdata: {
    color: "#898ea4",
  },
  punctuation: {
    color: "#5e6687",
  },
  namespace: {
    Opacity: ".7",
  },
  operator: {
    color: "#c76b29",
  },
  boolean: {
    color: "#c76b29",
  },
  number: {
    color: "#c76b29",
  },
  property: {
    color: "#c08b30",
  },
  tag: {
    color: "#3d8fd1",
  },
  string: {
    color: "#22a2c9",
  },
  selector: {
    color: "#6679cc",
  },
  "attr-name": {
    color: "#c76b29",
  },
  entity: {
    color: "#22a2c9",
    cursor: "help",
  },
  url: {
    color: "#22a2c9",
  },
  ".language-css .token.string": {
    color: "#22a2c9",
  },
  ".style .token.string": {
    color: "#22a2c9",
  },
  "attr-value": {
    color: "#3a56d3",
  },
  keyword: {
    color: "#3a56d3",
  },
  control: {
    color: "#3a56d3",
  },
  directive: {
    color: "#3a56d3",
  },
  unit: {
    color: "#3a56d3",
  },
  statement: {
    color: "#22a2c9",
  },
  regex: {
    color: "#22a2c9",
  },
  atrule: {
    color: "#22a2c9",
  },
  placeholder: {
    color: "#3d8fd1",
  },
  variable: {
    color: "#3d8fd1",
  },
  deleted: {
    textDecoration: "line-through",
  },
  inserted: {
    borderBottom: "1px dotted #202746",
    textDecoration: "none",
  },
  italic: {
    fontStyle: "italic",
  },
  important: {
    fontWeight: "bold",
    color: "#c94922",
  },
  bold: {
    fontWeight: "bold",
  },
  "pre > code.highlight": {
    Outline: "0.4em solid #c94922",
    OutlineOffset: ".4em",
  },
  ".line-numbers .line-numbers-rows": {
    borderRightColor: "#dfe2f1",
  },
  ".line-numbers-rows > span:before": {
    color: "#979db4",
  },
  ".line-highlight": {
    background: "linear-gradient(to right, rgba(107, 115, 148, 0.2) 70%, rgba(107, 115, 148, 0))",
  },
  function: {
    color: "#d63384",
  },
};

export { githubLight, vsDark };
