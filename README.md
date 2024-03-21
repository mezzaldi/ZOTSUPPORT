# ZOTSUPPORT: a web application for UCI students and learning support administrators that will display an aggregate of schedules for programming available across all the different student support services on the UCI campus.

## Names of memebers:

Mohammed Mozammil Ezzaldiin
Priscilla Widjaja
Caroline Guzylak
Qi Liu

How to start the application:
- Clone the application to your machine from the github repository.
- Command ‘npm install’ in the root directory, frontend directory, and backend directory.
- In the backend directory, create a file called ‘.env’ with the following database configurations - Reach out to the Zot Support team for this
- Do command “npm start” in both frontend and backend directories (2 separate terminals) to run frontend and backend apps.
- In the frontend directory App.js, there is a variable ‘ucinetid’.  Since there is no authentication currently in place, update this ucinetid to the ucinetid of a user in the database in order to simulate being logged in as that user.


Future features / Updates required for deployment:

UCINetID Authentication
There is no authentication system in place right now. Currently, a single UCINetID variable can be filled out in codebase and used to pull test data from the database. Proper UCINetID authentication will need to be implemented through OIT and according to OIT’s security standards.

Security measures
Our app only works locally and does not have proper security measures in place to actually interface with the UCINetID service. Routes are currently unprotected. Routes need to be protected so that a user cannot simply type in the URL to admin-only pages, such as Edit Event, and access functionality there. Other security vulnerabilities may exist in the application that we are not aware of, so security checks need to be done with extra care due to the fact that this application will be used by UCI students.
Both routes to API calls and routes to application pages need to be protected. See hand-off document for examples.
Proper security configurations in the AWS RDS instance must be configured before deployment. The database is currently publically accessible for testing purposes - this must be changed once it contains real student data.

Dummy data in database must be removed
There is currently test/dummy data stored in the database for testing purposes. This test data should be removed before deployment.

Storing images in the database
Currently there is not a way to store images in or retrieve images from the database. This must be implemented for the sake of user profile images and header images for events and programs.

Calendar Widget
The calendar widget on the student and program dashboards is not functional. It is intended to be intractable so a user can click on a particular date and see the events that are occuring on that day.

Recurring Feature
While events can be classified as ‘recurring’, the app does not automatically generate recurring events after event creation.

Landing Page Nav Bar
Need to create navbar on landing page that omits features that require login.

Node module vulnerabilities
2 moderate severity vulnerabilities in backend
6 moderate and 6 high severity vulnerabilities in frontend 


