import { auth, db } from '../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';


export const registerCompany = async (adminData) => {
  const {
    companyName,
    adminName,
    position,
    email,
    password,
    logo
  } = adminData;

  try {
    // Step 1: Create a secondary Firebase app instance
    const secondaryApp = initializeApp(firebaseConfig, 'Secondary');

    // Step 2: Use secondary auth instance to create the new user
    const secondaryAuth = getAuth(secondaryApp);
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const newUser = userCredential.user;

    // Step 3: Store the data in Firestore
    await setDoc(doc(db, 'userData', newUser.uid), {
      companyName,
      adminName,
      position,
      email,
      adminID: newUser.uid,
      logo,
      designation: 'Administrator'
    });

    await setDoc(doc(db, 'companies', companyName), {
      companyName,
      adminName,
      adminID: newUser.uid,
    });

     await setDoc(doc(db, "userData", newUser.uid, "finances", 'preferences'),{
      cName:companyName,
      fields:{'Service':[]}
     }) // 'data' is the preferences doc ID
    

    // Step 4: Clean up secondary app to avoid memory leaks
    await secondaryApp.delete();

    console.log('Admin user registered without affecting main session.');
    return { success: true, uid: newUser.uid };
  } catch (error) {
    console.error('Error registering admin:', error.message);
    return { success: false, error: error.message };
  }
};
