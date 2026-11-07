import * as Styled from "./styles";

interface Props {
  imageUrl?: string;
}

export default function DownloadLink({ imageUrl }: Props) {
  if (!imageUrl) return null;

  return (
    <Styled.DownloadLink href={imageUrl} download>
      Download Image <DownloadSvg />
    </Styled.DownloadLink>
  );
}

function DownloadSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3.95296 6.79446L8 10.3356L12.047 6.79446L12.7055 7.54704L8 11.6644L3.29446 7.54704L3.95296 6.79446Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="M8.5 1.5V11H7.5V1.5H8.5Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path d="M3 13.5H13V14.5H3V13.5Z" fillRule="evenodd" clipRule="evenodd" />
      <path
        d="M3.95296 6.79446L3.29446 7.54704L8 11.6644L12.7055 7.54704L12.047 6.79446L8 10.3356L3.95296 6.79446ZM8.5 11V1.5H7.5V11H8.5ZM13 13.5H3V14.5H13V13.5Z"
        strokeWidth="0.7"
        stroke="currentColor"
      />
    </svg>
  );
}
