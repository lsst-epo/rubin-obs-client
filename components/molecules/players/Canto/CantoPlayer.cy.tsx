import { mount } from "cypress/react18";
import CantoPlayer from ".";
import { CantoVideoMetadata } from "@/lib/api/galleries/schema";

const videos: Array<{
  orientation: "portrait" | "landscape";
  asset: CantoVideoMetadata;
}> = [
  {
    orientation: "landscape",
    asset: {
      additional: {
        AltTextEN: null,
        AltTextES: null,
        CaptionEN:
          "In the first week of October 2024, the team on Cerro Pachón installed Rubin Observatory's 8.4-meter combined primary/tertiary mirror (M1M3) on the Simonyi Survey Telescope for the first time. With all three mirrors and the commissioning camera (ComCam) now in place —Rubin officially has a complete telescope! After getting this version of the telescope on-sky and conducting several months of testing, the team will remove the 144-megapixel ComCam and install the final science component — the car-sized, 3200 megapixel LSST Camera.",
        CaptionES: null,
        Credit: "RubinObs/NOIRLab/SLAC/DOE/NSF/AURA",
        TitleEN: "Rubin's 8.4-meter primary/tertiary mirror is installed",
        TitleES: null,
      },
      height: 1080,
      id: "ij2su39odt4uf1radrmatkcs6m",
      name: "M1M3 Install Final-.mp4",
      scheme: "video",
      url: {
        directUrlOriginal:
          "https://Rubin.canto.com/direct/video/ij2su39odt4uf1radrmatkcs6m/n5eT-aRTCYzlqWGhNcN_Xuxi8RU/original?content-type=video%2Fmp4&name=M1M3+Install+Final-.mp4",
        directUrlPreview:
          "https://Rubin.canto.com/direct/video/ij2su39odt4uf1radrmatkcs6m/wzRUKFG33YuW6u_mJJt_1jUpGeM/m800/800",
        directUrlPreviewPlay:
          "https://Rubin.canto.com/direct/video/ij2su39odt4uf1radrmatkcs6m/wzRUKFG33YuW6u_mJJt_1jUpGeM/play",
      },
      width: 1920,
      default: { DateUploaded: "20241007155436254" },
      metadata: { MIMEType: "video/mp4" },
    },
  },
  {
    orientation: "portrait",
    asset: {
      additional: {
        AltTextEN: null,
        AltTextES: null,
        CaptionEN:
          "In the first week of October 2024, the team on Cerro Pachón installed Rubin Observatory's 8.4-meter combined primary/tertiary mirror (M1M3) on the Simonyi Survey Telescope for the first time. With all three mirrors and the commissioning camera (ComCam) now in place —Rubin officially has a complete telescope! After getting this version of the telescope on-sky and conducting several months of testing, the team will remove the 144-megapixel ComCam and install the final science component — the car-sized, 3200 megapixel LSST Camera.",
        CaptionES: null,
        Credit: null,
        TitleEN: "Rubin's 8.4-meter primary/tertiary mirror is installed",
        TitleES: null,
      },
      height: 1920,
      id: "007uddtafh42b199t84r1s835i",
      name: "M1M3 Install Portrait.mp4",
      scheme: "video",
      url: {
        directUrlOriginal:
          "https://Rubin.canto.com/direct/video/007uddtafh42b199t84r1s835i/Q4HL6xKUyFgygjUlYP7aTsi5MuA/original?content-type=video%2Fmp4&name=M1M3+Install+Portrait.mp4",
        directUrlPreview:
          "https://Rubin.canto.com/direct/video/007uddtafh42b199t84r1s835i/wwh3gL5je1SiuPZPk1bITMMhuJo/m800/800",
        directUrlPreviewPlay:
          "https://Rubin.canto.com/direct/video/007uddtafh42b199t84r1s835i/wwh3gL5je1SiuPZPk1bITMMhuJo/play",
      },
      width: 1080,
      default: { DateUploaded: "20241007155612223" },
      metadata: { MIMEType: "video/mp4" },
    },
  },
];

describe("<CantoPlayer>", () => {
  it("should render a video element", () => {
    mount(<CantoPlayer videos={videos} />);
    cy.get("video").should("exist");
    cy.get("video").should("have.attr", "controls");
  });
  it("should render sources for each video", () => {
    mount(<CantoPlayer videos={videos} />);

    cy.get("source").then((sources) => {
      expect(sources.length).to.be.least(videos.length * 2);

      sources.each((index, source) => {
        expect(source.hasAttribute("src")).to.be.equal(true);
        expect(source.hasAttribute("media")).to.be.equal(true);
        expect(source.hasAttribute("width")).to.be.equal(true);
        expect(source.hasAttribute("height")).to.be.equal(true);
        expect(source.hasAttribute("type")).to.be.equal(true);
      });
    });
  });
  it("should render some structured data", () => {
    mount(<CantoPlayer videos={videos} />);

    cy.get("script").should("exist");
  });
});
