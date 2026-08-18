import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

const SECTIONS: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "CarTrace is a vehicle information and discovery platform designed to help users access available vehicle-related information from a single, easy-to-use place. By accessing or using CarTrace in any way — whether as a visitor browsing the website, a registered user managing saved vehicles, or a person performing a single vehicle search — you agree to be bound by these Terms & Conditions in full, and you confirm that you have read and understood them before using the platform. If you do not agree with any part of these terms, please do not use the platform, as continued access to the service is taken as acceptance of this agreement.",
      "These terms apply to visitors, registered users, and anyone else accessing CarTrace services, and they form the entire agreement between you and CarTrace regarding your use of the platform. CarTrace may update these terms when necessary to reflect changes in the service, the law, or our business practices. Whenever the terms are updated, the latest version will be published on this page together with its date, and continued use of the platform after such changes means you accept the updated terms. It is your responsibility to review this page periodically so that you remain aware of the terms that currently apply.",
    ],
  },
  {
    title: "About CarTrace",
    paragraphs: [
      "CarTrace provides tools for vehicle information lookup, vehicle discovery, VIN-related searches, registration-related searches, insurance information, and other automotive services designed to help you learn more about a vehicle before you buy, sell, insure, maintain, or simply understand it better. The exact services available to a user depend on the features that have actually been implemented on the platform, and these may change over time as features are added, improved, or retired, so the set of tools you see today may not be the same as the set available in the future.",
      "Information shown on the platform may be obtained through third-party APIs and publicly available data providers, which means the depth, format, and reliability of the data can vary depending on the source and the region. CarTrace does not guarantee that every vehicle record will be available, and some information may be incomplete, unavailable, delayed, or inaccurate for reasons that are outside our control. Where a record is not available, CarTrace will report that honestly rather than inventing a result.",
    ],
  },
  {
    title: "Vehicle Information",
    paragraphs: [
      "The vehicle information displayed by CarTrace depends on the data provider selected at the time of the search. Information may include vehicle specifications, manufacturer, model, fuel type, registration-related information, insurance details where a provider returns them, and other supported fields that the chosen provider supplies for a particular vehicle. Not every field is available for every vehicle, and sections of the result only appear when the provider actually returns that data, so you should not expect every search to show a complete set of records.",
      "CarTrace does not independently verify every piece of information received from third-party providers, and we do not alter, embellish, or invent data that a provider does not return. Because accuracy can vary between sources and can change over time, users should verify important information with the relevant official authority or service provider before acting on it. CarTrace should not be treated as a replacement for official government records, and it is not an authoritative source for legal, financial, or ownership decisions.",
    ],
  },
  {
    title: "Registration Number Searches",
    paragraphs: [
      "Users are responsible for entering correct vehicle registration numbers when performing a search, as the accuracy of the result depends entirely on the accuracy of the input. CarTrace may automatically detect a state or region from the registration prefix where this is supported, and this automatic detection is provided purely as a convenience feature intended to make the search experience faster and more relevant to your area. Because detection relies on the format of the number you enter, incorrect or incomplete registration numbers may produce incorrect results, unexpected region detection, or no results at all.",
      "CarTrace does not guarantee that registration-based information will always be available, and the availability of records depends on the active provider and its regional coverage. Some registration numbers — particularly very new or very old plates — may not yet appear in a provider's database, and in those cases the platform will report the lookup as unavailable rather than returning a fabricated record. You can improve your chances of a successful search by double-checking the number, using the correct format, and, where available, trying an alternative provider.",
    ],
  },
  {
    title: "VIN Searches",
    paragraphs: [
      "VIN searches are available only where supported by the platform and the selected data provider. When performing a VIN search, users should enter a valid 17-character Vehicle Identification Number, as an invalid, incomplete, or incorrectly transcribed VIN cannot be decoded meaningfully and may simply return no information. CarTrace does not guarantee that every VIN will return information, because the information returned through VIN services may depend on third-party databases that do not necessarily cover every vehicle, market, or manufacturer.",
      "Where a VIN search returns no data, CarTrace will report that outcome honestly rather than fabricating a record, and the fields that are returned are shown exactly as the provider supplies them. VIN decoding features may rely on free public databases, such as national vehicle identification services, and the depth of the information available can vary depending on the age, market, and origin of the vehicle being searched.",
    ],
  },
  {
    title: "Insurance Information",
    paragraphs: [
      "CarTrace may display insurance-related information when supported by an available data provider, such as an indication of policy status or expiry where a source supplies it. It is important to understand that CarTrace is not an insurance company, does not sell policies, does not underwrite any coverage, and is not affiliated with any insurer. CarTrace does not automatically guarantee insurance coverage, validity, renewal, or policy status, and any insurance information shown comes from third-party sources over which we have no direct control.",
      "Because insurance records are subject to frequent changes, such as renewals, cancellations, and transfers, the information displayed may not reflect the most current state of a policy. Users should verify insurance information with the relevant insurer or official authority before relying on it, and you should always confirm the actual status and expiry of a policy with the issuing company when the decision is important to you.",
    ],
  },
  {
    title: "New and Used Cars",
    paragraphs: [
      "CarTrace may provide information about new and used vehicles, including specifications, features, and indicative pricing, so that you can research and compare vehicles before you visit a seller. Vehicle prices, specifications, availability, and features are subject to change without notice, and listings may be removed or updated at any time as manufacturers and sellers revise their ranges. CarTrace does not guarantee the availability or accuracy of listings, and the information shown is intended for general reference rather than as a binding quote or offer.",
      "Actual pricing and configuration can vary depending on the dealer, the region, taxes, and available incentives, so users should confirm final pricing and availability with the relevant seller or manufacturer before making any purchase decision. Where CarTrace provides comparison tools, the comparison is based on the information available at the time and should be treated as an aid to research rather than as the final word on any vehicle.",
    ],
  },
  {
    title: "User Accounts",
    paragraphs: [
      "Some CarTrace features, such as saving vehicles and keeping a persistent search history across sessions, may require you to create an account. Users are responsible for keeping their account credentials secure, and you should not share your passwords with other people or leave your account signed in on shared devices. You are responsible for all activity performed through your account, including any searches, saved records, or other actions made while signed in, so you should take reasonable care to protect your login details.",
      "CarTrace may suspend or restrict accounts that violate these terms, that appear to be compromised, or that are used in a way that harms the platform or other users. If you believe your account has been accessed without your permission, you should notify us through the official contact method provided on the website so that appropriate action can be taken.",
    ],
  },
  {
    title: "Acceptable Use",
    paragraphs: [
      "Users must use CarTrace only for lawful purposes and in a way that respects the platform, its providers, and other users. You must not attempt to damage, disrupt, overload, or interfere with the platform, its servers, or the networks that support it, and you must not attempt to access unauthorized systems, accounts, or information. You must not use automated systems, scripts, or bots to abuse APIs or platform resources in ways that degrade service for others, and you must not attempt to bypass security controls, rate limits, or other protective measures that CarTrace or its providers have put in place.",
      "You must also not use the platform to harass, defraud, or collect personal information about individuals, and you must not resell or redistribute vehicle data obtained through the service in a way that violates these terms or the rights of the original data providers. CarTrace may restrict access to the service where usage is deemed to be abusive, automated, or inconsistent with these acceptable-use requirements.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "CarTrace may rely on third-party APIs, databases, hosting providers, authentication services, or other technologies to deliver its features. These third-party services may have their own terms and privacy policies, which apply separately from these Terms & Conditions and govern how those services handle the data they receive. CarTrace is not responsible for outages or changes caused by third-party providers, and the availability of particular information may change without notice if a provider alters, limits, or discontinues its data.",
      "Where a provider becomes unavailable, CarTrace will make a reasonable effort to report the situation honestly rather than returning misleading results, and we may need to limit or suspend particular lookup types until a working source is available. By using features that depend on third-party services, you acknowledge that the reliability and coverage of those features are partly outside our control.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "The CarTrace name, logo, interface, original design, and original content belong to their respective owners unless otherwise stated. Users may not copy, reproduce, distribute, modify, or create derivative works from protected CarTrace content without permission, and you may not use the CarTrace branding in a way that implies endorsement or affiliation. Third-party trademarks and vehicle brands remain the property of their respective owners, and any reference to them on the platform is made for identification and informational purposes only.",
      "Reference to a brand, manufacturer, or product on the platform does not imply any affiliation, endorsement, or sponsorship by that party, and nothing in these terms transfers any rights in such marks to you. If you believe that content on the platform infringes your rights, you should contact us through the official contact method provided on the website.",
    ],
  },
  {
    title: "Availability",
    paragraphs: [
      "CarTrace is provided on an availability basis, meaning that we make reasonable efforts to keep the platform running smoothly but do not guarantee that it will always be available. Maintenance windows, technical problems, API outages, or third-party failures may temporarily affect functionality, and some features may be unavailable during such periods. CarTrace is not responsible for interruptions that arise from events outside our reasonable control, including network failures, power outages, or issues with external data providers.",
      "When the platform is unavailable, we will aim to restore service as quickly as reasonably possible, but you should not rely on the platform for time-critical needs. We recommend that you keep your own records of any important information you retrieve, so that you are not dependent on the continued availability of any particular result.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "CarTrace should not be relied upon as the sole source for important legal, financial, ownership, insurance, or registration decisions. Because the underlying information comes from third-party sources that we do not control or fully verify, users should independently verify important information before acting on it, and you assume responsibility for the decisions you make based on the information you see. To the extent permitted by applicable law, CarTrace is not responsible for losses resulting from reliance on incomplete or unavailable third-party information.",
      "The platform is provided on an as-is and as-available basis without warranties of any kind, whether express or implied, including any warranty of merchantability, fitness for a particular purpose, or non-infringement. To the maximum extent permitted by law, CarTrace and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the platform.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "CarTrace may update these Terms & Conditions from time to time to reflect changes in the service, the law, or our business practices. Updated terms will be published on this page, and the date of the latest revision will be shown at the top of the document so that you can easily see when the terms were last changed. Because continued use of the platform after changes constitutes acceptance of the updated terms, users are encouraged to review this page periodically and to check the date of the latest revision.",
      "If a change to these terms is material, we will make reasonable efforts to make you aware of it, for example by updating the date shown on this page or by highlighting the change. In all cases, the version of these terms published on this page at the time of your use is the version that applies to that use.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "If you have questions about these Terms & Conditions, or about the use of the platform more generally, contact CarTrace through the official contact method provided on the website. We will do our best to respond to your questions in a reasonable time and to clarify any part of these terms that may be unclear. By continuing to use CarTrace, you acknowledge that you have read and understood these Terms & Conditions and agree to be bound by them.",
    ],
  },
];

export function TermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using CarTrace."
      lastUpdated="August 18, 2026"
      sections={SECTIONS}
      seoTitle="Terms & Conditions"
      seoDescription="Read the Terms & Conditions that govern your use of CarTrace."
      path="/terms"
    />
  );
}