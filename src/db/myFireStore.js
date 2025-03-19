// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore/lite";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJPnH4coSCLvxbSnJlTpf-L0bZyfqkZeI",
  authDomain: "skill-exchange-73c3c.firebaseapp.com",
  projectId: "skill-exchange-73c3c",
  storageBucket: "skill-exchange-73c3c.firebasestorage.app",
  messagingSenderId: "956270753054",
  appId: "1:956270753054:web:ea0ac43914f9046d64050f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class MyFireStoreHandler {
  constructor() {
    this.db = db;
    this.skillsPromise = null;
  }

  // ✅ Check if the email exists in Firestore
  async checkIfEmailExists(email) {
    try {
      console.log("Checking if email exists...");
      const usersCol = collection(this.db, "user"); // Ensure 'users' is the correct collection name
      const q = query(usersCol, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty; // ✅ Returns true if email exists
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      console.log("Getting user by email...");
      const usersCol = collection(this.db, "user");
      const q = query(usersCol, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return null;
      }

      // Return the user data along with the document ID (user_id)
      const userDoc = querySnapshot.docs[0];
      const user = { id: userDoc.id, ...userDoc.data() }; // Add doc.id as user_id
      console.log("User data with ID:", user);
      return user;
    } catch (error) {
      console.error("Error getting user by email:", error);
      throw error;
    }
  }

  // ✅ Get skills with caching to avoid repeated calls
  async getSkillsPromise() {
    if (this.skillsPromise) {
      console.log("Returning cached skillsPromise");
      return this.skillsPromise.then((snapshot) =>
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }

    try {
      console.log("Fetching skills from Firestore...");
      const skillsCol = collection(this.db, "skills");
      this.skillsPromise = getDocs(skillsCol); // Store the promise
      const skillsSnapshot = await this.skillsPromise;
      const skillsList = skillsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return skillsList;
    } catch (error) {
      console.error("Error getting skills:", error);
      throw error;
    } finally {
      this.skillsPromise = null; // Reset the cache if needed
    }
  }

  // ✅ Add a new skill to Firestore
  async addSkill(skill) {
    try {
      const skillsCol = collection(this.db, "skills");
      const { id, ...skillWithoutId } = skill; // Remove ID to avoid duplication
      const docRef = await addDoc(skillsCol, skillWithoutId);
      await updateDoc(docRef, { id: docRef.id }); // Set ID after adding
      console.log("Skill added with ID:", docRef.id);
      return { id: docRef.id, ...skillWithoutId };
    } catch (error) {
      console.error("Error adding skill:", error);
      throw error;
    }
  }

  // ✅ Update an existing skill
  async updateSkill(skillId, updatedSkill) {
    try {
      const skillRef = doc(this.db, "skills", skillId);
      await updateDoc(skillRef, updatedSkill);
      return { id: skillId, ...updatedSkill };
    } catch (error) {
      console.error("Error updating skill:", error);
      throw error;
    }
  }

  // ✅ Delete a skill by ID
  async deleteSkill(skillId) {
    try {
      const skillRef = doc(this.db, "skills", skillId);
      await deleteDoc(skillRef);
      console.log("Skill deleted with ID:", skillId);
      return { success: true, id: skillId };
    } catch (error) {
      console.error("Error deleting skill:", error);
      throw error;
    }
  }
}

// ✅ Create an instance of the Firestore handler
const myDB = new MyFireStoreHandler();

export { myDB };
