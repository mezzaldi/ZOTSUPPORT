# ZOTSUPPORT: a web application for UCI students and learning support administrators that will display an aggregate of schedules for programming available across all the different student support services on the UCI campus.



Names of memebers:
--------------------
Mohammed Mozammil Ezzaldiin
Priscilla Widjaja
Caroline Guzylak
Qi Liu


Steps to Begin 
1, make sure to clone the repo:
    open your terminal 
    Navigate to the Directory Where You Want to Clone the Repository:
    clone the Repository: git clone [https://github.com/username/repository.git](https://github.com/mezzaldi/ZOTSUPPORT.git)https://github.com/mezzaldi/ZOTSUPPORT.git
    Navigate into the Cloned Repository: cd ZOTSUPPORT
2,while in the terminal
    run : npm start 
//Installing firebase
    npm install -g firebase-tools

//Run local host 
    npm run dev  
 //Connect to Mysql
    npm install mysql2
     mysql -u root -p
     USE cs122a;
 //CREATE TABLE program (   id INT PRIMARY KEY AUTO_INCREMENT,   programName VARCHAR(255) NOT NULL,   adminEmail VARCHAR(255) NOT NULL,   headerImage VARCHAR(255),   description TEXT,   tags VARCHAR(255) );
 
//Kill Server
    lsof -i :5003 
    kill -9  PID


//Deploy
    firebase deploy --only hosting
