import React, { useEffect, useState } from "react";
import db from "./Moviesfirebase.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

let hasStoredMovies = false; // Persistent flag to prevent re-execution

export default function StoreMovies() {
  const [isLoading, setIsLoading] = useState(false);

  // Movie data to store in Firestore
  const movies = [
    {
      title: "Mufasa: The Lion King",
      rating: "8.5/10",
      votes: "135.6K Votes",
      trailerUrl:
        "https://www.youtube.com/embed/CDgOcSh9hKM?si=XjQoDD0saF84OHnK",
      genre: "Action, Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mufasa-the-lion-king-et00396541-1734081980.jpg",
      formats: [
        "2D",
        "3D",
        "ICE 3D",
        "IMAX 2D",
        "IMAX 3D",
        "MX4D 3D",
        "4DX 3D",
      ],
      languages: ["English", "Telugu", "Tamil", "Hindi"],
      duration: "1h 58m",
      releaseDate: "20 Dec 2024",
      ageRating: "U",
      description:
        "A prequel to the beloved Lion King saga, Mufasa explores the journey of Simba's father, from his humble beginnings to becoming a revered king of the Pride Lands.",
      cast: [
        {
          name: "Mahesh Babu as Mufasa (Telugu)",
          image:
            "https://in.bmscdn.com/iedb/artist/images/website/poster/large/mahesh-babu-36982-20-12-2017-04-21-05.jpg",
        },
        {
          name: "Aryan Khan as Simba (Hindi)",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aryan-khan-26062-19-09-2017-16-58-17.jpg",
        },
      ],
    },
    {
      title: "Pushpa 2: The Rule",
      rating: "8.4/10",
      votes: "296.1K Votes",
      trailerUrl:
        "https://www.youtube.com/embed/1StdAUcreJ4?si=cAro-qb8z0Nbz-Bg",
      genre: "Action/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1729771762.jpg",
      formats: ["2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 20m",
      releaseDate: "5 Dec 2024",
      ageRating: "UA16+",
      description:
        "The continuation of Pushpa Raj's story as he faces new challenges while navigating the criminal underworld and protecting his loved ones.",
      cast: [
        {
          name: "Allu Arjun as Pushpa Raj",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/allu-arjun-125-03-10-2016-01-55-06.jpg",
        },
        {
          name: "Rashmika Mandanna as Srivalli",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rashmika-mandanna-1076783-28-12-2016-12-20-39.jpg",
        },
      ],
    },
    {
      title: "Bachhala Malli",
      rating: "8.2/10",
      votes: "50.3K Votes",
      trailerUrl:"https://www.youtube.com/embed/aggB9HZItzg?si=hW_9neGHVt7mYll_",
      genre: "Action/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/bachhala-malli-et00401910-1718777745.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 16m",
      releaseDate: "20 Dec 2024",
      ageRating: "UA+",
      description:"A tale of love, betrayal, and redemption set in the heartland, where one man fights against the odds to reclaim his honor.",
      cast: [
        {
          name: "Allari Naresh",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/allari-naresh-2640-24-03-2017-12-48-05.jpg",
        },
        {
          name: "Amritha Aiyer",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/amritha-aiyer-2007988-19-03-2020-12-58-29.jpg",
        },
      ],
    },

    {
      title: "Lucky Baskhar",
      rating: "9.3/10",
      votes: "150.7K Likes",
      trailerUrl:"https://www.youtube.com/embed/Kv5RKsqVe-Y?si=90NCLPrPTw6zvC5S",
      genre: "Crime/Drama/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/lucky-baskhar-et00386123-1707118235.jpg",
      formats: ["2D"],
      languages: ["Malayalam", "Telugu", "Hindi", "Tamil", "Kannada"],
      duration: "2h 30m",
      releaseDate: "31 Oct 2024",
      ageRating: "UA",
      description:"Lucky Baskhar, an ordinary man with an extraordinary plan, unravels a gripping tale of deception and survival.",
      cast: [
        {
          name: "Dulquer Salmaan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/dulquer-salmaan-37626-19-09-2017-04-04-09.jpg",
        },
        {
          name: "Meenakshi Chaudhary",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/meenakshi-chaudhary-2014033-1651641584.jpg",
        },
      ],
    },

    {
      title: "UI",
      rating: "8.4/10",
      votes: "54.7K Votes",
      trailerUrl:"https://www.youtube.com/embed/Za0yA0j-DK8?si=ow6VRr6gPQv0ZkNS",
      genre: "Action/Sci-Fi/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ui-2024-et00370266-1733467456.jpg",
      formats: ["2D"],
      languages: ["Kannada", "Telugu", "Hindi", "Tamil", "Malayalam"],
      duration: "2h 12m",
      releaseDate: "25 Dec 2024",
      ageRating: "UA",
      description:"Set in a dystopian future, 'UI' delves into a world where artificial intelligence controls human lives, and a rebel rises to challenge the status quo.",
      cast: [
        {
          name: "Upendra",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/upendra-2420-24-03-2017-17-35-15.jpg",
        },
        {
          name: "Reeshma Nanaiah",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/reeshma-nanaiah-2004571-1667300383.jpg",
        },
      ],
    },

    {
      title: "Amaran",
      rating: "9.4/10",
      votes: "200.7K Likes",
      trailerUrl:"https://www.youtube.com/embed/U3aPapvUihg?si=gC1f4kqn8t7x4pVz",
      genre: "Action/Drama/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/amaran-et00388085-1728627184.jpg",
      formats: ["2D"],
      languages: ["Tamil", "Telugu", "Hindi", "Kannada", "Malayalam"],
      duration: "2h 49m",
      releaseDate: "31 Oct 2024",
      ageRating: "UA",
      description:"A gritty drama showcasing the rise and fall of a crime lord, battling foes within and outside his syndicate.",
      cast: [
        {
          name: "Sivakarthikeyan as Major Mukund Varadarajan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg",
        },
        {
          name: "Sai Pallavi as Indhu Rebecca Varghese",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sai-pallavi-1065111-1654347116.jpg",
        },
      ],
    },

    {
      title: "Kanguva",
      rating: "6.5/10",
      votes: "121K Likes",
      trailerUrl:"https://www.youtube.com/embed/fUekk6TVeq4?si=j08eRk9PzGphBbdv",
      genre: "Action/Adventure/Period",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kanguva-et00357490-1711005979.jpg",
      formats: ["2D", "ICE", "ICE 3D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Tamil", "Hindi", "Telugu", "Kannada", "Malayalam"],
      duration: "2h 34m",
      releaseDate: "14 Nov 2024",
      ageRating: "UA",
      description:"An epic tale of a warrior destined to change the fate of his kingdom, with mythical creatures and treacherous enemies.",
      cast: [
        {
          name: "Suriya Sivakumar as Kanguva/Kangaa",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/suriya-sivakumar-3823-1689655189.jpg",
        },
        {
          name: "Disha Patani as Angelina",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/disha-patani-1061408-1714379037.jpg",
        },
      ],
    },

    {
      title: "Game Changer",
      rating: "8.7/10",
      votes: "292.4K Likes",
      genre: "Drama/Political",
      trailerUrl:"https://www.youtube.com/embed/_iFmNHvqWqA?si=wiH74ZlmCJFWlQND",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/game-changer-et00311772-1731311322.jpg",
      formats: ["2D", "3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 40m",
      releaseDate: "10 Jan 2025",
      ageRating: "UA",
      description:"A gripping political drama about a visionary leader challenging the corrupt political system with his unorthodox methods.",
      cast: [
        {
          name: "Ram Charan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ram-charan-teja-1046368-19-09-2017-02-37-43.jpg",
        },
        {
          name: "Kiara Advani",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/kiara-advani-1043272-1655467015.jpg",
        },
      ],
    },

    {
      title: "They Call Him OG",
      rating: "9.4/10",
      votes: "505.7K Likes",
      genre: "Action/Drama",
      trailerUrl:"https://www.youtube.com/embed/1Zw7PmkSAlI?si=jQ4VlmPk6oAE3j4I",
      poster:"https://cdn.123telugu.com/content/wp-content/uploads/2024/06/OG.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 30m",
      releaseDate: "29 Apr 2025",
      ageRating: "UA",
      description:"A man with a mysterious past fights for justice in a tale of love, revenge, and redemption.",
      cast: [
        {
          name: "Pawan Kalyan as OG",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/pawan-kalyan-26911-19-09-2017-02-46-38.jpg",
        },
        {
          name: "Priyanka Arul Mohan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/priyanka-arul-mohan-1095858-30-10-2018-10-24-47.jpg",
        },
      ],
    },

    {
      title: "Sankranthiki Vasthunnam",
      rating: "8.5/10", // Rating not available yet
      votes: "157.2K Likes", // Votes not available yet
      trailerUrl:"https://www.youtube.com/embed/hhqM-A7lMDM?si=ZC7MXMaElWxsn32Q",
      genre: "Action/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sankranthiki-vasthunam-et00418119-1731656543.jpg", // Placeholder poster image
      formats: ["2D", "3D"],
      languages: ["Telugu"],
      duration: "2h 10m",
      releaseDate: "14 Jan 2025",
      ageRating: "UA+",
      description:"A gripping story of a man who rises from humble beginnings to challenge societal norms and fight for justice during a festive season.",
      cast: [
        {
          name: "Daggubati Venkatesh as YD Raju",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/daggubati-venkatesh-2447-1666010853.jpg",
        },
        {
          name: "Aishwarya Rajesh as Bhagya Lakshmi",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aishwarya-rajesh-1048096-1680242348.jpg",
        },
      ],
    },
    {
      title: "Daaku Maharaaj",
      rating: "8.2/10",
      votes: "140.3K Likes",
      trailerUrl:"https://www.youtube.com/embed/teN0JZ67KZU?si=wH6ksqRAGvUauJsB",
      genre: "Action/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/daaku-maharaaj-et00419964-1731669684.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 10m",
      releaseDate: "12 Jan 2025",
      ageRating: "UA",
      description:"Set in the rugged terrains of India, the story follows a legendary bandit leader who becomes an unlikely savior of the oppressed.",
      cast: [
        {
          name: "Nandamuri Balakrishna",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nandamuri-balakrishna-282-24-03-2017-17-27-29.jpg",
        },
        {
          name: "Shraddha Srinath",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/shraddha-srinath-30452-1695707094.jpg",
        },
      ],
    },

    {
      title: "Thandel",
      rating: "8.5/10",
      votes: "300.8K Votes",
      trailerUrl:"https://www.youtube.com/embed/RlRpN1Fa9Wo?si=-qlW0v9JOG1k0ASj",
      genre: "Action/Drama/Romantic",
      poster:"https://m.media-amazon.com/images/M/MV5BYjljYmFhMWEtMzYyOS00NzZmLThiNTktMjA0ZWQ4Njg3MDI1XkEyXkFqcGc@.V1.jpg",
      formats: ["2D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 50m",
      releaseDate: "7 Feb 2025",
      ageRating: "A",
      description:"An epic saga of love, revenge, and redemption set against the backdrop of war and familial ties.",
      cast: [
        {
          name: "Naga Chaitanya Akkineni",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/naga-chaitanya-akkineni-13567-1655789028.jpg",
        },
        {
          name: "Sai Pallavi",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sai-pallavi-1065111-1654347116.jpg",
        },
      ],
    },

    {
      title: "Kalki 2898 AD",
      rating: "8.6/10",
      votes: "112.8K Votes",
      trailerUrl:"https://www.youtube.com/embed/y1-w1kUGuz8?si=MzRhX-8BcKEkHKk3",
      genre: "Sci-Fi/Action/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00352941-1718275859.jpg",
      formats: ["2D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 1m",
      releaseDate: "27 Jun 2024",
      ageRating: "UA",
      description:"Set in a dystopian future, the story follows a warrior's journey to restore balance to the world.",
      cast: [
        { 
          name: "Prabhas", 
          image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg" 
        },
        { 
          name: "Deepika Padukone", 
          image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/deepika-padukone-2822-12-09-2017-06-31-43.jpg" 
        },
      ],
    },

    {
      title: "Animal",
      rating: "8.2/10",
      votes: "400.4K Votes",
      trailerUrl:"https://www.youtube.com/embed/YD7b4gU0HWQ?si=Bz1Zd--pEVZbdkmV",
      genre: "Action/Crime/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/animal-et00311762-1672646524.jpg",
      formats: ["2D", "IMAX 2D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 21m",
      releaseDate: "1 Dec 2023",
      ageRating: "A",
      description:"A gritty tale of a man battling the scars of his past while standing up against a powerful underworld crime syndicate.",
      cast: [
        {
          name: "Ranbir Kapoor",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ranbir-kapoor-2817-1691565170.jpg",
        },
        {
          name: "Rashmika Mandanna",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rashmika-mandanna-1076783-28-12-2016-12-20-39.jpg",
        },
      ],
    },

    {
      title: "Salaar: Cease Fire - Part 1",
      rating: "9.1/10",
      votes: "650.3K Votes",
      trailerUrl:"https://www.youtube.com/embed/Joo_jE8kMDg?si=qnOzbApUPfKIOvxs",
      genre: "Action/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/salaar-cease-fire--part-1-et00301886-1702971289.jpg",
      formats: ["2D", "IMAX 2D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 55m",
      releaseDate: "22 Dec 2023",
      ageRating: "A",
      description:"An explosive thriller showcasing the rise of a formidable warrior who takes on an empire to protect his people.",
      cast: [
        {
          name: "Prabhas",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg",
        },
        {
          name: "Shruti Haasan",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/shruti-haasan-29670-18-09-2017-05-02-43.jpg",
        },
      ],
    },

    {
      title: "Hari Hara Veera Mallu",
      rating: "8.3/10",
      votes: "145.7K Likes",
      trailerUrl:"https://www.youtube.com/embed/4TriF7BfHyI?si=leIoV1CRnaYymajR",
      genre: "Action/Adventure/Period/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/hari-hara-veera-mallu-et00308207-26-08-2021-04-26-29.jpg",
      formats: ["2D", "3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 30m",
      releaseDate: "28 Mar 2025",
      ageRating: "UA",
      description:"A swashbuckling tale of a legendary outlaw navigating treacherous politics and high-stakes missions during the Mughal era.",
      cast: [
        {
          name: "Pawan Kalyan",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/pawan-kalyan-26911-19-09-2017-02-46-38.jpg",
        },
        {
          name: "Nidhhi Agerwal",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nidhhi-agerwal-1083263-29-06-2021-01-57-05.jpg",
        },
      ],
    },

    {
      title: "The Raja Saab",
      rating: "9.3/10",
      votes: "95.5 Likes",
      genre: "Comedy/Horror/Romantic",
      trailerUrl:"https://www.youtube.com/embed/ihO4EGhUS_4?si=-ZGAE82bnRIByU-L",
      poster:"https://filmfare.wwmindia.com/content/2024/oct/prabhastherajasaab11729510718.jpg",
      formats: ["2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Kannada"],
      duration: "2h 50m",
      releaseDate: "10 Apr 2025",
      ageRating: "UA+",
      description:"A quirky royal embarks on a comedic and spooky journey to find love in an unexpected place.",
      cast: [
        {
          name: "Prabhas",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg",
        },
        {
          name: "Nidhhi Agerwal",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nidhhi-agerwal-1083263-29-06-2021-01-57-05.jpg",
        },
      ],
    },

    {
      title: "Avatar: Fire and Ash",
      rating: "9.6/10",
      votes: "400.5 Likes",
      genre: "Action/Adventure/Sci-Fi",
      trailerUrl:"https://www.youtube.com/embed/ti-b0hGdggQ?si=jyonnjWzR5gOlvAZ",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/avatar-fire-and-ash-et00407893-1723442554.jpg",
      formats: ["2D"],
      languages: ["English"],
      duration: "2h 41m",
      releaseDate: "19 Dec 2025",
      ageRating: "A",
      description:"The saga continues as the Na'vi embark on a new journey to protect their world from devastating threats.",
      cast: [
        {
          name: "Sam Worthington",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sam-worthington-12089-24-03-2017-12-32-07.jpg",
        },
        {
          name: "Zoe Saldana",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/zoe-saldana-3261-13-10-2017-03-54-34.jpg",
        },
      ],
    },

    {
      title: "Spirit",
      rating: "9.4/10",
      votes: "112.8K Votes",
      genre: "Action/Crime/Drama",
      poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTje16-w9Y8wOITtZUkr_TLaV9-N-sHvp57Kg&s",
      formats: ["2D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 50m",
      releaseDate: "15 Jan 2026",
      ageRating: "A",
      description:"A fearless vigilante takes on a ruthless criminal empire in a story of redemption and justice.",
      cast: [
        {
          name: "Prabhas",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg",
        },
        {
          name: "Kiara Advani",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/kiara-advani-1043272-1655467015.jpg",
        },
      ],
    },

    {
      title: "Baby John",
      rating: "7.3/10",
      votes: "88.5 Likes",
      trailerUrl:"https://www.youtube.com/embed/qyRn3rPRw8w?si=lOMvDjN_AEx4cOhx",
      genre: "Action/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/baby-john-et00386190-1733985497.jpg",
      formats: ["2D"],
      languages: ["Hindi"],
      duration: "2h 41m",
      releaseDate: "25 Dec 2024",
      ageRating: "UA16+",
      description:"A gripping action-thriller revolving around a mysterious man and his dark past.",
      cast: [
        {
          name: "Varun dhawan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/varun-dhawan-21064-12-09-2017-02-22-38.jpg",
        },
        {
          name: "Keerthy Suresh",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/keerthy-suresh-1053454-24-03-2017-17-42-15.jpg",
        },
      ],
    },
  ];

  // Function to store movies in Firestore
  const storeMoviesInFirebase = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, "movies"); // Reference to the "movies" collection

      for (const movie of movies) {
        // Query to check if the movie already exists
        const q = query(collectionRef, where("title", "==", movie.title));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Add movie to Firestore if not already present
          const docRef = await addDoc(collectionRef, { ...movie });
          console.log("Document written with ID: ", docRef.id);
        } else {
          console.log(`Skipping duplicate movie: ${movie.title}`);
        }
      }

      alert("Movies successfully stored in Firebase!");
    } catch (error) {
      console.error("Error adding movies to Firebase:", error);
      alert("Failed to store movies. Check the console for details.");
    } finally {
      setIsLoading(false); // Stop the loading indicator
    }
  };

  // Run the storing function only once when the component mounts
  useEffect(() => {
    if (!hasStoredMovies) {
      hasStoredMovies = true; // Prevent duplicate execution
      storeMoviesInFirebase();
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Storing Movies in Firebase</h1>
      {isLoading ? (
        <p>Storing movies...</p>
      ) : (
        <p>Check your Firebase Firestore to see the stored movies.</p>
      )}
    </div>
  );
}