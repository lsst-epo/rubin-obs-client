import { mkdir, writeFile } from "fs/promises";

export const data2domefeed = JSON.stringify({
  Count: 5,
  Collections: [
    {
      Creator: "RubinObs/NSF/AURA",
      URL: "https://rubinobs.org",
      ID: "Black Holes",
      Title: "Black Holes",
      Description:
        "<p>A black hole is an object that is sufficiently massive and compact so that its strong gravity creates a region of spacetime around it from which nothing can escape, including light. The warping of spacetime near a black hole is explained by the general theory of relativity.</p>",
      Credit: "Caltech-IPAC/LSST Project/NSF/AURA",
      PublicationDate: "2022-10-28T14:00:00Z",
      Assets: [
        {
          MediaType: "Video",
          Resources: [
            {
              ResourceType: "Original",
              MediaType: "Image",
              URL: "https://rubin.canto.com/direct/v/RubinPlanetariumAssets/other/ajdf9icnml59146dh4sc0fv86r/PUMTrfLZLZgVU_jzmaNwRo7SQBQ/original?content-type=application%2Fzip&name=Black+Holes+-+image+sequence.zip",
              FileSize: 6360000000,
              Dimensions: [4096, 4096],
              ProjectionType: "FullDome",
            },
            {
              ResourceType: "Preview",
              MediaType: "Video",
              URL: "https://rubin.canto.com/direct/v/RubinPlanetariumAssets/video/7toieqiab93g1dguss9f4lan7f/DE0U0ueXa3LJGLlkuqu-iiB2oi4/original?content-type=video%2Fx-m4v&name=Black+Holes+-+2K+video.m4v",
              FileSize: 96470000,
              Dimensions: [2048, 2048],
              ProjectionType: "FullDome",
            },
            {
              ResourceType: "Thumbnail",
              MediaType: "Image",
              URL: "https://rubin.canto.com/direct/video/7toieqiab93g1dguss9f4lan7f/M9n_f4KLUVV0L4SQJPDPMh-Zdpw/m800/800",
              FileSize: 30000,
              Dimensions: [800, 800],
              ProjectionType: "FullDome",
            },
          ],
        },
      ],
    },
    {
      Creator: "RubinObs/NSF/AURA",
      URL: "https://rubinobs.org",
      ID: "Galaxy Evolution",
      Title: "Galaxy Evolution",
      Description:
        "<p>What does it take to build a galaxy? Galaxies, including our own Milky Way, have a dynamic and chaotic history. A dramatic sequence of events is necessary to transform dark matter and gas into the beautiful spiral galaxies we see today. This video shows a computer simulation that demonstrates how a galaxy like our Milky Way formed and changed over 13.8 billion years. The simulation begins shortly aer the Big Bang, and ends with the galaxy looking as it would now. The simulation also includes the expansion of the Universe, which affects how a galaxy forms.</p>",
      Credit:
        "Fiske Planetarium, University of Colorado Boulder Benjamin D. Oppenheimer (benjamin.oppenheimer@colorado.edu) Data Sources: This EAGLE (Evolution and Assembly of GaLaxies and their Environments) simulation was run on the RMACC Summit Supercomputer hosted at the University of Colorado, Boulder.",
      PublicationDate: "2022-10-28T14:00:00Z",
      Assets: [
        {
          MediaType: "Video",
          Resources: [
            {
              ResourceType: "Preview",
              MediaType: "Video",
              URL: "https://rubin.canto.com/direct/video/cpf5dueupl3gh667lbna97pp7h/PaZpvbRG-cMXRvSRb4fT8od2AiQ/original?content-type=video%2Fmp4&name=Galaxy+Evolution+-+2K+video.mp4",
              FileSize: 197920000,
              Dimensions: [2048, 2048],
              ProjectionType: "FullDome",
            },
            {
              ResourceType: "Thumbnail",
              MediaType: "Image",
              URL: "https://rubin.canto.com/direct/video/cpf5dueupl3gh667lbna97pp7h/ShP3uhz4r-EBeoWOFdJ8h5xC_9M/m800/800",
              FileSize: 26742,
              Dimensions: [800, 800],
              ProjectionType: "FullDome",
            },
          ],
        },
      ],
    },
    {
      Creator: "RubinObs/NSF/AURA",
      URL: "https://rubinobs.org",
      ID: "Supernovae",
      Title: "Supernovae",
      Description:
        "<p>A supernova is an explosion that occurs upon the death of certain types of stars. There are two known causes of supernovae. In the first instance, called a “Type Ia” supernova, a white dwarf collapses and explodes aer accreting enough mass to exceed the Chandrasekar limit. In this case the star is completely destroyed. Because the white dwarf is always the same mass, Type Ia supernovae can be used as standard candles to measure the distances to their host galaxies. The second kind of supernova is a “core-collapse supernova,” which occurs when the core of a massive star collapses and explodes. Much of the mass of the star is ejected into space at a high velocity while the core collapses into a neutron star or black hole. In both cases the shockwave produced by a supernova can trigger the formation of new stars.</p>",
      Credit: "Caltech-IPACIPAC/RubinObs/NSF/AURA",
      PublicationDate: "2022-10-28T14:00:00Z",
      Assets: [
        {
          MediaType: "Video",
          Resources: [
            {
              ResourceType: "Preview",
              MediaType: "Video",
              URL: "https://rubin.canto.com/direct/video/83pd66h2n51etf7jb88352b23p/wrH7iGgG2AXUQ-LUpqi791OZFRI/original?content-type=video%2Fmp4&name=Supernovae+-+2K+video.mp4",
              FileSize: 86880000,
              Dimensions: [2048, 2048],
              ProjectionType: "FullDome",
            },
            {
              ResourceType: "Thumbnail",
              MediaType: "Image",
              URL: "https://rubin.canto.com/direct/video/83pd66h2n51etf7jb88352b23p/3j0K9I9ReLKW5lmkMmzwYVTbotk/m800/800",
              FileSize: 22302,
              Dimensions: [800, 800],
              ProjectionType: "FullDome",
            },
          ],
        },
      ],
    },
    {
      Creator: "RubinObs/NSF/AURA",
      URL: "https://rubinobs.org",
      ID: "Discovery of Minor Planets",
      Title: "Discovery of Minor Planets",
      Description:
        "<p>Minor Planets in our Solar System can be discovered by taking multiple images of the same star field and looking for objects that move between exposures. Generally, objects that are farther out in the Solar System, such as Trans-Neptunian Objects will move more slowly than objects nearby. We can determine the objectʼs orbital parameters measuring its position in each image relative to background stars</p>",
      Credit:
        "Fiske Planetarium, University of Colorado Boulder Data Sources: SkySkan; observations collected at Apache Point Observatory 3.5-m",
      PublicationDate: "2022-10-28T14:00:00Z",
      Assets: [
        {
          MediaType: "Video",
          Resources: [
            {
              ResourceType: "Preview",
              MediaType: "Video",
              URL: "https://rubin.canto.com/direct/video/608u0g5qhh19b7t2n7gd9oud5s/75W60ECLT04ksp5NZETiHao5MRA/original?content-type=video%2Fmp4&name=Minor+Planets+-+2K+video.mp4",
              FileSize: 199940000,
              Dimensions: [2048, 2048],
              ProjectionType: "FullDome",
            },
            {
              ResourceType: "Thumbnail",
              MediaType: "Image",
              URL: "https://rubin.canto.com/direct/video/608u0g5qhh19b7t2n7gd9oud5s/WiiQqiR0-YIRikFDkw4TsHlb2Cg/m800/800",
              FileSize: 49174,
              Dimensions: [800, 800],
              ProjectionType: "FullDome",
            },
          ],
        },
      ],
    },
    {
      Creator: "RubinObs/NSF/AURA",
      URL: "https://rubinobs.org",
      ID: "Gravitational Lenses",
      Title: "Gravitational Lenses",
      Description:
        "<p>A gravitational lens is an optical illusion produced when a concentration of mass, such as a galaxy or galaxy cluster, is located between the observer and a distant object, such as a galaxy or quasar. The intermediate concentration of mass serves as a lens, bending and magnifying the light of the distant object. The effect is explained by the general theory of relativity</p>",
      Credit: "Caltech - IPAC / RubinObs / NSF / AURA;",
      PublicationDate: "2022-10-28T14:00:00Z",
      Assets: [
        {
          MediaType: "Video",
          Resources: [
            {
              ResourceType: "Preview",
              MediaType: "Video",
              URL: "https://rubin.canto.com/direct/video/hu54f46bv137nco0j3rp8o6i7u/KKDJ5w-io9Vn552mvmA2RED9LWs/original?content-type=video%2Fmp4&name=Gravitational+Lenses+-+2K+video.mp4",
              FileSize: 73450000,
              Dimensions: [2048, 2048],
              ProjectionType: "FullDome",
            },
            {
              ResourceType: "Thumbnail",
              MediaType: "Image",
              URL: "https://rubin.canto.com/direct/video/hu54f46bv137nco0j3rp8o6i7u/5M1iaDucmN5HCRzHW4lY167aYMU/m800/800",
              FileSize: 38685,
              Dimensions: [800, 800],
              ProjectionType: "FullDome",
            },
          ],
        },
      ],
    },
  ],
});

export async function writeData2domeFeedToDisk({ path, feed }) {
  mkdir(path, {
    recursive: true,
  })
    .then(() => {
      const json = writeFile(`${path}feed.json`, feed);
      return Promise.all([json]);
    })
    .catch((error) => new Error(error));
}
