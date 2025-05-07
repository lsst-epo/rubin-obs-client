import { mount } from "cypress/react18";
import GalleryImage from ".";
import { LinkProps } from "next/link";
import { ImageObject } from "schema-dts";

const metadata: ImageObject = {
  "@type": "ImageObject",
  caption: `In one of the early images taken with Rubin's 144-megapixel test camera, Rubin staff gathered for a group photo inside the observatory dome, with the Simonyi Survey Telescope pointed at horizon. This "pinhole" image was created using the camera's sensors but without using lenses or mirrors to focus light. Instead of forming a detailed, zoomed-in picture, this technique gives a soft, unfocused image. The visible grid pattern of the camera's sensor array overlays the image.`,
  contentSize: "1380592",
  contentUrl:
    "https://Rubin.canto.com/direct/image/vf95idcg5944p8aftabvc7r12g/rApiwPUSL-N8ZaokvRpp_xZfTzs/original?content-type=image%2Ftiff&name=ann24031a+%281%29.tif",
  creditText: "RubinObs/NOIRLab/SLAC/NSF/DOE/AURA",
  encodingFormat: "image/tiff",
  height: "1008px",
  width: "1002px",
  dateCreated: "2024-10-25 23:26:03",
  thumbnail: {
    "@type": "ImageObject",
    contentUrl:
      "https://Rubin.canto.com/direct/image/vf95idcg5944p8aftabvc7r12g/9ZN1g81xooEvWT2iYY93XSIUEkI/m640/100",
  },
};

const width = 1008;
const height = 1002;
const src =
  "https://Rubin.canto.com/direct/image/vf95idcg5944p8aftabvc7r12g/9ZN1g81xooEvWT2iYY93XSIUEkI/m640/2050";
const alt =
  "A softly blurred, teal-tinged photo of the circle-shaped top end of Rubin’s Simonyi Survey Telescope, which fills the image. A group of about 10 tiny human figures is lined up at the very bottom of the photo, lining the bottom of the circle. A three-by-three grid separated by black lines is overlaid on the image, indicating the camera's sensor array.";
const title = "ann24031a (1).tif";

const link: LinkProps = {
  href: "/gallery/collections/main/vf95idcg5944p8aftabvc7r12g",
};

describe("<GalleryImage>", () => {
  it("has an image", () => {
    mount(<GalleryImage {...{ width, height, src, alt, title, metadata }} />);

    cy.get("img")
      .should("have.attr", "width", width.toString())
      .should("have.attr", "height", height.toString())
      .should("have.attr", "title", title)
      .should("have.attr", "alt", alt);
  });
  it("embeds structured data", () => {
    mount(<GalleryImage {...{ width, height, src, alt, title, metadata }} />);

    cy.get("script").then((script) => {
      const structured = JSON.parse(script.text());

      Object.entries(structured).forEach(([key, value]) => {
        if (metadata[key] && typeof metadata[key] === "string") {
          expect(metadata[key]).to.eq(value);
        }
      });
    });
  });
  it("wraps images in a links", () => {
    mount(
      <GalleryImage {...{ width, height, src, alt, title, metadata, link }} />
    );

    cy.get("a").should("have.attr", "href", link.href);
  });
  it("shows a skeleton loader", () => {
    mount(<GalleryImage {...{ width, height, src, alt, title, metadata }} />);

    cy.get("[aria-busy='true']").should("exist");
  });
});
