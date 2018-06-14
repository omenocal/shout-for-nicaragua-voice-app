# Shout for Nicaragua

### Development Setup

* `git clone` this repository
* Install and use Node v8.10
* Run `npm install`
* Make a copy of the `app/config.example.json` file and name it `config.json`. Edit it with all of the requisite fields.
* Make a copy of the `aws-config.sample.js` file and name it `aws-config.js`. Edit it with all of the requisite fields.
* Make a copy of the `swagger.example.yaml` file and name it `swagger.yaml`. Edit it with all of the requisite fields.

### Platforms

![Amazon Alexa](https://images-na.ssl-images-amazon.com/images/G/01/hsx/smart-home/badges/wwaa-horizontal-dark-text.png)

![Google Assistant](https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_HOR.png)

### Directory Structure

    app/ -> Flow logic
    assets/ -> Media files of the skill
    models/ -> Interaction model for every locale
    platforms/ -> Alexa Skill and Dialogflow model
    .editorconfig -> IDE configuration
    .eslintrc.json -> Eslint configuration
    .gitattributes -> Git media files rules
    .gitignore -> Git ignore rules
    app.json -> Jovo app configuration file
    aws-config.sample.js -> AWS sample file for profile
    gulpfile.js -> Automated tasks
    LICENSE
    package.json -> Dependencies
    README.md
    swagger.example.yaml -> Sample file for swagger configuration for API Gateway

# Skill information

### Public name
Shout for Nicaragua

### Invocation name
shout for nicaragua

### Languages
For now, Shout for Nicaragua is spoken in English and Spanish, looking to add more languages!

### Locales

# Alexa Skill
- en-US
- en-GB
- en-CA
- en-AU
- en-IN
- es-ES

# Google Assistant
- en-US
- en-GB
- en-CA
- en-AU
- en-IN
- es-ES
- es-419

### Jovo CLI
The Jovo Command Line Interface ([jovo-cli](https://github.com/jovotech/jovo-cli)) offers the ability to create, prototype, test, and deploy your voice app quickly. To push any update, you will need this command:

```
jovo deploy
```

If you need to run the app locally, you just need to run the following command:

```
jovo run app/index.js -w
```

This will start the server and watch for changes. You will see your webhook URL in the console so you can set it in the DialogFlow and Alexa console.

### Swagger file
Use this file to create/update your API Gateway configuration. This will allow you to connect your code stored in a Lambda function to the Google Assistant app.

If you need a full example of a Swagger file, follow this [link](https://github.com/aws-samples/api-gateway-secure-pet-store/blob/master/src/main/resources/swagger.yaml)
