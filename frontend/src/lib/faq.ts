import type { AccordionItem } from "@/components/ui/accordion";

export const FAQ_ITEMS: AccordionItem[] = [
  {
    value: "owner-details",
    question: "Can AutoCheck show official owner details?",
    answer:
      "Only if the active data provider legally and publicly supplies them — most free providers don't return owner information. AutoCheck never fabricates owner, insurance, PUC or fitness data. Sections only appear when the provider actually returns that data.",
  },
  {
    value: "indian-registration",
    question: "Why is Indian registration-number lookup unavailable?",
    answer:
      "No free/public API provides Indian RTO registration (RC) lookups, so AutoCheck honestly reports the lookup type as unavailable with the configured provider instead of inventing records. The provider architecture is built so a legitimate RC data source can be plugged in later without rewriting the app.",
  },
  {
    value: "challans",
    question: "Does AutoCheck check challans or e-challans?",
    answer:
      "Not currently. Challan data is not available through any free public API we support. We won't display or claim challan information we can't source.",
  },
  {
    value: "vin-regions",
    question: "Which regions does VIN decoding cover?",
    answer:
      "VIN decoding is powered by the free, key-less NHTSA vPIC API (US Department of Transportation) and covers US/Canada market vehicles. Specifications are returned as published by that source.",
  },
  {
    value: "official",
    question: "Is AutoCheck an official government website?",
    answer:
      "No. AutoCheck is an independent vehicle-information platform. It is not an RTO authority and is not affiliated with CarInfo or any government body. Always verify records independently before making financial or legal decisions.",
  },
];
