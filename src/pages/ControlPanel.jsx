import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Register from '../components/Register';
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // your firebase config

const ControlPanel = () => {
  const [user, setUser] = useState(null);
  console.log(user);
  

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // currentUser.uid is the user ID
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const text = await file.text();
  const importedData = JSON.parse(text);
  uploadToFirestore(importedData);
};

const uploadToFirestore = async (data) => {
  const path = 'users'; // change to your desired Firestore path
  const userid='Ovq274qYz5f065l6zbzMRafVFfl1'
  for (const item of data) {
  const expensesRef = collection(db, "userData", userid, "finances", "financialData", "expenses");
  await addDoc(expensesRef, item); // adds with auto-ID
}

  alert('Upload complete!');
};


  return (
    <div>
      <h2>Logged in as: {user?.email}</h2>
      <p>User ID: {user?.uid}</p>
      <Register user={user} />
    </div>
  );
};

export default ControlPanel;
