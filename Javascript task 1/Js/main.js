class Employee{

    constructor(firstName, lastName, email, jobTitle, office, department, phoneNumber, skypeID) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.preferedName = this.firstName + ' ' +this.lastName;
        this.email = email;
        this.jobTitle = jobTitle;
        this.office = office;
        this.department = department;
        this.phoneNumber = phoneNumber;
        this.skypeID = skypeID;
    }
};

const JobTitles = ["SharePoint Practice Head", ".Net Development Lead", "Recruting Expert", "BI Developer", "Buisness Analyst", "Manager", "Intern"];
const Departments = ['IT','Human Resources','MD','Sales'];
const Offices = ['Seattle','India'];

function isEmpty(field) {

    if(field.trim() == "")
    {
        return true;
    }

    return false;
}

function isEmployeeValidate() {

    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var phoneNumber = document.getElementById('phoneNumber');

    if( isEmpty(firstName.value) || isEmpty(lastName.value) || isEmpty(email.value) || isEmpty(phoneNumber.value))
    {
        alert('Fields Cannot be left Blank');
        return false;
    }
    
    return true;
}

function addEmployee() {


    loadEmployees();
    if(isEmployeeValidate())
    {
        var form = document.getElementById('addEmployeeForm');
        var formData = new FormData(form);
        console.log(formData.get('office'));
        var employee = new Employee(formData.get('firstName'), formData.get('lastName'), formData.get('email'), formData.get('jobTitle'), formData.get('office'), formData.get('department'), formData.get('phoneNumber'), formData.get('skypeID'));    
        Employees.push(employee);

        saveEmployees();
        return true;
    }
    
    return false;
}

function displayAddEmployee(){

    var data = document.getElementById('addEmployeeJobTitle');
    var e = ``;

    for( var i = 0; i < JobTitles.length; i++)
    {
        e += `<option value="${JobTitles[i]}">${JobTitles[i]}</option>`;
    }

    data.innerHTML += e;

    data = document.getElementById('addEmployeeOffice');
    e = ``;

    for( var i = 0; i < Offices.length; i++)
    {
        e += `<option value="${Offices[i]}">${Offices[i]}</option>`;
    }

    data.innerHTML += e;
    

    data = document.getElementById('addEmployeeDepartment');
    e = ``;

    for( var i = 0; i < Departments.length; i++)
    {
        e += `<option value="${Departments[i]}">${Departments[i]}</option>`;
    }

    data.innerHTML += e;

    console.log(e);
}

function displayEmployee() {

    var data = document.getElementById('details');
    
    for(var i = 0; i < Employees.length; i++)
    {
        var e = `<div class="employee-details-panel" id="employee-details-panel${i}">
        <div class="employee-details-panel-img"><img src="img/profile.PNG" alt=""></div> 
        <div class="employee-details-panel-text">
            <b>${Employees[i].preferedName}</b> <br>
            ${Employees[i].jobTitle} <br>
            ${Employees[i].department}
        </div> 
    </div>`
        data.innerHTML += e;
    }

    document.querySelectorAll('.employee-details-panel').forEach( item => {
        item.addEventListener('click', 
        function(event){
            displayEmployeeDetails(event.currentTarget.id);
        })
    });
        

        
}

