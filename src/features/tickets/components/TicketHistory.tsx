import {TabsComponent} from "@/shared/components/TabsComponent";
import {useEffect, useState} from "react";
import {getHistoryTicket} from "@/features/tickets/api/ticket.ts";
import type {TicketHistory} from "@/features/tickets/types/ticket.types.ts";
import {Box} from "@chakra-ui/react";

interface TicketHistoryProps {
    ticketId: string;
}


export function TicketHistory({ticketId}: TicketHistoryProps){

    const [history, setHistory] = useState<TicketHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function loadHistory() {
            try {
                setLoading(true);

                const data = await getHistoryTicket(ticketId);

                setHistory(data);

            } catch (err){
                console.error("Erro real:", err);
                setError("Failed to load ticket history");
            } finally {
                setLoading(false);
            }
        }

        loadHistory();
    }, [ticketId]);


    return(
        <TabsComponent
            tabs={[
                {
                    value: "history",
                    label: "History",
                    content: (
                        <div>
                            {loading && <p>Loading...</p>}

                            {error && <p>{error}</p>}

                            {!loading && !error && (
                                <>
                                    {history.length === 0 ? (
                                        <p>No history found.</p>
                                    ) : (
                                        history.map((item, index) => (
                                            <Box mb="20px" key={`${item.ticketId}-${index}`} className="">
                                                <p>{item.description}</p>
                                            </Box>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    ),
                },
            ]}
        />
    )
}