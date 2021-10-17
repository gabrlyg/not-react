import * as NotReact from "./NotReact";

const Component = () => {
  const [count, setCount] = NotReact.useState(0);
  const textReducer = (text, action) => {
    switch (action) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      default:
        throw new Error(`Invalid action: ${action}`);
    }
  };
  const [text, dispatchText] = NotReact.useReducer(textReducer, "text");

  NotReact.useEffect(() => {
    console.log("effect:", { count, text });
  }, [count, text]);

  const click = () => {
    setCount(count + 1);
    dispatchText(text === "text" ? "uppercase" : "lowercase");
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

// Simulating initial render and re-renders triggered by user action.
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
