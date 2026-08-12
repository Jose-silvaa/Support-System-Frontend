import {TabsComponent} from "@/shared/components/TabsComponent";
import {useEffect, useState} from "react";
import {getHistoryTicket} from "@/features/tickets/api/ticket.ts";
import {TicketActivityType, type TicketHistory} from "@/features/tickets/types/ticket.types.ts";
import {Box, Text} from "@chakra-ui/react";
import {formatDistanceToNow} from "date-fns/formatDistanceToNow";
import {ptBR} from "date-fns/locale/pt-BR";

interface TicketHistoryProps {
    ticketId: string;
}

function tempoRelativo(dataISO: string | Date) {
    return formatDistanceToNow(new Date(dataISO), {
        addSuffix: true,
        locale: ptBR,
    });
}

export function TicketHistory({ticketId}: TicketHistoryProps){

    const [history, setHistory] = useState<TicketHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    function verifyAction(item: TicketActivityType, email: string){
        const actions = {
            [TicketActivityType.StatusChanged]: {
                action: "changed the",
                target: "Status",
            },
            [TicketActivityType.CommentAdded]: {
                action: "added a",
                target: "Comment",
            },
            [TicketActivityType.CommentEdited]: {
                action: "edited a",
                target: "Comment",
            },
            [TicketActivityType.DescriptionChanged]: {
                action: "changed the",
                target: "Description",
            },
            [TicketActivityType.TitleChanged]: {
                action: "changed the",
                target: "Title",
            },
        };

        const action = actions[item];

        if (!action) {
            return null;
        }

        return (
            <p>
                {email} {action.action}{" "}
                <Text as="span" fontWeight="semibold">
                    {action.target}
                </Text>
            </p>
        );
    }

    useEffect(() => {
        async function loadHistory() {
            try {
                setLoading(true);

                const data = await getHistoryTicket(ticketId);

                setHistory(data);

            } catch {
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
                                                <p>{verifyAction(item.type, item.email)}</p>
                                                <Text textStyle="xs" fontWeight="light" >{tempoRelativo(item.createdAt)}</Text>
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