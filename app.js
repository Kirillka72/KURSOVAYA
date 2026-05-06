let list = JSON.parse(localStorage.getItem("wishlist")) || [];


function save() {
    localStorage.setItem("wishlist", JSON.stringify(list));
}


function getPriorityValue(p) {
    return { low: 1, medium: 2, high: 3 }[p];
}

// функция отображения пунктов 
function render() {
    let data = [...list];

    const search = document.getElementById("search").value.toLowerCase();
    const filterStatus = document.getElementById("filterStatus").value;
    const sort = document.getElementById("sort").value;

    data = data.filter(item =>
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );

    // фильтра по статусу
    if (filterStatus !== "all") {
        data = data.filter(item => item.status === filterStatus);
    }

    // сортировка
    if (sort === "date") {

        data.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "priority") {

        data.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
    } else {
   
        data.sort((a, b) => a.title.localeCompare(b.title));
    }

    const container = document.getElementById("list");
    container.innerHTML = "";


    data.forEach(item => {
        const div = document.createElement("div");

        div.className = `item ${item.priority}`;

        if (item.status === "done") {
            div.classList.add("done"); 
        }

        div.innerHTML = `
            <div class="item-title">${item.title}</div>
            <div>${item.description || ""}</div>
            <div class="meta">
                 ${item.date || "-"} |  ${item.priority} |  ${item.status}
            </div>
            <div class="actions">
                <button onclick="editItem(${item.id})">Редактировать</button>
                <button onclick="deleteItem(${item.id})">Удалить</button>
            </div>
        `;

        container.appendChild(div);
    });
}

// добавление элемента 
function addItem() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;

    if (!title) {
        alert("Введите название");
        return;
    }

    list.push({
        id: Date.now(), 
        title,
        description,
        date,
        priority,
        status
    });

    save();   
    render(); 
}


function deleteItem(id) {
    list = list.filter(item => item.id !== id);
    save();
    render();
}

// редактирование
function editItem(id) {
    const item = list.find(i => i.id === id);

    const newTitle = prompt("Название:", item.title);
    if (!newTitle) return;

    item.title = newTitle;
    item.description = prompt("Описание:", item.description);
    item.date = prompt("Дата (DD-MM-YYYY):", item.date);
    item.priority = prompt("priority (low/medium/high):", item.priority);
    item.status = prompt("status (planned/progress/done):", item.status);

    save();
    render();
}

render();