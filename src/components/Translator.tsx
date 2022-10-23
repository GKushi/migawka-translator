import Webcam from "react-webcam";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  TrashIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";

interface TranslatorProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const Translator: React.FC<TranslatorProps> = ({ setOpenModal }) => {
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob | undefined>();
  const [faceCamera, setFaceCamera] = useState<boolean>(true);

  const handleStartCaptureClick = useCallback(() => {
    if (!webcamRef.current?.stream || recordedChunks) return;
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    setTimeout(handleStopCaptureClick, 10000);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    (blob: BlobEvent) => {
      if (blob.data.size > 0) {
        setRecordedChunks(blob.data);
      }
    },
    [setRecordedChunks]
  );
  const handleStopCaptureClick = useCallback(() => {
    if (
      !mediaRecorderRef.current ||
      mediaRecorderRef.current.state === "inactive"
    )
      return;
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const sendBlob = useCallback(async () => {
    if (!recordedChunks) return;
    const blob = new Blob([recordedChunks], {
      type: "video/webm",
    });
    let data = new FormData();
    data.append("file", blob);
    await fetch(import.meta.env.VITE_API_ENDPOINT, {
      method: "POST",
      body: data,
    })
      .then((r) => {
        r.json();
      })
      .then((r) => console.log(r));
    setRecordedChunks(undefined);
  }, [recordedChunks]);

  const changeCamera = () => {
    if (capturing) return;
    setFaceCamera(!faceCamera);
  };

  const deleteRecording = () => {
    if (!recordedChunks) return;
    setRecordedChunks(undefined);
  };
  return (
    <div className="translator">
      <div className="webcam-container">
        <Webcam
          audio={false}
          mirrored={faceCamera ? true : false}
          ref={webcamRef}
          videoConstraints={{
            frameRate: 30,
            facingMode: faceCamera ? "user" : "environment",
          }}
          className="webcam"
        />
      </div>
      <div className="webcam-panel">
        <h2>Rozpocznij pokazywanie gestów</h2>
        <div className="webcam-panel-output">
          <p className="webcam-panel-output-placeholder">
            Odczytane wyrazy pojawią się poniżej. Część obsługiwanych gestów
            znajdziesz{" "}
            <span
              className="text-green underline cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              tutaj.
            </span>
          </p>
        </div>
        <div className="webcam-panel-controls">
          <PlayCircleIcon
            className={`icon ${!recordedChunks && !capturing && "active"}`}
            onClick={handleStartCaptureClick}
          />
          <PauseCircleIcon
            className={`icon ${capturing && "active"}`}
            onClick={handleStopCaptureClick}
          />
          <TrashIcon
            className={`icon trash ${recordedChunks && "active"}`}
            onClick={deleteRecording}
          />
          <CameraIcon
            className={`icon camera ${!capturing && "active"}`}
            onClick={changeCamera}
          />
          <button
            className={`${recordedChunks && "active"}`}
            onClick={sendBlob}
          >
            Analizuj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
