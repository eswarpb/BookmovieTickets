import React, { useEffect, useState } from "react";
import datab from "./Theatresfirebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";


let hasStoredTheatres=false;

export default function Theatres() {
  const [isLoading, setIsLoading] = useState(false);

  const TheatresData = [
    {
      id: "1",
      name: "AAA Cinemas: Ameerpet",
      showtimes: ["10:45 AM", "03:50 PM", "05:30 PM", "09:30 PM"],
      language: ["Telugu", "Hindi"],
    },
    {
      id: "2",
      name: "Alankar (Pratap Theatre): Langer House",
      showtimes: ["02:00 PM", "05:45 PM", "09:30 PM"],
      language: ["Telugu", "Tamil"],
    },
    {
      id: "3",
      name: "AMB Cinemas: Gachibowli",
      showtimes: ["12:55 PM", "03:50 PM"],
      language: ["Hindi", "Malayalam"],
    },
    {
      id: "4",
      name: "Aparna Cinemas: Nallagandla",
      showtimes: ["02:30 PM", "06:30 PM", "07:25 PM", "10:30 PM", "11:15 PM"],
      language: ["Telugu", "Malayalam"],
    },
    {
      id: "5",
      name: "Prasads Multiplex: Hyderabad",
      showtimes: ["11:00 AM", "02:30 PM", "06:15 PM", "09:45 PM"],
      language: ["Telugu", "Hindi", "English"],
    },
    {
      id: "6",
      name: "PVR: Nexus Mall Kukatpally, Hyderabad",
      showtimes: ["12:00 PM", "03:45 PM", "07:00 PM", "10:30 PM"],
      language: ["Telugu", "Hindi", "English"],
    },
    {
      id: "7",
      name: "Viswanath 70MM Theatre: Kukatpally",
      showtimes: ["01:15 PM", "04:30 PM", "08:00 PM"],
      language: ["Telugu", "Tamil"],
    },
    {
      id: "8",
      name: "INOX: Prism Mall, Hyderabad",
      showtimes: ["10:30 AM", "01:45 PM", "05:15 PM", "08:45 PM"],
      language: ["Hindi", "English", "Telugu"],
    },
    {
      id: "9",
      name: "Cinepolis: TNR North City, Kompally, Hyderabad",
      showtimes: ["11:15 AM", "03:00 PM", "06:45 PM", "10:15 PM"],
      language: ["Telugu", "Hindi", "Kannada"],
    },
    {
      id: "10",
      name: "Movietime Cinemas: SKY Mall, Erragadda X Road",
      showtimes: ["12:15 PM", "04:00 PM", "07:45 PM", "11:15 PM"],
      language: ["Telugu", "English"],
    },
    {
      id: "11",
      name: "Platinum Movietime Cinemas: Ameerpet",
      showtimes: ["10:30 AM", "02:30 PM", "06:15 PM", "09:45 PM"],
      language: ["Telugu", "Hindi"],
    },
    {
      id: "12",
      name: "PVR: Central Mall, Panjagutta",
      showtimes: ["01:00 PM", "04:45 PM", "08:00 PM"],
      language: ["English", "Hindi"],
    },
    {
      id: "13",
      name: "Tivoli Cinemas: Secunderabad",
      showtimes: ["11:30 AM", "02:45 PM", "06:00 PM", "09:15 PM"],
      language: ["Telugu", "Hindi", "English"],
    },
    {
      id: "14",
      name: "Asian Tarakarama Cineplex: Kachiguda",
      showtimes: ["10:15 AM", "01:30 PM", "04:45 PM", "08:00 PM"],
      language: ["Telugu", "Malayalam"],
    },
    {
      id: "15",
      name: "MovieMax: AMR, ECIL Secunderabad",
      showtimes: ["11:00 AM", "02:15 PM", "05:30 PM", "09:00 PM"],
      language: ["Telugu", "Kannada", "English"],
    },
    {
      id: "16",
      name: "Cinepolis: DSL Virtue Mall Uppal, Hyderabad",
      showtimes: ["12:30 PM", "03:45 PM", "07:15 PM", "10:30 PM"],
      language: ["Telugu", "Hindi", "Tamil"],
    },
  ];

  const storeTheatresInFirebase = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(datab, "theatres");

      for (const theatre of TheatresData) {
        const q = query(collectionRef, where("name", "==", theatre.name));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const docRef = await addDoc(collectionRef, { ...theatre });
          console.log("Document written with ID:", docRef.id);
        } else {
          console.log(`Skipping duplicate theatre: ${theatre.name}`);
        }
      }

      alert("Theatres successfully stored in Firebase!");
    } catch (error) {
      console.error("Error adding theatres to Firebase:", error);
      alert("Failed to store theatres. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

// Run the storing function only once when the component mounts
useEffect(() => {
  if (!hasStoredTheatres) {
    hasStoredTheatres = true; // Prevent duplicate execution
    storeTheatresInFirebase();
  }
}, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Storing Theatres in Firebase</h1>
      {isLoading ? (
        <p>Storing theatres...</p>
      ) : (
        <p>Check your Firebase Firestore to see the stored theatres.</p>
      )}
    </div>
  );
}