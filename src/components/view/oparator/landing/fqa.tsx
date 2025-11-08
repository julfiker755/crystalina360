import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import React from "react";

const faqItems = [
  {
    id: "item-1",
    question: "How do I create a new event?",
    answer:
      'To create a new event, navigate to the events section and click the "Create Event" button. Fill in the required details and save.',
  },
  {
    id: "item-2",
    question: "How do I create a new event?",
    answer:
      'To create a new event, navigate to the events section and click the "Create Event" button. Fill in the required details and save.',
  },
  {
    id: "item-3",
    question: "How do I create a new event?",
    answer:
      'To create a new event, navigate to the events section and click the "Create Event" button. Fill in the required details and save.',
  },
  {
    id: "item-4",
    question: "How do I create a new event?",
    answer:
      'To create a new event, navigate to the events section and click the "Create Event" button. Fill in the required details and save.',
  },
  {
    id: "item-5",
    question: "How do I create a new event?",
    answer:
      'To create a new event, navigate to the events section and click the "Create Event" button. Fill in the required details and save.',
  },
];

export default function Fqa() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center mb-8">FAQ</h1>

      <Accordion type="single" collapsible className="space-y-2">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-gray-100 border-none  py-1 rounded-sm"
          >
            <AccordionTrigger className=" cursor-pointer px-4 text-lg  py-3 text-left text-figma-black ">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 text-gray-700  border-gray-200">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
