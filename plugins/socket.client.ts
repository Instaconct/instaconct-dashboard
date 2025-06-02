import { io, Socket } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const isSocketConnected = ref(false);
  const socket: Socket = io("http://209.38.241.76:55359", {
    autoConnect: false,
  });

  let messageCallback: ((msg: any) => void) | null = null;

  function connectSocket(token: string) {
    socket.io.opts.extraHeaders = {
      "x-api-key": token,
    };

    socket.connect();

    socket.on("connect", () => {
      console.log("[✅] Socket connected");
      isSocketConnected.value = true;
    });

    socket.on("connect_error", (err) => {
      console.error("[❌] Connection failed:", err.message);
      isSocketConnected.value = false;
    });

    socket.on("disconnect", () => {
      console.log("[❌] Socket disconnected");
      isSocketConnected.value = false;
    });
  }

  const joinConversation = (ticketId: string) => {
    console.log("Attempting to join conversation for ticketId:", ticketId);
    if (!socket.connected) {
      console.error("[❌] Socket not connected");
      return;
    }

    socket.emit("join-conversation", { ticketId }, (response: any) => {
      console.log("[✅] Joined conversation:", response);
      if (response) {
        console.log("Response:", response);
      } else {
        console.error("[❌] No response received from server");
      }
    });
  };

  const sendMessage = (text: string) => {
    if (!socket.connected) {
      console.error("[❌] sendMessage failed: socket not connected");
      return;
    }

    socket.emit("message", text, (ack: any) => {
      console.log("[📤] Message sent:", ack);
      if (ack) {
        console.log("Message Ack:", ack);
      } else {
        console.error("[❌] No acknowledgment received");
      }
    });
  };

  const onMessage = (callback: (msg: any) => void) => {
    if (messageCallback) {
      socket.off("message", messageCallback);
    }

    messageCallback = (msg: any) => {
      console.log("[📥] New message:", msg);
      callback(msg);
    };

    socket.on("message", messageCallback);
  };

  const offMessage = () => {
    if (messageCallback) {
      socket.off("message", messageCallback);
      messageCallback = null;
      console.log("[🔌] Message listener removed");
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      console.log("[✅] Socket disconnected successfully");
    }
  };

  return {
    provide: {
      socket: {
        connectSocket,
        joinConversation,
        sendMessage,
        onMessage,
        offMessage,
        disconnectSocket,
        isSocketConnected,
      },
    },
  };
});
