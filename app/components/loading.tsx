import { LoaderCircle } from "lucide-react";
import { cn } from "~/lib/utils";

export function Loading({
    className,
    label = "Loading...",
}: {
    className?: string;
    label?: string;
}) {
    return (
        <div
            role="status"
            className={cn(
                "flex min-h-64 flex-1 flex-col items-center justify-center gap-3 p-6 text-muted-foreground",
                className,
            )}
        >
            <LoaderCircle
                aria-hidden="true"
                className="size-8 animate-spin text-primary motion-reduce:animate-none"
            />
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}