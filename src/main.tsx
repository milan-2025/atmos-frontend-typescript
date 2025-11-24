// import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./http/apiHandlers.ts"
import { Provider } from "react-redux"
import store from "./store/store.ts"
import { SocketProvider } from "./context/SocketContext.tsx"

createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </SocketProvider>
)
