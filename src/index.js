import * as NotReact from './NotReact'

const NotAComponent = () => {
  const [count, setCount] = NotReact.useState(0)
  const initialAnotherCount = {
    count: 0,
  }
  const countReducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          count: state.count + 1,
        }
      case 'decrement':
        return {
          count: state.count - 1,
        }
      default:
        throw new Error(`Count Reducer: Invalid action type: "${action.type}"`)
    }
  }
  const [anotherCount, dispatchAnotherCount] = NotReact.useReducer(
    countReducer,
    initialAnotherCount
  )

  NotReact.useEffect(() => {
    console.log('effect:', { count, anotherCount: anotherCount.count })
  }, [count, anotherCount])

  const click = () => {
    setCount(count + 1)
    dispatchAnotherCount({
      type: anotherCount.count > 0 ? 'decrement' : 'increment',
    })
  }
  const reset = () => {
    setCount(0)
  }

  const render = () => {
    console.log('render:', { count, anotherCount: anotherCount.count })
  }

  return {
    render,
    click,
    reset,
  }
}

// Simulating initial render and re-renders triggered by user action.
console.log('============= Initial Render =============')
let app = NotReact.render(NotAComponent)
console.log('======== Initial Render Complete =========')
for (let i = 0; i < 3; i++) {
  app.click()
  console.log('============= Re-render =============')
  app = NotReact.render(NotAComponent)
  console.log('============= Render Complete ==========')
}
app.reset()
