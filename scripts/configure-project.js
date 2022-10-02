import readline from "readline";
import process from "process";
import replace from "replace-in-file";

// capture required data from the user input
const captureUserInput = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question) =>
    new Promise((resolve) =>
      rl.question(question, (answer) => resolve(answer))
    );

  const bucketName = await ask("Provide the bucket name: ");
  const region = await ask("Provide the region: ");

  rl.close();

  return { bucketName, region };
};

// replace "BUCKET_NAME_PLACEHOLDER" placeholder with given `bucketName`
const setBucketName = (bucketName) =>
  replace({
    files: [
      "infrastructure/bucket_policy.json",
      "scripts/create-infrastructure.sh",
    ],
    from: /BUCKET_NAME_PLACEHOLDER/g,
    to: bucketName,
  });

// replace "REGION_PLACEHOLDER" placeholder with given `region`
const setRegion = (region) =>
  replace({
    files: ["scripts/create-infrastructure.sh"],
    from: /REGION_PLACEHOLDER/g,
    to: region,
  });

(async () => {
  console.log(
    `🤖 Welcome to the esp32-control-panel configuration tool 🤖\n\n`
  );

  const { bucketName, region } = await captureUserInput();

  await setBucketName(bucketName);
  console.log("✅ infrastructure: bucket name configuration");

  await setRegion(region);
  console.log("✅ infrastructure: region configuration");
})();
