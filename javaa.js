
let topics = [];
function calculatePriority(topic) {
  return (topic.days * 2) + (100 - topic.score) + (topic.difficulty * 10);
}

function addTopic() {
  const name = document.getElementById("topicName").value.trim();
  const difficulty = Number(document.getElementById("difficulty").value);
  const score = Number(document.getElementById("score").value);
  const days = Number(document.getElementById("days").value);

  if (!name || score < 0 || score > 100 || days < 0) {
    alert("Enter valid values!");
    return;
  }

  const topic = {
    name,
    difficulty,
    score,
    days,
    priority: 0
  };

  topic.priority = calculatePriority(topic);
  topics.push(topic);

  sortTopics();
  renderRevision();
  renderStats();
  clearInputs();
}

function sortTopics() {
  for (let i = 1; i < topics.length; i++) {
    let key = topics[i];
    let j = i - 1;

    while (j >= 0 && topics[j].priority < key.priority) {
      topics[j + 1] = topics[j];
      j--;
    }
    topics[j + 1] = key;
  }
}

function renderRevision() {
  const list = document.getElementById("revisionList");
  list.innerHTML = "";

  const limit = Math.min(3, topics.length);

  for (let i = 0; i < limit; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${topics[i].name}</strong>
      <span class="badge">Priority ${topics[i].priority}</span>
    `;
    list.appendChild(li);
  }
}

function renderStats() {
  document.getElementById("totalTopics").textContent =
    "Total Topics: " + topics.length;

  let weak = 0;
  for (let t of topics) {
    if (t.score < 50) weak++;
  }

  document.getElementById("weakTopics").textContent =
    "Weak Topics: " + weak;
}

function clearInputs() {
  document.getElementById("topicName").value = "";
  document.getElementById("score").value = "";
  document.getElementById("days").value = "";

}
