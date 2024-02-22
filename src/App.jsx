import { RouterProvider } from "react-router-dom"
import router from "./routers/main-router"
import { Provider } from "react-redux"
import store from "./routes/store"

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App
