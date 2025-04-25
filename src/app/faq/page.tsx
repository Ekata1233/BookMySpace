import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt } from "react-icons/fa";
function FAQs() {
  const faqData = [
    {
      question: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Is it styled?",
      answer:
        "Yes. It comes with default styles that match the other components' aesthetic.",
    },
    {
      question: "Is it animated?",
      answer:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
    {
      question: "Can I customize it?",
      answer:
        "Absolutely! You can override styles or replace components as needed.",
    },
    {
      question: "Is it responsive?",
      answer: "Yes. It works well on all screen sizes and adjusts accordingly.",
    },
    {
      question: "Does it support keyboard navigation?",
      answer:
        "Yes. It's fully keyboard accessible as per accessibility guidelines.",
    },
  ];
  return (
    <div className="mt-42 px-4 md:px-30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start py-30">
        {/* Left column */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal">
            We answer your questions about renting a custom office space.
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed pt-5">
            Can’t see an answer to your question? Get in touch with our team who
            are always happy to help.
          </p>
          <p
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            className="py-5"
          >
            <FaPhoneAlt style={{ color: "#6BB7BE" }} />
            <span className="text-lg font-semibold text-gray-800">
              Get In Touch
            </span>{" "}
            +91 9272003735
          </p>
          <Button className="text-base sm:text-md md:text-lg lg:text-lg text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-3 py-5 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none mt-4">
            Get In Touch
          </Button>
        </div>

        {/* Right column */}
        <div className="space-y-4 w-full">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border-l-4 border-[#6BB7BE] rounded-md shadow-sm hover:shadow-md transition duration-300"
              >
                <AccordionTrigger className="flex justify-between items-center w-full bg-white px-5 py-4 text-lg font-semibold text-gray-800 border-b border-gray-200">
                  <span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-50 px-5 py-4 text-gray-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
