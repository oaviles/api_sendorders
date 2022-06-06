# PoC: Serverless API

This is a sample project for Cloud Application Developer using Azure Cloud Platform and GitHub to automate IaC and CI/CD suppported by Secure DevOps Practices. 

Reference Pattern and Architecture: 
[Asynchronous messaging options: ](https://docs.microsoft.com/en-us/azure/architecture/guide/technology-choices/messaging)[Competing Consumers Pattern]([https://docs.microsoft.com/en-us/azure/architecture/guide/technology-choices/images/comp-con.png](https://docs.microsoft.com/en-us/azure/architecture/guide/technology-choices/messaging#load-balancing))
![](https://docs.microsoft.com/en-us/azure/architecture/guide/technology-choices/images/comp-con.png)

[Serverless web application](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/serverless/web-app)
![](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/serverless/_images/serverless-web-app.png)

### Prerequisites to deploy this PoC
- GitHub account and repository.
- Azure subscription.
- A Service Principal with Contributor role at subscription scope. This is the identity that will be used to access the Azure resources from GitHub Action. If you don't have a Service Principal, create one by following [these steps](https://docs.microsoft.com/en-us/azure/developer/github/connect-from-azure).
- Deploy Azure Service Bus using GitHub Action called ["Depoy Azure Service Bus (Bicep)"](https://github.com/oaviles/keda-example/actions/workflows/deploy-servicebus-bicep.yml)
- Get Connection String from Azure Service Bus Queue "Orders"

#### Backend order processing app (Optional)
Optionally you can deploy backend order process app to process orders, [repo reference here](https://github.com/oaviles/keda-example.git).
