This project is about creating an AKS environment in Azure and deploying the application in an AKS cluster.

The below Azure resources need to be provisioned by ARM template and PowerShell:
1. AKS – Azure Kubernetes Services
  •	You need to enable monitoring addons for AKS
  •	As a node use Linux type node
2. Azure Container Registry
  •	Configure  RBAC for AKS service principal

Get simple Node.js web app (myapp.zip). 
Before creating a Docker container, you need to install npm modules:
  •	npm install

For Dockerfile follow the below instruction:
  •	Image should create base on node:10
  •	Change directory to /usr/src/app and copy package.json and package-lock.json files
  •	Run "npm ci --only=production"
  •	Copy all other app files 
  •	Expose port 8888
  •	And as cmd run "node server.js"

Create .dockerignore file not to copy unnecessary files such as:
  •	node_modules
  •	npm-debug.log

Your Kubernetes manifest file should contain configuration details of deployments, services, and pods which will be deployed in Azure Kubernetes Service. The manifest file should look like as below:

Deployment section:
  •	Replicas: 5
  •	Labels: app:mynodeapp
  •	Container: yourconatinerName:Version
  •	Container port: 8888
  •	Image pull policy: Always

Services section:
  •	Name: nodeappsrv
  •	Type: LoadBalancer
  •	Selector app:mynodeapp
  •	Port: 80

Important:
1.	Infrastructure provisioning should come from AzureDevOps pipeline
2.	Docker image should build via the AzureDevOps pipeline.
3.	All images should be tagged
4.	In Kubernetes manifest, no latest tag should be used for images
5.	Kubernetes should pull a docker image from Azure Container Registry
6.	Kubernetes deployment also should be from AzureDevOps



Related Links:
1.	https://docs.microsoft.com/en-us/azure/aks/
2.	https://docs.microsoft.com/en-us/azure/container-registry/
3.	https://docs.docker.com/engine/reference/builder/
4.	https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
5.	https://thenewstack.io/docker-basics-how-to-use-dockerfiles/
6.	https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/kubernetes/aks-template?view=azure-devops
7.	https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/acr-template?view=azure-devops

Azure DevOps Lab with a more complex scenario and great explanation:
1.	https://www.azuredevopslabs.com/labs/vstsextend/kubernetes/