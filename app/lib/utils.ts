export { cn } from "cn";

import type { ShipmentRead } from "./client";

function getLatestStatus(shipment: ShipmentRead) {
    return shipment.timeline[shipment.timeline.length - 1].status;
}

function getShipmentsCountWithStatus(
    shipments: ShipmentRead[],
    status: string,
) {
    console.log(shipments);
    return shipments.filter((shipment) => getLatestStatus(shipment) === status)
        .length;
}

export {
    getLatestStatus,
    getShipmentsCountWithStatus as getShipmentsCountForStatus,
};
