
const inquirer = require("inquirer");
const fs = require("fs");

let ID = 1;
let employeeList = [];
 
class Employee {
    constructor( name, role, email ){
        this.id = ID++;
        this.name = name;
        this.role = role;
        this.email = email;
    }
};
class Manager extends Employee {
    constructor( name, email, officeNumber ){
        super(name, 'Manager', email);
        this.officeNumber = officeNumber;
    }
};
class Engineer extends Employee {
    constructor( name, email, gitHub ){
        super( name, 'Engineer', email )
        this.gitHub = gitHub;
    }
};
class Intern extends Employee {
    constructor ( name, email, school ){
        super( name, 'Intern', email )
        this.school = school;
    }
};

async function getManagerInfo( runTimes ){
    let num = 0;
    while( num < runTimes){
        const resp = await inquirer.prompt([
            {
                name: 'name',
                message: "MANAGER - What is the manager's name?",
                type: 'input'
            },
            {
                name: 'email',
                message: "MANAGER - What is the manager's email address?",
                type: 'input'
            },
            {
                name: 'officeNumber',
                message: "MANAGER - What is the manager's office number?",
                type: 'input'
            },
        ]);
        num++
        let newManager = new Manager ( resp.name, resp.email, resp.officeNumber );
        employeeList.push(newManager);
    };
};

async function getEngineerInfo( runTimes ){
    let num = 0;
    while( num < runTimes){
        const resp = await inquirer.prompt([
            {
                name: 'name',
                message: "ENGINEER - What is the employee's name?",
                type: 'input'
            },
            {
                name: 'email',
                message: "ENGINEER - What is the employee's email address?",
                type: 'input'
            },
            {
                name: 'gitHub',
                message: "ENGINEER - What is the employee's gitHub profile?",
                type: 'input'
            },
        ]);
        num++
        let newEngineer = new Engineer ( resp.name, resp.email, resp.gitHub );
        employeeList.push(newEngineer);
    };
};

async function getInternInfo( runTimes ){
    let num = 0;
    while( num < runTimes){
        const resp = await inquirer.prompt([
            {
                name: 'name',
                message: "INTERN - What is the employee's name?",
                type: 'input'
            },
            {
                name: 'email',
                message: "INTERN - What is the employee's email address?",
                type: 'input'
            },
            {
                name: 'school',
                message: "INTERN - What school did the employee attend?",
                type: 'input'
            },
        ]);
        num++
        let newIntern = new Intern ( resp.name, resp.email, resp.school );
        employeeList.push(newIntern);
    };
};

async function addEmployees(){
    const response = await inquirer.prompt([
        {
            name: 'employeeType',
            message: "What type of employee would you like to add to the team?",
            type: 'list',
            choices: ['Engineer', 'Intern', '---FINISH---']
        }
    ]);
    let employeeType = response.employeeType;
    if(response.employeeType == "FINISH"){
        process.exit(0);
    };
    if( employeeType == "Engineer"){
        let response = await inquirer.prompt([
            {
                name: "numEngineers",
                message: "How many engineers would you like to add?",
                type: "input"
            }
        ]);

        let numEngineers = response.numEngineers;
        console.log("Number of Engineers to add:",numEngineers);
        await getEngineerInfo( numEngineers );
        await addEmployees();

    };
    if( employeeType == "Intern"){
        let response = await inquirer.prompt([
            {
                name: "numInterns",
                message: "How many interns would you like to add?",
                type: "input"
            }
        ]);

        let numInterns = response.numInterns;
        console.log("Number of Interns to add:", numInterns);
        await getInternInfo( numInterns );
        await addEmployees();
    } 
    return employeeList
};

  let manager = {
    managerData: [],
    managerCard: '',
    managerList: []
  };
  let engineer = {
    engineerData: [],
    engineerCard: '',
    engineerList: []
  };
  let intern = {
    internData: [],
    internCard: '',
    internList: []
  };

async function renderCards( teamData ){
    //console.log('[PASS IN]', teamData)
    teamData.forEach( result => {
        if( result.role == 'Manager'){
            manager.managerData.push(result); 
        } if( result.role == 'Engineer'){
            engineer.engineerData.push(result);
        } if( result.role == 'Intern'){
            intern.internData.push(result)
        } 
    });
    manager.managerData.forEach(result => {
        manager.managerCard = `
          <div class="card" id="managerCard" style="width: 18rem;">
            <div class="card-header">
                <h4 class="name">${result.name}</h4>
                <h5 class="title">Manager</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item id">ID: ${result.id}</li>
                <li class="list-group-item email">Email: ${result.email}</li>
                <li class="list-group-item officeNum">Office Number: ${result.officeNumber}</li>
              </ul>
            </div>
          </div>`
          manager.managerList.push(manager.managerCard);
        });
        manager.managerList.forEach(result => {
            htmlMain += result });
        
    engineer.engineerData.forEach( result => {
        engineer.engineerCard = `
            <div class="card" id="engineerCard" style="width: 18rem;">
            <div class="card-header">
                <h4 class="name">${result.name}</h4>
                <h5 class="title">Engineer</h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                <li class="list-group-item id">ID: ${result.id}</li>
                <li class="list-group-item email">Email: ${result.email}</li>
                <li class="list-group-item github">Git Hub: ${result.gitHub}</li>
                </ul>
            </div>
            </div>`
            engineer.engineerList.push(engineer.engineerCard);
        });
        engineer.engineerList.forEach(result => {
            htmlMain += result });

    intern.internData.forEach( result => {
        intern.internCard = ` 
            <div class="card" id="internCard" style="width: 18rem;">
                <div class="card-header">
                    <h4 class="name">${result.name}</h4>
                    <h5 class="title">Intern</h5>
                </div>
                <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item id">ID: ${result.id}</li>
                    <li class="list-group-item email">Email: ${result.email}</li>
                    <li class="list-group-item school">School: ${result.school}</li>
                </ul>
                </div>
            </div>`
            intern.internList.push(intern.internCard);
        });
        intern.internList.forEach(result => {
            htmlMain += result });     
}; 

let htmlHead = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="./html/style.css">
    <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
    <title>My Team</title>
</head>`;

let htmlHeader = `
<body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">My Team</h1>
    </div>
    </div>
</body>
`;

let htmlMain = '<div id="main">';

//closes html file
let htmlEnd = `
</div>
</body>
</html>`;

let teamHTML = '';

async function buildHTML(){
    teamHTML = htmlHead + htmlHeader + htmlMain + htmlEnd;
    //console.log("____HTML____", teamHTML)
    writeFile( teamHTML );
}

async function writeFile( htmlFile){
    let writeFileHTML = fs.writeFileSync("team.html", htmlFile);
    let writeFile = fs.writeFileSync("team.json", JSON.stringify(employeeList));
};

async function main(){
    await getManagerInfo(1);
    await addEmployees();
    await renderCards( employeeList );
    await buildHTML();
};
main();



