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

function validate() {

    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var jobTitle = document.getElementById('jobTitle');
    var office = document.getElementById('office');
    var department = document.getElementById('department');
    var phoneNumber = document.getElementById('phoneNumber');
    var skypeID = document.getElementById('skypeID');

    if( firstName.value.trim() == "" || lastName.value.trim() == "" || email.value.trim() == "" || phoneNumber.value.trim() == "" )
    {
        alert('Fields Cannot be left Blank');
        return false;
    }

    else
    {
        return true;
    }
}

function getFormData(event) {

    loadEmployees();
    if(validate())
    {
        var form = document.getElementById('addEmployeeForm');
        var formData = new FormData(form);
        console.log(formData.get('office'));
        var employee = new Employee(formData.get('firstName'), formData.get('lastName'), formData.get('email'), formData.get('jobTitle'), formData.get('office'), formData.get('department'), formData.get('phoneNumber'), formData.get('skypeID'));
        Employees.push(employee);

        saveEmployees();
        return true;
    }
    else
    {
        return false;
    }
}

function displayEmployee() {

    var data = document.getElementById('details');

    if(Employees.length != null)
    {
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
                    <input type="text" value="${employee.jobTitle}" id="jobTitleEdit">
                </div>

                <div class="block">
                    <label for="office">Office :</label>
                    <input type="text" value="${employee.office}" id="officeEdit">
                </div>

                <div class="block">
                    <label for="department">Department :</label>
                    <input type="text" value="${employee.department}" id="departmentEdit">
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
    });
        
}

function displaySidePanel() {

    var sidePanel = document.querySelector('.side-panel');
    var IT = Employees.filter( employee => {
        return employee['department'].toLowerCase().includes('it');
    });

    var HR = Employees.filter( employee => {
        return employee['department'].toLowerCase().includes('human resources');
    });

    var MD = Employees.filter( employee => {
        return employee['department'].toLowerCase().includes('md');
    });

    var Sales = Employees.filter( employee => {
        return employee['department'].toLowerCase().includes('sales');
    });

    var Seattle = Employees.filter( employee => {
        return employee['office'].toLowerCase().includes('seattle');
    });

    var India = Employees.filter( employee => {
        return employee['office'].toLowerCase().includes('india');
    });

    var e = `
    <h3>Departments</h3> 
        <ul id="Departments">
            <li class="side-panel-d-items">IT (${IT.length})</li>
            <li class="side-panel-d-items">Human Resources (${HR.length})</li>
            <li class="side-panel-d-items">MD (${MD.length})</li>
            <li class="side-panel-d-items">Sales (${Sales.length})</li>
        </ul>
        <br>
        <h3>Offices</h3>
        <ul id="Offices">
            <li class="side-panel-o-items">Seattle (${Seattle.length})</li>
            <li class="side-panel-o-items">India (${India.length})</li>
        </ul>
        <br>
        <h3>Job Titles</h3>
        <ul id="Job Titles">
        </ul>
    `;

    sidePanel.innerHTML += e;

    e = '';

    for(var i=0; i < JobTitles.length; i++)
    {
        var list = Employees.filter(employee => {
            return employee['jobTitle'].includes(JobTitles[i]);
        });

        if(i == 5)
        {
            e += `
            <span class="viewMore">
            <li class="side-panel-j-items">${JobTitles[i]} (${list.length})</li>`;
        }

        else if(i == JobTitles.length-1)
        {
            e += `<li class="side-panel-j-items">${JobTitles[i]} (${list.length})</li>
            </span>`;
        }
        else
        {
            e += `<li class="side-panel-j-items">${JobTitles[i]} (${list.length})</li>`;
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

            var c = event.currentTarget.innerHTML;
            var string = c.substring(0,c.indexOf(" "));
            Employees = Employees.filter( employee => {
                return employee.department.toLowerCase().includes(string.toLowerCase());
            });

            document.getElementById('details').innerHTML = '';
            displayEmployee();
        })
    });

    document.querySelectorAll('.side-panel-o-items').forEach( item => {
        item.addEventListener('click', 
        function(event){

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


function saveEmployees() {

    var jsonString = JSON.stringify(Employees);
    localStorage.setItem('Employees', jsonString);
}

function loadEmployees(){

    Employees = JSON.parse(localStorage.getItem('Employees'));

}



document.getElementById('addEmployeeButton').addEventListener('click', 
function(){
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

document.querySelectorAll('.alphabet-button').forEach( button => {
    button.addEventListener('click', 
    function(e){

        loadEmployees();
        const alphabet = String(e.currentTarget.id[0]);
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

    document.getElementById('details').innerHTML = '';
    loadEmployees();
    displayEmployee();

});



var Employees = [];
document.getElementById('clearButton').disabled = true;
loadEmployees();
displayEmployee();
displaySidePanel();










