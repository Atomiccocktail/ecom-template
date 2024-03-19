# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)


# A. Project SetUp

1. Create the Empty Workspace

ng new multi-app --createApplication="false"

ng generate application app-one --no-standalone

ng generate application app-two --no-standalone

2. Run the application

ng serve app-one --port 8200

ng serve app-two --port 9200

3. Make Application Build

ng build --project=app-one 

ng build --project=app-two

4. Demo Link

App-one = https://multi-angular-ecommerce-template.vercel.app/

App-two = https://multi-angular-ecommerce-template-von8.vercel.app/