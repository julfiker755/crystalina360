"use client";
import { Repeat } from "@/components/reuseable/repeat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Skeleton,
} from "@/components/ui";
import { useGetFqaQuery } from "@/redux/api/admin/fqaApi";

export default function FqaBox() {
  const { data: fqa, isLoading: fqaLoading } = useGetFqaQuery({});

  return (
    <div>
      {fqaLoading ? (
        <div className="space-y-4">
          <Repeat count={6}>
            <Skeleton className="w-full h-12 bg-black/12" />
          </Repeat>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-2">
          {fqa?.data?.map((item: any) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-gray-100 border-none  py-1 rounded-sm"
            >
              <AccordionTrigger className=" cursor-pointer px-4 text-lg  py-2 text-left text-figma-black ">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-gray-700  border-gray-200">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
