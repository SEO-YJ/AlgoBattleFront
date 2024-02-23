import { RouterProvider } from "react-router-dom"
import router from "./routers/main-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./routes/store"

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router}/>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
