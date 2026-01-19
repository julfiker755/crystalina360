"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { cn, helpers } from "@/lib";
import { childrenProps } from "@/types";

interface tabboxStyle extends childrenProps {
  defaultValue: string;
  className?: string;
  tabStyle?: string;
  tabItem: any;
  onChange?: (tab: string) => void;
}

export default function TabBox({
  defaultValue,
  className,
  tabStyle,
  children,
  tabItem,
  onChange,
}: tabboxStyle) {
  const handleTabChange = (tab: string) => {
    if (onChange) {
      onChange(tab);
    }
  };

  return (
    <Tabs
      defaultValue={defaultValue}
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList
        className={cn(
          "flex justify-between  w-full flex-wrap bg-transparent p-0 h-auto rounded-none",
          className,
        )}
      >
        {tabItem?.map((tab: any, index: any) => (
          <TabsTrigger
            key={index}
            value={helpers.slugify(tab)}
            className={cn(
              "text-article text-base cursor-pointer data-[state=active]:bg-transparent data-[state=active]:shadow-none",
              tabStyle,
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}
