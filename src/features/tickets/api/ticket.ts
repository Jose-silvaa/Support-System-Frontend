import type {TicketHistory} from "@/features/tickets/types/ticket.types.ts";
import {get} from "@/lib/api.ts";

export async function getHistoryTicket(ticketId: string): Promise<TicketHistory[]> {
    const data = await get<TicketHistory[]>(`TicketHistory/${ticketId}`);

    console.log("ticket history data:", data);
    return data;
}