// import "./styles.css";

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;

import * as NotReact from "./NotReact";

const Component = () => {
  const [count, setCount] = NotReact.useState(0);
  const [text, setText] = NotReact.useState("text");

  NotReact.useEffect(() => {
    console.log("effect:", { count, text });
  }, [count, text]);

  const click = () => {
    setCount(count + 1);
    setText(text === "text" ? "TEXT" : "text");
  };
  const reset = () => {
    setCount(0);
  };

  const render = () => {
    console.log("render:", { count, text });
  };

  return {
    render,
    click,
    reset
  };
};
console.log("============= Initial Render =============");
let app = NotReact.render(Component);
console.log("======== Initial Render Complete =========");
for (let i = 0; i < 3; i++) {
  app.click();
  console.log("============= Re-render =============");
  app = NotReact.render(Component);
  console.log("============= Render Complete ==========");
}
app.reset();
