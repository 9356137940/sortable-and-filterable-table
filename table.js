document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const userTable = document.getElementById("userTable");
    const searchInput = document.getElementById("searchInput");
    const filterRole = document.getElementById("filterRole");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let role = document.getElementById("role").value;
        let age = document.getElementById("age").value;

        if (!name || !email || !role || !age) return;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${role}</td>
            <td>${age}</td>
            <td><button class="btn-delete" onclick="deleteRow(this)">Delete</button></td>
        `;

        userTable.appendChild(row);
        form.reset();
    });

    searchInput.addEventListener("input", function () {
        let filter = this.value.toLowerCase();
        let rows = userTable.getElementsByTagName("tr");

        for (let row of rows) {
            let name = row.getElementsByTagName("td")[0];
            if (name) {
                row.style.display = name.textContent.toLowerCase().includes(filter) ? "" : "none";
            }
        }
    });

    filterRole.addEventListener("change", function () {
        let filter = this.value;
        let rows = userTable.getElementsByTagName("tr");

        for (let row of rows) {
            let role = row.getElementsByTagName("td")[2];
            if (role) {
                row.style.display = role.textContent === filter || filter === "" ? "" : "none";
            }
        }
    });
});

function deleteRow(button) {
    button.parentElement.parentElement.remove();
}

function sortTable(columnIndex) {
    let table = document.querySelector("table tbody");
    let rows = Array.from(table.rows);
    let isAscending = table.getAttribute("data-sort-order") === "asc";

    rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent.trim();
        let bValue = b.cells[columnIndex].textContent.trim();
        return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));

    table.setAttribute("data-sort-order", isAscending ? "desc" : "asc");
}