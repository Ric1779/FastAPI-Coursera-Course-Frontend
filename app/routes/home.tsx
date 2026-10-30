import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return (
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                Welcome to Fastship
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Start your journey with us right now!
            </p>
            <Button
                className="mt-5"
                nativeButton={false}
                render={<Link to="/seller/login" />}
            >
                Seller Login
            </Button>
            <Button
                className="mt-5"
                nativeButton={false}
                render={<Link to="/partner/login" />}
            >
                Delivery Partner Login
            </Button>
        </div>
    );
}
