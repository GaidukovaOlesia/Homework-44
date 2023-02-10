// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
//     Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост,
//     то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
//     Зробити завдання використовуючи проміси, перехопити помилки.


const form = document.querySelector("#form");

const controller = action => fetch(action)
    .then(response => {
        if(response.status !== 200) {
            return Promise.reject(new Error(response.statusText))
        } else {
            return Promise.resolve(response)
        }
    })
    .then(data => data.json())

form.addEventListener("submit", e => {
    e.preventDefault();

    const inputId = document.querySelector("#id").value;

    controller("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            response.forEach(post => {
                 if(parseInt(inputId) === post.id) {
                    const div = document.createElement("div");
                    const h = document.createElement("h3");
                    const p = document.createElement("p");
                    h.innerText = post.title;
                    p.innerText = post.body;
                    div.append(h);
                    div.append(p);
                    document.body.append(div);

                    const input = document.createElement("input");
                    const label = document.createElement("label");
                    const button = document.createElement("button");
                    input.type = "text";
                    input.placeholder = "Додайте коментар";
                    label.append(input);
                    button.innerText = "Зберегти";

                    div.append(label);
                    div.append(button);

                    button.addEventListener("click", () => {
                        const divComment = document.createElement("div");
                        divComment.innerText = input.value;

                        div.append(divComment);
                    })

                 }
            })
        })
        .catch(error => console.log("Error", error))
})
