import "./style.css";

type TPixelBubble = {
  content: string | JSX.Element;
  up?: boolean;
  right?: boolean;
  control?: boolean;
  hover?: boolean;
};
export const PixelBubble = ({
  content,
  control,
  right,
  up,
  hover,
}: TPixelBubble) => {
  const formatClassName = () => {
    let className = "cbbl";
    if (up) className += " -up";
    if (control) className += " -control";
    if (right) className += " -right";
    if (hover) className += " -hover";

    return className;
  };
  return <div className={formatClassName()}>{content}</div>;
};
