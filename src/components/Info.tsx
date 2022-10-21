export interface InfoProps {
  orientation: "left" | "right";
  title: JSX.Element;
  text: JSX.Element;
  image_path: string;
}

const Info: React.FC<InfoProps> = ({
  orientation,
  title,
  text,
  image_path,
}) => {
  return (
    <div className={`info ${orientation === "left" && "left"}`}>
      <div className="info-content">
        <div className="info-content-image-container">
          <img src={image_path} className="info-image" />
        </div>
        <div className="info-content-text">
          {title}
          {text}
          <a>Zacznij migać</a>
        </div>
      </div>
    </div>
  );
};

export default Info;
