import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDnjB3O69sA5RbUu5zrrSKQ2CgrEE5gO38",
        authDomain: "bud-of-the-day.firebaseapp.com",
        databaseURL: "https://bud-of-the-day.firebaseio.com"   
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//this is a default export
export default base;