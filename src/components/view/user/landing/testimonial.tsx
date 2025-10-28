import Image from "next/image";
import { RatingScore } from "@/components/reuseable/rating";

const testimonials = [
  {
    id: "1",
    name: "Sourov Das Mithun",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 3,
    text: "This is a very nice event. I like the event so much. The we...",
  },
  {
    id: "2",
    name: "Riya Sharma",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4,
    text: "I had an amazing time at the festival. The atmosphere w...",
  },
  {
    id: "3",
    name: "Anik Dutta",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 2,
    text: "The event featured some talented artists. Each p...",
  },
  {
    id: "4",
    name: "Priya Sen",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    text: "What a wonderful experience! The decorations added a m...",
  },
  {
    id: "5",
    name: "Sourov Das Mithun",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 3,
    text: "This is a very nice event. I like the event so much. The we...",
  },
  {
    id: "6",
    name: "Riya Sharma",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 1,
    text: "I had an amazing time at the festival. The atmosphere w...",
  },
  {
    id: "7",
    name: "Anik Dutta",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 3,
    text: "The event featured some talented artists. Each p...",
  },
  {
    id: "8",
    name: "Priya Sen",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 3,
    text: "What a wonderful experience! The decorations added a m...",
  },
];

export default function Testimonial() {
  return (
    <div className="py-10 container">
      <h1 className="mb-10">Testimonial</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: any) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-[#FBFBFB] rounded-lg">
      <Image
        src={testimonial.image || "/placeholder.svg"}
        alt={testimonial.name}
        width={80}
        height={80}
        className="rounded-full mb-4 object-cover"
      />
      <h3 className="font-semibold text-figma-black text-lg mb-2">
        {testimonial.name}
      </h3>
      <div className="mb-3">
        <RatingScore key={testimonial.id} value={testimonial.rating || 0} />
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 px-8">
        {testimonial.text}
      </p>
    </div>
  );
}
