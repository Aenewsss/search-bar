const userTemplate = document.querySelector("[data-user-template]");
const cards = document.querySelector("[data-cards]");
const searchInput = document.getElementById("search");

let users = [];

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    users.forEach(user => {
        const isVisible = user.name.includes(value) || user.email.includes(value);

        user.element.classList.toggle("hide", !isVisible);
    })
})

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        users = data.map(user => {
            const card = userTemplate.content.cloneNode(true).children[0];

            const header = card.querySelector("[data-title]");
            const body = card.querySelector("[data-body]");

            header.textContent = user.name;
            body.textContent = user.email;

            cards.append(card);

            return { name: user.name.toLowerCase(), email: user.email.toLowerCase(), element: card }
        })
    })