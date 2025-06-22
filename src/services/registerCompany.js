import { auth, db } from '../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const registerCompany = async (adminData) => {
  const {
    companyName,
    adminName,
    position,
    email,
    password,
    logo // 👈 File object
  } = adminData;

  try {
    const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
    const secondaryAuth = getAuth(secondaryApp);
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const newUser = userCredential.user;

    // Upload logo to Firebase Storage
    let logoURL = "";
    if (logo) {
      const storage = getStorage();
      const storageRef = ref(storage, `company_logos/${companyName}_${Date.now()}`);
      await uploadBytes(storageRef, logo);
      logoURL = await getDownloadURL(storageRef);
    }

    // Save to Firestore
    await setDoc(doc(db, 'userData', newUser.uid), {
      companyName,
      adminName,
      position,
      email,
      adminID: newUser.uid,
      designation: 'Administrator',
      logoURL
    });

    await setDoc(doc(db, 'companies', companyName), {
      companyName,
      adminName,
      adminID: newUser.uid,
      logoURL
    });

    await setDoc(doc(db, "userData", newUser.uid, "finances", 'preferences'), {
      cName: companyName,
      fields: { 'Service': [] }
    });

    await secondaryApp.delete();
    return { success: true, uid: newUser.uid };
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, error: error.message };
  }
};
