const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
    // change to your real credentials
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  const messagesRef = database.ref("messages");

  const messagesList = document.getElementById("messages");
  const messageInput = document.getElementById("message");
  const sendButton = document.getElementById("send");

  const sendMessage = () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
      messagesRef.push({ text: messageText });
      messageInput.value = '';
    }
  };

  sendButton.addEventListener('click', sendMessage);

  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  messagesRef.on("child_added", (snapshot) => {
    const message = snapshot.val().text;
    const li = document.createElement("p");
    li.textContent = message;
    messagesList.appendChild(li);
  });