import PropTypes from "prop-types";
import Link from "next/link";
import { isInternalUrl } from "@/helpers";
import Button from "../Button";

export default function Buttonish({ isBlock = false, text, url, ...props }) {
  if (!isInternalUrl(url)) {
    return (
      <Button as="a" href={url} $isBlock={isBlock} {...props}>
        {text}
      </Button>
    );
  } else if (url) {
    return (
      <Link href={url} passHref>
        <Button as="a" $isBlock={isBlock} {...props}>
          {text}
        </Button>
      </Link>
    );
  } else {
    return null;
  }
}

Buttonish.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
  isBlock: PropTypes.bool,
};
