interface InternalLink {
  id: string;
  uri?: string;
  title: string;
}

interface InternalLinkWithChildren extends InternalLink {
  children: Array<InternalLink>;
}