function displayEmployeeDetails(id) {
    
    console.log(id);
    var index = id[id.length - 1];
    var employee = Employees[index];

    document.querySelector('.modal-employeeDetail-bg').style.display = 'flex';

    var details = document.getElementById('employeeDetailModal');

    e = `

    <div class="block">
                    <label for="firstName">First Name :</label>
                    <input type="text" value="${employee.firstName}" id="firstNameEdit">
                </div>

                <div class="block">
                    <label for="lastName">Last name :</label>
                    <input type="text" value="${employee.lastName}" id="lastNameEdit">
                </div>

                <div class="block">
                    <label for="email">Email :</label>
                    <input type="text" value="${employee.email}" id="emailEdit">
                </div>

                <div class="block">
                    <label for="jobTitle">Job Title :</label>
                    <select name="jobTitleEdit" id="jobTitleEdit">
                    <option value="${employee.jobTitle}">${employee.jobTitle}</option>
                    <option value="SharePoint Practice Head">SharePoint Practice Head</option>
                    <option value=".Net Development Lead">.Net Development Lead</option>
                    <option value="Recruting Expert">Recruting Expert</option>
                    <option value="BI Developer">BI Developer</option>
                    <option value="Buisness Analyst">Buisness Analyst</option>
                    <option value="Manager">Manager</option>
                    <option value="Intern">Intern</option>
                </select>
                </div>

                <div class="block">
                    <label for="office">Office :</label>
                    <select name="officeEdit" id="officeEdit">
                    <option value="${employee.office}">${employee.office}</option>
                    <option value="Seattle">Seattle</option>
                    <option value="India">India</option>
                </select>
                </div>

                <div class="block">
                    <label for="department">Department :</label>
                    <select name="departmentEdit" id="departmentEdit">
                    <option value="${employee.department}">${employee.department}</option>
                    <option value="IT">IT</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="MD">MD</option>
                    <option value="Sales">Sales</option>
                </select>
                </div>

                <div class="block">
                    <label for="phoneNumber">PhoneNumber :</label>
                    <input type="text" value="${employee.phoneNumber}" id="phoneNumberEdit">
                </div>

                <div class="block">
                    <label for="skypeID">Skype ID :</label>
                    <input type="text" value="${employee.skypeID}" id="skypeIDEdit">
                </div>  

                <button id="saveChanges">Save Changes</button>

    `;

    details.innerHTML += e;

    document.getElementById("saveChanges").addEventListener('click', 
    function () {

        var pname = document.getElementById('firstNameEdit').value + ' ' + document.getElementById('lastNameEdit').value;
        Employees[index] = {
            firstName: document.getElementById('firstNameEdit').value,
            lastName: document.getElementById('lastNameEdit').value,
            preferedName: pname,
            email: document.getElementById('emailEdit').value,
            jobTitle: document.getElementById('jobTitleEdit').value,
            office: document.getElementById('officeEdit').value,
            department: document.getElementById('departmentEdit').value,
            phoneNumber: document.getElementById('phoneNumberEdit').value,
            skypeID: document.getElementById('skypeIDEdit').value,
        }

        saveEmployees();

        details.innerHTML = '';
        document.querySelector('.modal-employeeDetail-bg').style.display = 'none';
        details = document.getElementById("details");
        details.innerHTML = '';
        displayEmployee();
        details = document.querySelector('.side-panel');
        details.innerHTML = '';
        displaySidePanel();
    });       
}

function employeeCount(field, fieldValue) {

    var employeeCount = Employees.filter( employee => {
        return employee[field].toLowerCase().includes(fieldValue.toLowerCase());
    });

    return employeeCount.length || 0;
}

function displaySidePanel() {

    var sidePanel = document.querySelector('.side-panel');

    var e = `<h3>Departments</h3>
            <ul id="Departments">`;

    for (var i = 0; i < Departments.length; i++)
    {
        var count = employeeCount('department', Departments[i]);
        e += `<li class="side-panel-d-items">${Departments[i]} (${count})</li>`
    }

    e += `</ul> <br>`;

    e += `<h3>Offices</h3>
            <ul id="Offices">`;

    for (var i = 0; i < Offices.length; i++)
    {
        var count = employeeCount('office', Offices[i]);
        e += `<li class="side-panel-d-items">${Offices[i]} (${count})</li>`
    }

    e += `</ul><br>`;

    e += `<h3>Job Titles</h3>
            <ul id="Job Titles">
            </ul>`;
        
    sidePanel.innerHTML += e;

    e = '';

    for(var i=0; i < JobTitles.length; i++)
    {
        count = employeeCount('jobTitle', JobTitles[i]);
        
        if(i == 5)
        {
            e += `
            <span class="viewMore">
            <li class="side-panel-j-items">${JobTitles[i]} (${count})</li>`;
        }
        
        else if(i == JobTitles.length-1)
        {
            e += `<li class="side-panel-j-items">${JobTitles[i]} (${count})</li></span>`;
        }
        
        else
        {
            e += `<li class="side-panel-j-items">${JobTitles[i]} (${count})</li>`;
        }         
    }
    
    var sidePanelJobs = document.getElementById('Job Titles');
    sidePanelJobs.innerHTML += e;
    sidePanel = document.querySelector('.side-panel');
    e = ``;
    e=`<a id="viewMoreT">view more</a>`;
    sidePanel.innerHTML += e;

    document.getElementById("viewMoreT").addEventListener('click', 
    function (e){
        var panel = document.querySelector(".viewMore");
        if(panel.style.display == 'none')
        {
            panel.style.display = 'inline';
            this.innerHTML = 'view less';
        }
        else
        {
            panel.style.display = 'none';
            this.innerHTML = 'view more';
        }
    });
    
    document.querySelectorAll('.side-panel-d-items').forEach( item => {
        item.addEventListener('click',
        function(event){
            
            loadEmployees();
            var c = event.currentTarget.innerHTML;
            var string = c.substring(0,c.indexOf(" "));
            Employees = Employees.filter( employee => {
                return employee.department.toLowerCase().includes(string.toLowerCase());
            });
            
            document.getElementById('details').innerHTML = '';
            displayEmployee();
        });
    });
    
    document.querySelectorAll('.side-panel-o-items').forEach( item => {
        
        item.addEventListener('click',
        function(event){
            loadEmployees();
            var c = event.currentTarget.innerHTML;
            var string = c.substring(0,c.indexOf(" "));
            Employees = Employees.filter( employee => {
                return employee.office.toLowerCase().includes(string.toLowerCase());
            });
            
            document.getElementById('details').innerHTML = '';
            displayEmployee();
        })
    });

    document.querySelectorAll('.side-panel-j-items').forEach( item => {
        item.addEventListener('click', 
        function(event){
            
            loadEmployees();
            var c = event.currentTarget.innerHTML;
            var string = c.substring(0,c.indexOf(" "));
            Employees = Employees.filter( employee => {
                return employee.jobTitle.toLowerCase().includes(string.toLowerCase());
            });

            document.getElementById('details').innerHTML = '';
            displayEmployee();
        })
    });
}

