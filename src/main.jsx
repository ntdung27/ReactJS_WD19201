import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CounterContext from "./context/CounterContext.jsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <CounterContext>
                <App />
            </CounterContext>
        </BrowserRouter>
    </QueryClientProvider>
);
