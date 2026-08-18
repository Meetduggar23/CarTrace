import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

const SECTIONS: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "This Privacy Policy explains how CarTrace may collect, use, store, and protect information when you use the platform. By using CarTrace, you acknowledge the practices described in this policy, and we have written it in plain language so that you can understand what information may be involved, why it may be collected, and how you can make informed decisions about the features you choose to use. This policy applies to the website and to any features that CarTrace makes available through it, and it should be read together with our Terms & Conditions.",
    ],
  },
  {
    title: "Information We May Collect",
    paragraphs: [
      "Depending on the features you use, CarTrace may collect information such as your name, email address, account information, vehicle registration numbers, VIN-related search information, saved vehicles, and search history. The exact information collected depends on the functionality you use, and we generally aim to handle only the information that is necessary to make the feature you are using work correctly. For example, a basic vehicle search does not require an account, while saving vehicles and keeping a persistent history typically does. We do not set out to collect personal information beyond what the features you actively use require, and we do not ask for data that a particular feature does not need.",
    ],
  },
  {
    title: "Account Information",
    paragraphs: [
      "If you create an account, CarTrace may collect information required to create and maintain that account, such as your name and email address. This information is used to identify you when you sign in, to associate saved vehicles and search history with your account, and to keep your data separate from the data of other users. Authentication information should be handled using appropriate security practices, and passwords should be stored in a way that cannot be read back in plain text. You are responsible for keeping your credentials secure and for the activity that occurs through your account, and you should contact us if you believe your account has been compromised.",
    ],
  },
  {
    title: "Vehicle Information",
    paragraphs: [
      "When you perform a vehicle search, the registration number or VIN entered by you may be processed to provide the requested service. This means that the query you type may be transmitted to the server and, where required to complete the search, vehicle-related information may be sent to the relevant third-party data provider so that the provider can look up and return the available record. We only send the information needed to complete the search you requested, and we do not ask providers for more data than the search requires. The vehicle information that comes back is displayed to you and may, depending on the features you use, be recorded in your recent searches, saved vehicles, or account history.",
    ],
  },
  {
    title: "Search History",
    paragraphs: [
      "If Search History is enabled, CarTrace may store information about searches performed by an authenticated user. This feature allows users to review previous searches and quickly run them again, which can be useful when you check the same vehicle periodically or want to compare a few vehicles over time. History is tied to your account and is visible only to you, and guest searches are kept in your browser's local storage rather than on the server. Users should only enter vehicle information they are authorized to search, and you can clear your history at any time through the available controls, after which the stored entries are removed.",
    ],
  },
  {
    title: "Saved Vehicles",
    paragraphs: [
      "If you use the Saved Vehicles feature, CarTrace may store the vehicle information necessary to provide that feature, such as the registration number or VIN and the record that was returned for it. Saved vehicles may remain associated with your account until removed or deleted according to the available functionality, which lets you keep a convenient list of the vehicles you care about and re-check them with a single click. You can rename or delete saved vehicles at any time, and the saved records are only accessible to the account that created them.",
    ],
  },
  {
    title: "How We Use Information",
    paragraphs: [
      "Information may be used to provide vehicle searches and to return the results you requested, and information may also be used to maintain user accounts so that you can sign in and manage your data. Information may be used to provide saved vehicles and search history, and to keep those features working reliably across your sessions and devices. Information may be used to improve platform performance, to diagnose and fix technical problems, and to prevent abuse, fraud, or misuse of the service, for example by detecting automated or unusual usage patterns.",
      "Information may also be used to communicate important service-related information, such as material changes to the platform, to these terms, or to this policy. We do not sell vehicle search data to third parties, and we do not use the information you enter for advertising or profiling purposes.",
    ],
  },
  {
    title: "Third-Party Providers",
    paragraphs: [
      "CarTrace may use third-party APIs and service providers to provide vehicle-related information. Information required for a specific service may be processed by those providers, and this processing happens in order to complete the lookup you requested. Third-party providers may have separate privacy policies, and we encourage you to review the privacy policies of relevant third-party services where appropriate, because once data has been transmitted to an external provider we cannot control how that provider handles it. When a feature depends on an external source, the data you enter for that feature is shared with that source to the extent required to return a result.",
    ],
  },
  {
    title: "Cookies and Local Storage",
    paragraphs: [
      "CarTrace may use cookies, local storage, session storage, or similar technologies where required for functionality. These technologies may help maintain authentication sessions, remember preferences such as the selected location, and store user settings so that the website works smoothly on repeat visits and your choices persist between sessions. The website should not use unnecessary tracking technologies without appropriate disclosure, and any data stored locally on your device remains under your control and can be cleared at any time using your browser settings. Clearing local storage may, however, remove preferences such as your selected location or recent guest searches.",
    ],
  },
  {
    title: "Location Selection",
    paragraphs: [
      "CarTrace may allow users to select a state or region for vehicle-related services, so that searches, example registrations, and background content can adapt to a relevant area. The selected location may be stored locally to improve the user experience where the feature requires it, and the location you pick is used to personalize the service rather than to track you. CarTrace should not claim to collect precise physical location data unless such functionality is actually implemented, and the platform does not track your real-world location beyond the region you choose to select.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "CarTrace takes reasonable technical measures to protect information handled by the platform, including secure transmission where appropriate and access controls for stored account data, so that your information is protected in transit and at rest to a reasonable degree. No internet-based system can guarantee absolute security, and even strong safeguards cannot prevent every possible incident, such as a breach of an external provider or an attack on infrastructure we do not control. Users should use strong passwords, avoid sharing account credentials, and log out of shared devices to help protect their own information, and you should contact us if you suspect that your account has been accessed without your permission.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "Information should only be retained for as long as necessary for the relevant feature or legitimate purpose. For example, saved vehicles and search history are kept so that you can use those features, and account information is kept so that you can sign in and manage your data. Retention periods may vary depending on the type of information and the functionality it supports, and data that is no longer needed for its purpose should be removed. Guest search history stored in your browser remains under your control and can be cleared using the available controls or your browser settings.",
    ],
  },
  {
    title: "Data Deletion",
    paragraphs: [
      "Where supported, users may request deletion of their account or applicable stored information, and you can also remove individual saved vehicles or clear your search history at any time through the available controls. The actual deletion process depends on the platform's implementation, and some data may be removed immediately while other data is removed through periodic cleanup or when an account is deleted. Information required for legal, security, or operational purposes may be retained where permitted or required by applicable law, even after you request deletion, for as long as the law or a legitimate operational need requires it.",
    ],
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      "CarTrace is not intentionally designed to collect personal information from children, and the platform is intended for general audiences who are old enough to make their own decisions about the services they use. Users should not provide personal information belonging to another person without appropriate authorization, and you should only enter information that you are entitled to enter. If you believe that a child has provided personal information through the platform, you should contact us using the official contact method provided on the website so that we can review and address the matter.",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "CarTrace may contain links to external websites or services, for example to reference sources, related tools, or the websites of the data providers it relies on. CarTrace does not control the privacy practices of external websites, and this policy does not apply once you leave the platform. Users should review the privacy policies of those websites before providing any information to them, because the way an external website collects and uses data is governed by its own policy, not by this one.",
    ],
  },
  {
    title: "Policy Changes",
    paragraphs: [
      "This Privacy Policy may be updated when CarTrace changes its services, technology, or privacy practices. The latest version will always be published on this page, together with the date it was last updated, so that you can always see the policy that applies to your use of the platform. We encourage you to review this page periodically to stay informed of how your information is handled, and continued use of the platform after a change means you accept the updated policy.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "If you have questions about this Privacy Policy or how information is handled, contact CarTrace using the official contact information provided on the website, and we will do our best to respond in a reasonable time. By using CarTrace, you acknowledge that you have read this Privacy Policy and understand how the platform may handle information as described above.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle="Your privacy matters to us."
      lastUpdated="August 18, 2026"
      sections={SECTIONS}
      seoTitle="Privacy Policy"
      seoDescription="Read the Privacy Policy that explains how CarTrace handles information."
      path="/privacy"
    />
  );
}