function setOriginalButtonColor(){

    document.querySelectorAll('.selected-button').forEach( button => {

        button.classList.add('alphabet-button');
    });
}

function displayAlphabetbuttons(){

    var container = document.querySelector('.top-panel-alphabet');
    var e = '';
    
    for(var i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++)
    {
        e += `<button class="alphabet-button" id="${String.fromCharCode(i)}-Button">${String.fromCharCode(i)}</button> `;
    }

    container.innerHTML += e;

    document.querySelectorAll('.alphabet-button').forEach( button => {
        button.addEventListener('click', 
        function(e){

            setOriginalButtonColor();
            loadEmployees();
            const alphabet = String(e.currentTarget.id[0]);
            this.classList.add('selected-button');
            this.classList.remove('alphabet-button');
            console.log(this.classList);
            Employees = Employees.filter( employee => {
                return employee.preferedName[0].toLowerCase().includes(alphabet.toLowerCase());
        });
    
        var data = document.getElementById('details');
        data.innerHTML = '';
        displayEmployee();
        })
    });

    document.getElementById('allButton').addEventListener('click',
    function(e){

        setOriginalButtonColor();
        this.classList.add('selected-button');
        this.classList.remove('alphabet-button');
        document.getElementById('details').innerHTML = '';
        loadEmployees();
        displayEmployee();
    });
}



function saveEmployees() {

    var jsonString = JSON.stringify(Employees);
    localStorage.setItem('Employees', jsonString);
}

function loadEmployees(){

    Employees = JSON.parse(localStorage.getItem('Employees')) || [];

}



document.getElementById('addEmployeeButton').addEventListener('click', 
function(){

    displayAddEmployee();
    document.querySelector('.modal-addEmployee-bg').style.display = 'flex';
});

document.querySelector('.close-addEmployee').addEventListener('click',
function(){
    document.querySelector('.modal-addEmployee-bg').style.display = 'none';
});

document.querySelector('.close-employeeDetail').addEventListener('click',
function(){
    document.querySelector('.modal-employeeDetail-bg').style.display = 'none';
    var details = document.getElementById("employeeDetailModal");
    details.innerHTML = '';
});

document.getElementById('clearButton').addEventListener('click', 
function(){
    var searchbar = document.getElementById('searchBar');
    searchbar.value = '';

    document.getElementById('details').innerHTML = '';

    loadEmployees();
    displayEmployee();
    this.disabled = true;
});

document.getElementById('searchBar').addEventListener('keyup', 
function (e) {

    loadEmployees();
    var filter = document.getElementById('filter').value;

    const searchString = e.target.value;
    Employees = Employees.filter( employee => {
        return employee[filter].toLowerCase().includes(searchString.toLowerCase());
    });

    var data = document.getElementById('details');
    data.innerHTML = '';
    displayEmployee();
    document.getElementById('clearButton').disabled = false;
});



var Employees = [];
document.getElementById('clearButton').disabled = true;
loadEmployees();
displayAlphabetbuttons();
displayEmployee();
displaySidePanel();










