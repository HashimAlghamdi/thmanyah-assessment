import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopPodcasts from './components/TopPodcasts';
import TopEpisodes from './components/TopEpisodes';

export default function Home() {
  const topPodcasts = [
    {
      id: 1,
      title: "فنجان",
      subtitle: "ثمانية",
      description: "بودكاست فنجان"
    },
    {
      id: 2,
      title: "فنجان فور",
      subtitle: "Omar Eldeep",
      description: "فنجان فور"
    },
    {
      id: 3,
      title: "فنجان فور",
      subtitle: "Mashael Saud",
      description: "فنجان فور"
    },
    {
      id: 4,
      title: "فنجان مع عقدة",
      subtitle: "عبدالله الشمري",
      description: "فنجان مع عقدة"
    },
    {
      id: 5,
      title: "بودكاست فنجان فور",
      subtitle: "OUMA Ahmed Abdelbasset",
      description: "بودكاست فنجان فور"
    },
    {
      id: 6,
      title: "أيقونة فنجان المركز",
      subtitle: "LingLounge",
      description: "أيقونة فنجان المركز"
    },
    {
      id: 7,
      title: "بيك فنجان فور",
      subtitle: "Muhammad",
      description: "بيك فنجان فور"
    }
  ];

  const topEpisodes = [
    {
      id: 1,
      title: "فنجان مسموع",
      subtitle: "نتالو تالكس | نتالو عمل"
    },
    {
      id: 2,
      title: "أول فنجان فور",
      subtitle: "أبو رياض مع بدر محمد"
    },
    {
      id: 3,
      title: "The Cup - فنجان",
      subtitle: "Black Dog Radio"
    },
    {
      id: 4,
      title: "هسة فنجان الرحمن",
      subtitle: "Podcasts By Reham Ayam"
    },
    {
      id: 5,
      title: "2021 فنجان",
      subtitle: "Podcasts By Reham Ayam"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 px-6 py-8">
          <TopPodcasts podcasts={topPodcasts} />
          <TopEpisodes episodes={topEpisodes} />
        </main>
      </div>
    </div>
  );
}
