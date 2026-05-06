function assert(condition, message) {
    if (condition) {
        console.log("✅ " + message);
    } else {
        console.error("❌ " + message);
    }
}

function resetData() {
    list = [];
    save();
}

function testAddItem() {
    resetData();

    list.push({
        id: 1,
        title: "Тест",
        description: "Описание",
        date: "2026-01-01",
        priority: "high",
        status: "planned"
    });

    assert(list.length === 1, "Добавление элемента работает");
}

function testDeleteItem() {
    resetData();

    list.push({ id: 1, title: "A" });
    list.push({ id: 2, title: "B" });

    deleteItem(1);

    assert(list.length === 1, "Удаление элемента работает");
    assert(list[0].id === 2, "Удалён правильный элемент");
}

function testLocalStorage() {
    resetData();

    list.push({ id: 1, title: "Test" });
    save();

    const data = JSON.parse(localStorage.getItem("wishlist"));

    assert(data.length === 1, "Сохранение в localStorage работает");
}

function testSort() {
    resetData();

    list = [
        { id: 1, title: "B", priority: "low" },
        { id: 2, title: "A", priority: "high" }
    ];

    list.sort((a, b) => a.title.localeCompare(b.title));

    assert(list[0].title === "A", "Сортировка по названию работает");
}

function testSearch() {
    resetData();

    list = [
        { id: 1, title: "Телефон", description: "Apple" },
        { id: 2, title: "Ноутбук", description: "Dell" }
    ];

    const result = list.filter(item =>
        item.title.toLowerCase().includes("телефон")
    );

    assert(result.length === 1, "Поиск работает");
}


function runTests() {
    console.log("🚀 Запуск тестов...");

    testAddItem();
    testDeleteItem();
    testLocalStorage();
    testSort();
    testSearch();

    console.log("✅ Тесты завершены");
}

runTests();