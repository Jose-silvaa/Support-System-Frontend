import * as React from "react";

export interface TabItem {
    value: string;
    label: string;
    content: React.ReactNode;
}

export interface TabsComponentProps {
    tabs: TabItem[];
    defaultValue?: string;
}

