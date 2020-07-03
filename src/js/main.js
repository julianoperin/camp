const app = document.getElementById("app");

const data = [1, 2, 3, 45, 6, 10, 10, 10];

const newData = data.map((item) => item * 2);

newData.forEach((item) => {
  let li = document.createElement("li");
  li.textContent = item;
  app.appendChild(li);
});
