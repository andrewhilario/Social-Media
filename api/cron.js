import { db } from "../src/firebase/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  deleteDoc,
  getDocs
} from "firebase/firestore";

const expiredStories = async () => {
  try {
    // Get the current time
    const currentTime = new Date();

    // Calculate the time 24 hours ago
    const twentyFourHoursAgo = new Date(
      currentTime.getTime() - 24 * 60 * 60 * 1000
    ).toISOString();

    // Query the stories collection for stories older than 24 hours
    const q = query(
      collection(db, "stories"),
      where("uploadDate", "<", twentyFourHoursAgo)
    );

    // Get the documents that match the query
    const querySnapshot = await getDocs(q);

    // Delete each document
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    console.log("Cron job executed successfully.");
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
};

// Schedule the cron job to run every 24 hours
setInterval(expiredStories, 24 * 60 * 60 * 1000);

console.log("Cron job scheduled.");
