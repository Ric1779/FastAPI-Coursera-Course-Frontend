import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        {
            name: "chrome-devtools-discovery",
            configureServer(server) {
                // Ignore Chrome's optional workspace discovery probe before SSR routing.
                server.middlewares.use((req, res, next) => {
                    if (
                        req.url?.split("?")[0] ===
                        "/.well-known/appspecific/com.chrome.devtools.json"
                    ) {
                        res.statusCode = 204;
                        res.end();
                        return;
                    }
                    next();
                });
            },
        },
        tailwindcss(),
        reactRouter(),
    ],
    resolve: {
        tsconfigPaths: true,
    },
});
