export interface TicketHistory {

    ticketId: string;
    userId: string;
    type: TicketActivityType;
    description: string;

}

export const TicketActivityType = {
    StatusChanged: "StatusChanged",
    CommentAdded : "CommentAdded",
    CommentEdited : "CommentEdited",
    DescriptionChanged : "DescriptionChanged",
    TitleChanged : "TitleChanged",
} as const;

export type TicketActivityType =
    typeof TicketActivityType[keyof typeof TicketActivityType];