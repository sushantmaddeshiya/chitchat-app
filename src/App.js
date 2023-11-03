import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./App.css";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLoginAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const upDateHight = () => {
    const el = document.getElementById("myChat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  //Here we add this to read data
  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        upDateHight();
      }, 100);
    });
  }, []);

  const sendChats = () => {
    //use here create new object to send firebase
    const chatListRef = ref(db, "chats");
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });
    setMsg("");
  };

  return (
    <div>
      {user.email ? null : (
        <div className="authBtn">
          <button
            className="authBtnStyle"
            onClick={(e) => {
              googleLoginAuth();
            }}
          >
            Sign-in with Google
          </button>
        </div>
      )}
      {user.email ? (
        <div>
          <h3>User: {user.name}</h3>
          <div id="myChat" className="chatroom-container">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${
                  c.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong>{c.user.name}: </strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="Enter Your Text Here"
            ></input>
            <button onClick={(e) => sendChats()}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
