import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopPodcasts from "./components/TopPodcasts";
import TopEpisodes from "./components/TopEpisodes";
import { LayoutProvider } from "./contexts/LayoutContext";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";

export default function Home() {
  const topPodcasts = [
    {
      id: 1,
      title: "فنجان",
      subtitle: "ثمانية",
      description: "بودكاست فنجان",
    },
    {
      id: 2,
      title: "فنجان فور",
      subtitle: "Omar Eldeep",
      description: "فنجان فور",
    },
    {
      id: 3,
      title: "فنجان فور",
      subtitle: "Mashael Saud",
      description: "فنجان فور",
    },
    {
      id: 4,
      title: "فنجان مع عقدة",
      subtitle: "عبدالله الشمري",
      description: "فنجان مع عقدة",
    },
    {
      id: 5,
      title: "بودكاست فنجان فور",
      subtitle: "OUMA Ahmed Abdelbasset",
      description: "بودكاست فنجان فور",
    },
    {
      id: 6,
      title: "أيقونة فنجان المركز",
      subtitle: "LingLounge",
      description: "أيقونة فنجان المركز",
    },
    {
      id: 7,
      title: "بيك فنجان فور",
      subtitle: "Muhammad",
      description: "بيك فنجان فور",
    },
    {
      id: 8,
      title: "بيك فنجان فور",
      subtitle: "Muhammad",
      description: "بيك فنجان فور",
    },
    {
      id: 9,
      title: "بيك فنجان فور",
      subtitle: "Muhammad",
      description: "بيك فنجان فور",
    },
    {
      id: 10,
      title: "بيك فنجان فور",
      subtitle: "Muhammad",
      description: "بيك فنجان فور",
    },
  ];

  const topEpisodes = [
    {
      id: 1,
      title: "فنجان مسموع",
      subtitle: "نتالو تالكس | نتالو عمل",
    },
    {
      id: 2,
      title: "أول فنجان فور",
      subtitle: "أبو رياض مع بدر محمد",
    },
    {
      id: 3,
      title: "The Cup - فنجان",
      subtitle: "Black Dog Radio",
    },
    {
      id: 4,
      title: "هسة فنجان الرحمن",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 5,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 6,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 7,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 8,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 9,
      title: "20221 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 10,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 20,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 11,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 12,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
          id: 13,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
    {
      id: 14,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam",
    },
  ];

  return (
    <ResponsiveProvider>
      <LayoutProvider>
        <div className="min-h-screen bg-gray-900 text-white flex">
          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0">
            <Header />

            <main className="flex-1 px-3 md:px-6 py-4 md:py-8 overflow-x-hidden">
              <TopPodcasts podcasts={topPodcasts} />
              <TopEpisodes episodes={topEpisodes} />
            </main>
          </div>
        </div>
      </LayoutProvider>
    </ResponsiveProvider>
  );
}
