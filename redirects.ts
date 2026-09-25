const assessmentRedirects = {
  "/education/educators/investigations/surveying-the-solar-system/assessments/pre-posttest":
    "surv-pre-posttest",
  "/education/educators/investigations/surveying-the-solar-system/assessments/general-formative":
    "surv-general-formative",
  "/education/educators/investigations/surveying-the-solar-system/assessments/ngss-formative":
    "surv-ngss-formative",
  "/education/educators/investigations/surveying-the-solar-system/assessments/key-questions":
    "surv-key-questions",
  "/education/educators/investigations/surveying-the-solar-system/assessments/summative":
    "surv-summative",
  "/education/educators/investigations/surveying-the-solar-system/assessments/solar-system-investigation-answer-key":
    "surv-solar-system-investigation-answer-key",
  "/education/educators/investigations/expanding-universe/assessments/pre-posttest":
    "expanding-universe-pre-posttest",
  "/education/educators/investigations/expanding-universe/assessments/general-formative":
    "expanding-universe-general-formative",
  "/education/educators/investigations/expanding-universe/assessments/ngss-formative":
    "expanding-universe-ngss-formative",
  "/education/educators/investigations/expanding-universe/assessments/key-questions":
    "expanding-universe-key-questions",
  "/education/educators/investigations/expanding-universe/assessments/summative":
    "expanding-universe-summative",
  "/education/educators/investigations/expanding-universe/assessments/expanding-universe-investigation-answer-key":
    "expanding-universe-expanding-universe-investigation-answer-key",
  "/education/educators/investigations/coloring-the-universe/assessments/pre-posttest":
    "coloring-the-universe-pre-posttest",
  "/education/educators/investigations/coloring-the-universe/assessments/general-formative":
    "coloring-the-universe-general-formative",
  "/education/educators/investigations/coloring-the-universe/assessments/ngss-formative":
    "coloring-the-universe-ngss-formative",
  "/education/educators/investigations/coloring-the-universe/assessments/key-questions":
    "coloring-the-universe-key-questions",
  "/education/educators/investigations/coloring-the-universe/assessments/summative":
    "coloring-the-universe-summative",
  "/education/educators/investigations/coloring-the-universe/assessments/coloring-the-universe-investigation-answer-key":
    "coloring-the-universe-coloring-the-universe-investigation-answer-key",
  "/education/educators/investigations/exploding-stars/assessments/pre-posttest":
    "exploding-stars-pre-posttest",
  "/education/educators/investigations/exploding-stars/assessments/general-formative":
    "exploding-stars-general-formative",
  "/education/educators/investigations/exploding-stars/assessments/ngss-formative":
    "exploding-stars-ngss-formative",
  "/education/educators/investigations/exploding-stars/assessments/key-questions":
    "exploding-stars-key-questions",
  "/education/educators/investigations/exploding-stars/assessments/summative":
    "exploding-stars-summative",
  "/education/educators/investigations/exploding-stars/assessments/exploding-stars-investigation-answer-key-2":
    "exploding-stars-exploding-stars-investigation-answer-key-2",
  "/education/educators/investigations/safari-estelar/assessments-2/pre-posttest-2":
    "stellar-safari-pre-posttest-2",
  "/education/educators/investigations/safari-estelar/assessments-2/general-formative-2":
    "stellar-safari-general-formative-2",
  "/education/educators/investigations/safari-estelar/assessments-2/ngss-formative-2":
    "stellar-safari-ngss-formative-2",
  "/education/educators/investigations/safari-estelar/assessments-2/key-questions-2":
    "stellar-safari-key-questions-2",
  "/education/educators/investigations/safari-estelar/assessments-2/summative-2":
    "stellar-safari-summative-2",
  "/education/educators/investigations/safari-estelar/assessments-2/stellar-safari-investigation-answer-key":
    "stellar-safari-stellar-safari-investigation-answer-key",
  "/education/educators/investigations/hazardous-asteroids/assessments/pre-posttest":
    "hazardous-asteroids-pre-posttest",
  "/education/educators/investigations/hazardous-asteroids/assessments/general-formative":
    "hazardous-asteroids-general-formative",
  "/education/educators/investigations/hazardous-asteroids/assessments/key-questions":
    "hazardous-asteroids-key-questions",
  "/education/educators/investigations/hazardous-asteroids/assessments/summative":
    "hazardous-asteroids-summative",
  "/education/educators/investigations/hazardous-asteroids/assessments/hazardous-asteroids-investigation-answer-key-2":
    "hazardous-asteroids-hazardous-asteroids-investigation-answer-key-2",
  "/education/educators/investigations/observable-universe/assessments/pre-posttest":
    "exploring-the-observable-universe-pre-posttest",
  "/education/educators/investigations/observable-universe/assessments/general-formative":
    "exploring-the-observable-universe-general-formative",
  "/education/educators/investigations/observable-universe/assessments/key-questions":
    "exploring-the-observable-universe-key-questions",
  "/education/educators/investigations/observable-universe/assessments/summative":
    "exploring-the-observable-universe-summative",
  "/education/educators/investigations/observable-universe/assessments/observable-univ-investigation-answer-key":
    "exploring-the-observable-universe-observable-univ-investigation-answer-key",
};

export default function redirects({
  assessmentRedirectUrl,
}: {
  assessmentRedirectUrl: string;
}) {
  return Object.entries(assessmentRedirects).flatMap(([source, slug]) => {
    return [
      {
        source,
        destination: `${assessmentRedirectUrl}/${slug}`,
        permanent: true,
      },
      {
        source: `/es${source}`,
        destination: `${assessmentRedirectUrl}/es/${slug}`,
        permanent: true,
      },
    ];
  });
}
