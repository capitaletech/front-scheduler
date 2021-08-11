## INSTRUCTIONS
Execute `yarn start` to the start the app in development mode.\
The scheduler will be accessible at http://localhost:3000 and communicate with the backend through the port 8081. \
To book a meeting, click on the corresponding cell to open the quick info popup. Add the subject of the meeting and validate.\
To manually enter the time and date of a meeting, double click on any free cell to open the editor popup.\
After creating a meeting, the backend will generate the corresponding Zoom meeting and send it back to the scheduler.\
Double cliking on any scheduled meeting will open a new window to the Zoom meeting.\
The date and time of a meeting can be changed either by drag and drop or by using the editor popup.


## COMMANDS

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


