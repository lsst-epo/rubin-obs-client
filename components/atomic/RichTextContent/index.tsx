import { ComponentProps, FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

interface RichTextContentProps extends ComponentProps<"div"> {
  text: string;
}

const RichTextContent: FC<RichTextContentProps> = ({
  className,
  text,
  ...props
}) => {
  return (
    <div
      {...props}
      data-cy="rich-text-content"
      className={classNames(styles.contentRte, className)}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

RichTextContent.displayName = "Atom.RichTextContent";

export default RichTextContent;
