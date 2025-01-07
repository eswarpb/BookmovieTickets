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