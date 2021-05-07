const { exec } = require("child_process");

exec("docker network inspect rubin-obs-api_default", (error, stdout, stderr) => {
    if(error) console.log(error);

    if(stderr) console.log(stderr);

    console.log("rubin-obs-api docker gateway IP:");
    console.log(JSON.parse(stdout)[0].IPAM.Config[0].Gateway);
});