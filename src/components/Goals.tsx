import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  GlobeAsiaAustraliaIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

interface GoalProps {
  icon: JSX.Element;
  title: string;
  text: string;
}

const Goal: React.FC<GoalProps> = ({ icon, title, text }) => {
  return (
    <div className="goal">
      {icon}
      <div className="goal-text">
        <span className="goal-text-title">{title}</span>
        <span className="goal-text-text">{text}</span>
      </div>
    </div>
  );
};

const Goals: React.FC = () => {
  const items: GoalProps[] = [
    {
      icon: <HeartIcon className="goal-icon" />,
      title: "Pomoc",
      text: "Walka z wykluczeniem",
    },
    {
      icon: <ChatBubbleLeftRightIcon className="goal-icon" />,
      title: "Komunikacja",
      text: "Łatwość wymiany informacji",
    },
    {
      icon: <GlobeAsiaAustraliaIcon className="goal-icon" />,
      title: "Dostępność",
      text: "Łatwość w użyciu",
    },
    {
      icon: <ChartBarIcon className="goal-icon" />,
      title: "Rozwój",
      text: "Progres społeczeństwa",
    },
  ];

  const responsive = {
    mobile: {
      breakpoint: { max: 1400, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="goals">
      <div className="goals-content">
        <h3>Nasze cele</h3>
        <div className="goals-content-mobile">
          <Carousel
            responsive={responsive}
            swipeable
            autoPlay
            infinite
            autoPlaySpeed={3000}
            customTransition="all .5"
            transitionDuration={500}
          >
            {items.map((it, index) => (
              <Goal {...it} key={index} />
            ))}
          </Carousel>
        </div>
        <div className="goals-content-desktop">
          {items.map((it, index) => (
            <Goal {...it} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
