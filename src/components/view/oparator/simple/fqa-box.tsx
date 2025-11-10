import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";

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

export default function FqaBox() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      {faqItems.map((item) => (
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
  );
}
