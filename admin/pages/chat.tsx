import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { Heading } from "@keystone-ui/core";
import { useState } from "react";

export default function CustomPage() {
  const [sessionID, setSessionID] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [chatting, setChatting] = useState<boolean>(false);

  async function startSession() {
    const response = await fetch("/api/ai/start", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw response.statusText;
    }
    const data = await response.json();
    setSessionID(data.sessionID);
  }

  async function chat() {
    if (!sessionID) {
      return;
    }
    setAnswer("");
    setChatting(true);
    const response = await fetch("/api/ai/call", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionID,
        prompt,
      }),
    });
    if (!response.ok || !response.body) {
      throw response.statusText;
    }

    // Here we start prepping for the streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const loopRunner = true;

    while (loopRunner) {
      // Here we start reading the stream, until its done.
      const streamed = await reader.read();
      const { done, value } = streamed;
      if (done) {
        break;
      }
      const decodedChunks = decoder.decode(value, { stream: true }).split("\n");
      try {
        for (const decodedChunk of decodedChunks) {
          if (!decodedChunk) {
            continue;
          }
          const parsedChunk = JSON.parse(decodedChunk);
          console.log(parsedChunk);
          switch (parsedChunk._type) {
            case "response": {
              setAnswer((answer) => answer + parsedChunk.response);
              break;
            }
            case "function_call": {
              setAnswer(
                (answer) =>
                  answer + `\n[Calling function: ${parsedChunk.functionName}]`
              );
              break;
            }
            case "function_fetch": {
              setAnswer(
                // (answer) => answer + `\n>> ${parsedChunk.functionData}\n`
                (answer) => answer + `\n>> Done\n`
              );
              break;
            }
          }
        }
      } catch (e) {
        console.log("Error parsing chunk", e, decodedChunks);
      }
    }
    setChatting(false);
  }
  return (
    <PageContainer header={<Heading type="h3">Custom Page</Heading>}>
      <h1>Sample Chat Stream</h1>
      {!sessionID && (
        <>
          <button onClick={startSession}>Start Session</button>
        </>
      )}
      {sessionID && (
        <>
          <p>
            Session ID: <strong>{sessionID}</strong>
          </p>
          {!chatting && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ width: "80%", border: "1px solid #ccc" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    chat();
                  }
                }}
              />
              <button
                onClick={chat}
                style={{
                  width: "20%",
                }}
              >
                Chat
              </button>
            </div>
          )}
          <p>
            Answer:{" "}
            <strong
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {answer}
            </strong>
          </p>
        </>
      )}
    </PageContainer>
  );
}
