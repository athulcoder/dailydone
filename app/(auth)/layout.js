import "../globals.css";

export const metadata = {
  title: {
    default: "DailyDone",
    template: "%s | DailyDone",
  },
  description:
    "DailyDone is India’s homegrown productivity app  built by Athul Sabu to help you stay focused, organised, and on track every single day.",
  keywords: [
    "DailyDone",
    "To-Do App India",
    "Indian Productivity App",
    "Task Manager",
    "Made in India",
    "Athul Sabu",
    "Next.js 15",
  ],
  authors: [{ name: "Athul Sabu", url: "https://athulcoder.github.io" }],
  creator: "Athul Sabu",
  metadataBase: new URL("https://athulcoder.github.io"),
  openGraph: {
    title: "DailyDone Made in India. Built for Focus.",
    description:
      "DailyDone is a lightweight, fast, and clean Indian task tracker to help you focus and finish daily goals  built by Athul Sabu.",
    url: "https://www.linkedin.com/in/athul-sabu-84360a261/",
    siteName: "DailyDone",
    images: [
      {
        url: "https://athulcoder.github.io/assets/athulsabu--_Sm7nK8.jpg",
        width: 1200,
        height: 630,
        alt: "Screenshot of DailyDone – Made in India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DailyDone",
    description: "Your clean, daily productivity companion  by Athul Sabu.",
    images: ["https://athulcoder.github.io/assets/athulsabu--_Sm7nK8.jpg"],
    creator: "@athulcoder",
  },
  icons: {
    icon: "/favicon.ico",
  },
};
export default function AuthRootLayout({ children }) {
  return <div>{children}</div>;
}
