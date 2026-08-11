import { Tabs } from "@chakra-ui/react"
import type {TabsComponentProps} from "@/shared/components/TabsComponent/interfaces.ts";


export const TabsComponent = ({tabs, defaultValue}: TabsComponentProps) => {
    return (
        <Tabs.Root defaultValue={defaultValue ?? tabs[0]?.value}>
            <Tabs.List>
                {tabs.map((tab) => {
                    return (
                        <Tabs.Trigger
                            value={tab.value}
                        >
                            {tab.label}
                        </Tabs.Trigger>
                    );
                })}
            </Tabs.List>

            {tabs.map((tab) => (
                <Tabs.Content
                    key={tab.value}
                    value={tab.value}
                >
                    {tab.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};