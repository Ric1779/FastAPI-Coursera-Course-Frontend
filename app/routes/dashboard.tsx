import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { Loading } from "~/components/loading";
import ShipmentCard from "~/components/shipment-card";
import { Separator } from "~/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar";
import { AuthContext } from "~/contexts/AuthContext";
import api from "~/lib/api";
import { ShipmentStatus } from "~/lib/client";
import { getShipmentsCountForStatus } from "~/lib/utils";

export default function DashboardPage() {
    const { token, user } = useContext(AuthContext);
    const { isLoading, isError, data } = useQuery({
        queryKey: ["shipments", user],
        enabled: Boolean(token) && user === "seller",
        queryFn: async () => {
            const { data } = await api.seller.getShipments();
            return data;
        },
    });

    if (!token) {
        return <Navigate to="/login"></Navigate>;
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
                <h1 className="w-full max-w-md rounded-xl border border-destructive/20 bg-destructive/10 p-8 text-center text-2xl font-semibold tracking-tight text-destructive shadow-sm sm:text-3xl">
                    Error Loading Shipment
                </h1>
            </div>
        );
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar currentRoute="Dashboard" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                    />
                    <h2>Dashboard</h2>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {user === "partner" ? (
                        <p className="rounded-xl border bg-muted/50 p-6 text-center text-muted-foreground">
                            Shipment listing is not yet available for delivery
                            partners.
                        </p>
                    ) : isLoading || !data ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                                <NumberLabel
                                    value={data.length}
                                    label="Total Shipments"
                                />
                                <NumberLabel
                                    value={getShipmentsCountForStatus(
                                        data,
                                        ShipmentStatus.Placed,
                                    )}
                                    label="Placed"
                                />
                                <NumberLabel
                                    value={getShipmentsCountForStatus(
                                        data,
                                        ShipmentStatus.InTransit,
                                    )}
                                    label="In Transit"
                                />
                                <NumberLabel
                                    value={getShipmentsCountForStatus(
                                        data,
                                        ShipmentStatus.Delivered,
                                    )}
                                    label="Delivered"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                {data.map((shipment) => (
                                    <ShipmentCard
                                        key={shipment.id}
                                        shipment={shipment}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

function NumberLabel({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4">
            <h1 className="text-4xl font-bold">{value}</h1>
            <p className="text-gray-500">{label}</p>
        </div>
    );
}
