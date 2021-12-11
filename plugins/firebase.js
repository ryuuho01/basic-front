import firebase from 'firebase/app'
import "firebase/auth"

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyBzJIuS247Ff9TbDnq0FvbEmP6QYmB_udU",
      authDomain: "advancepj-e5f04.firebaseapp.com",
      projectId: "advancepj-e5f04",
      storageBucket: "advancepj-e5f04.appspot.com",
      messagingSenderId: "237180961302",
      appId: "1:237180961302:web:d05715b99912a1c100ab37",
      measurementId: "G-E7SKG2XTJ2"
    }
  )
}
  
export default firebase