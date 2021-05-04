# Rubin Observatory Operational Client/UI

React/Next.js client for the Rubin Observatory operational site with Docker support.

## Local development

0. Ensure that the Craft CMS container is running and functioning correctly by going to http://localhost:9000/api, if everything is working fine you should see some message about a missing GraphQL query
1. Install dependencies ```yarn``` 
2. Start the dev server ```yarn dev```

This should be all that you need to do to get the client running. However, there is an assumption that you have the rubin-obs-api project running in some way, either with the legacy CIC scripts or preferably within a container. 

## Running the client within a Docker container

Running the client within a container is a good way to test deployment in a production-like environment.

There is one crucial thing to keep in mind when configuring your local client to run in a Docker container: Docker containers run in an isolated network that have a different concept of the usage of "localhost". As such, despite the fact that the Craft CMS container may be exposed at localhost on port 9000 on the host machine (your laptop), within the client container "localhost" is local to that container. In order for the client container to be able to communicate with the Craft CMS container you need to know the Craft CMS container's gateway IP address.

See the below section on finding the Craft container's IP address and proceed when you have this IP address handy.

Once you have the IP handy, replace localhost with the IP in the following places:

1. Replace localhost in NEXT_PUBLIC_API_URL in **env.local**
2. Replace localhost in the ***rewrite()*** method in **next.config.js**
3. Replace ```<Docker Craft container IP>``` in the Dockerfile on the line below the comment talking about the Docker bridge IP

Step #3 above is worth discussing further: This Docker IP is required in order for the Next.js build to complete successfully, however, the browser in the host machine won't be able to access this IP (confusing, I know). This line in the Dockerfile recursively looks through all files for the Docker IP that you entered and replaces it with "localhost" *after* the Next.js build has completed thus allowing for statically generated absolute paths to function correctly.

It's possible that this step will be unnecessary if Kubernetes configurations are added for local dev as Kubernetes offers IP discovery, DNS services, etc.

## Finding the Craft CMS container's IP address

1. Ensure that the Craft CMS container is running and functioning correctly by going to http://localhost:9000/api, if everything is working fine you should see some message about a missing GraphQL query
2. In the terminal, enter the command ```docker network ls``` and you should she text table output - under the "NAME" column verify that you see one row with the value "rubin-obs-api_default"
3. Enter the command ```docker network inspect rubin-obs-api_default``` (note the underscore)
4. The ouput from the above command will be a JSON object, the gateway IP can be found at: IPAM.Config.Gateway

This IP will change between bringing up and down the container, so keep in mind that you'll need to do this step everytime you bring the Craft CMS containers down and back up.

