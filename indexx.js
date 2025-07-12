let employees = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Engineering", role: "Developer" },
  // Add more mock employees as needed
];

let currentPage = 1;
let pageSize = 10;

function renderEmployees() {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";

  const filteredEmployees = filterAndSearch(employees);
  const paginated = paginate(filteredEmployees, currentPage, pageSize);

  paginated.forEach(employee => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <p><strong>ID:</strong> ${employee.id}</p>
      <p><strong>Name:</strong> ${employee.firstName} ${employee.lastName}</p>
      <p><strong>Email:</strong> ${employee.email}</p>
      <p><strong>Department:</strong> ${employee.department}</p>
      <p><strong>Role:</strong> ${employee.role}</p>
      <button onclick="editEmployee(${employee.id})">Edit</button>
      <button onclick="deleteEmployee(${employee.id})">Delete</button>
    `;
    list.appendChild(card);
  });
}

function paginate(array, page, size) {
  return array.slice((page - 1) * size, page * size);
}

function updatePageSize() {
  pageSize = parseInt(document.getElementById("pageSize").value);
  currentPage = 1;
  renderEmployees();
}

function searchEmployees() {
  currentPage = 1;
  renderEmployees();
}

document.getElementById("search").addEventListener("input", searchEmployees);

function filterAndSearch(data) {
  const query = document.getElementById("search").value.toLowerCase();
  const nameFilter = document.getElementById("filterName").value.toLowerCase();
  const deptFilter = document.getElementById("filterDepartment").value.toLowerCase();
  const roleFilter = document.getElementById("filterRole").value.toLowerCase();

  return data.filter(emp =>
    (emp.firstName + " " + emp.lastName + " " + emp.email).toLowerCase().includes(query) &&
    emp.firstName.toLowerCase().includes(nameFilter) &&
    emp.department.toLowerCase().includes(deptFilter) &&
    emp.role.toLowerCase().includes(roleFilter)
  );
}

function applyFilter() {
  currentPage = 1;
  renderEmployees();
  closeFilter();
}

function openFilter() {
  document.getElementById("filterSidebar").classList.add("show");
}

function closeFilter() {
  document.getElementById("filterSidebar").classList.remove("show");
}

function sortEmployees() {
  const sortBy = document.getElementById("sort").value;
  if (sortBy) {
    employees.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }
  renderEmployees();
}

function openForm() {
  document.getElementById("employeeFormModal").style.display = "flex";
  document.getElementById("employeeForm").reset();
  document.getElementById("employeeId").value = "";
  document.getElementById("formTitle").textContent = "Add Employee";
}

function closeForm() {
  document.getElementById("employeeFormModal").style.display = "none";
}

function submitForm(event) {
  event.preventDefault();
  const id = document.getElementById("employeeId").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const department = document.getElementById("department").value;
  const role = document.getElementById("role").value;

  if (!firstName || !lastName || !email || !department || !role) {
    alert("All fields are required.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Invalid email format.");
    return;
  }

  if (id) {
    const index = employees.findIndex(e => e.id == id);
    employees[index] = { id: parseInt(id), firstName, lastName, email, department, role };
  } else {
    const newId = Math.max(0, ...employees.map(e => e.id)) + 1;
    employees.push({ id: newId, firstName, lastName, email, department, role });
  }
   
  closeForm();
  renderEmployees();
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (emp) {
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    document.getElementById("formTitle").textContent = "Edit Employee";
    openForm();
  }
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(e => e.id !== id);
    renderEmployees();
  }
}
document.getElementById("addEmployeeId").addEventListener("onclick", editEmployee)
document.addEventListener("DOMContentLoaded", renderEmployees);