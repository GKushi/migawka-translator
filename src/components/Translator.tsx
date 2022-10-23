import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { ColorRing } from "react-loader-spinner";
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
  const TimeoutRef = useRef<number | null>(null);

  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob | undefined>();
  const [faceCamera, setFaceCamera] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string[] | undefined>();

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
    TimeoutRef.current = setTimeout(handleStopCaptureClick, 10000);
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
    if (TimeoutRef.current) clearTimeout(TimeoutRef.current);
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const sendBlob = useCallback(async () => {
    if (!recordedChunks || loading) return;

    setLoading(true);
    const blob = new Blob([recordedChunks], {
      type: "video/webm",
    });
    let data = new FormData();
    data.append("file", blob, "file.webm");
    await fetch(import.meta.env.VITE_API_ENDPOINT, {
      method: "POST",
      body: data,
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        setResponse(r.preds);
      });
    setLoading(false);
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
        <h2>Włącz nagrywanie i rozpocznij pokazywanie gestów</h2>
        <div className="webcam-panel-output">
          <p className="webcam-panel-output-placeholder">
            Odczytane wyrazy pojawią się poniżej. Instrukcję oraz część
            obsługiwanych gestów znajdziesz{" "}
            <span
              className="text-green underline cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              tutaj.
            </span>
          </p>
          <ColorRing
            visible={loading}
            wrapperClass="webcam-panel-output-loading"
            colors={["#00665C", "#00665C", "#00665C", "#00665C", "#00665C"]}
          />
          <div className="webcam-panel-output-response">
            {response &&
              response.map((res, index) => (
                <span className="block" key={index}>
                  {res}
                </span>
              ))}
            {response && response.length === 0 && (
              <span>Nie wykryto żadnego gestu!</span>
            )}
          </div>
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
            className={`${recordedChunks && !loading && "active"}`}
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
