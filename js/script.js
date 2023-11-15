const firebaseConfig = {
    // your config
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  const messagesRef = database.ref("messages");

  const messagesList = document.getElementById("messages");
  const messageInput = document.getElementById("message");
  const sendButton = document.getElementById("send");

  sendButton.addEventListener("click", () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== "") {
      messagesRef.push({ text: messageText });
      messageInput.value = "";
    }
  });

  messagesRef.on("child_added", (snapshot) => {
    const message = snapshot.val().text;
    const li = document.createElement("p");
    li.textContent = message;
    messagesList.appendChild(li);
  });