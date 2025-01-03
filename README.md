# Countries of the World - Quiz

## Description
This application is inspired by the quiz available at [JetPunk: Countries of the World](https://www.jetpunk.com/quizzes/panstwa-swiata). While it does not include all the functionalities of the original quiz, it captures its core essence. The goal of the quiz is to guess as many countries of the world as possible within the allotted time (or without a time limit).

## Features
- **12-Minute Timer**: Once the quiz starts, you have 12 minutes to guess as many countries as possible.
- **No Time Limit Option**: Solve the quiz without a timer by clicking the clock button.
- **Pause Feature**: Take up to three pauses during the quiz.
- **Help Button**: Provides a short hint about the quiz.
- **Give Up Button**: Ends the quiz at any time.
- **Results Summary**: After the quiz ends (either by giving up or when time runs out), all countries (guessed and missed) are displayed along with the player's score.
- **Interactive Map**: Navigate the map and adjust the scale using +/- buttons or mouse scroll.
- **Reset Map Position**: Click the home button (house icon below the map) to reset the map to its initial position.
- **Show Missing Countries**: Highlights unguessed countries on the map.
- **Continent-Based Table**: Displays guessed countries by continent as the quiz progresses.

## Technologies
- **React**: Functional components used to build a responsive and interactive UI.
- **Leaflet**: JavaScript library for interactive maps.
- **React-Leaflet**: React components for integrating Leaflet maps seamlessly into the application.

## Deployment on Azure
The application is deployed on Azure Web Apps and is accessible at the following link:  
[Countries of the World - Quiz](https://countries-of-the-world-dwhqe6hncdejavg0.polandcentral-01.azurewebsites.net)

### Deployment Details
- The deployment process uses GitHub Actions to build and deploy the application automatically. The pipeline consists of two stages:
  1. **Build Stage**: The application is built using Node.js to generate the production-ready files.
  2. **Deploy Stage**: The build artifacts are uploaded to the Azure Web App using a publish profile for seamless integration.

To deploy the application on Azure Web Apps, follow these steps:
1. Set up an Azure Web App and obtain the publish profile for your app.
2. Add the publish profile to GitHub Secrets in your repository as `AZURE_PUBLISH_PROFILE`.
3. Use the provided GitHub Actions pipeline to automate the build and deployment process.

---

## How to Play
1. Start the quiz by clicking the start button.
2. Type the names of countries you know in the input field.
3. Use the features like pause, no time limit, and help as needed.
4. Navigate and zoom on the map to explore and identify countries.
5. Click "Give Up" if you're done or let the timer run out.
6. View your results and see which countries you missed.

## Future Enhancements
The application is designed to mimic the original quiz closely but may expand in functionality and style to enhance user experience further.

## License
This project is open source and available under the [GPL-3.0 License](LICENSE).

---

Enjoy testing your geography knowledge!
