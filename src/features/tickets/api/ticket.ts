import type {TicketHistory} from "@/features/tickets/types/ticket.types.ts";

export async function getHistoryTicket(ticketId: string): Promise<TicketHistory[]> {
    const response = await fetch(`/api/ticketHistory/${ticketId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch ticket history API");
    }

    return response.json();
}