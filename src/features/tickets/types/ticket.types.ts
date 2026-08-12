export interface TicketHistory {
    email: string
    ticketId: string;
    userId: string;
    type: TicketActivityType;
    description: string;
    createdAt: Date;
}



export const TicketActivityType = {
    StatusChanged: 0,
    CommentAdded : 1,
    CommentEdited : 2,
    DescriptionChanged : 3,
    TitleChanged : 4,
} as const;

export type TicketActivityType =
    typeof TicketActivityType[keyof typeof TicketActivityType];