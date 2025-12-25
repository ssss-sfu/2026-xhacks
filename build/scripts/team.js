const execArray = [
  { name: "Ash Aung", role: "Co-President" },
  { name: "Jaycie Say", role: "Co-President" },
  { name: "Jennifer Huang", role: "Secretary" },
  { name: "Brandon Nishaan Chattha", role: "Treasurer" },
  { name: "Andrew La Grange", role: "Director of Activities" },
  { name: "Noah Zakaib", role: "Director of Activities" },
  { name: "Maria León Campos", role: "Director of Marketing" },
  { name: "An Nguyen", role: "Director of Visual Design" },
  { name: "Meyer Kaur Sarna", role: "External Representative" },
  { name: "Philip Ho", role: "Internal Representative" },
  { name: "Mehar Saini", role: "Upper Division Representative" },
  { name: "Aleeza Ahmed", role: "Lower Division Representative" },
  { name: "Courtney Lung", role: "First Year Representative" },
  { name: "Manpreet Singh Parmar", role: "First Year Representative" },
  { name: "Matthew Philip Widjaja", role: "SFSS Council Representative" }
]


// Function to populate HTML under #exec-list
function populateExecList() {
  const execListContainer = document.getElementById('exec-list');

  console.log('test')
  execArray.forEach((entry, index) => {
    const execContainer = document.createElement('div');
    execContainer.className = 'exec-container';
    execContainer.id = `exec-${index + 1}`;

    const execImg = document.createElement('img');
    execImg.className = 'exec-img';
    execImg.src = `./assets/images/execs/${entry.name.split(' ')[0].toLowerCase()}.jpg`; // Assuming images are named accordingly
    console.log(execImg.src)
    execImg.alt = entry.name;

    const execName = document.createElement('p');
    execName.className = 'exec-desc-1';
    execName.textContent = `${entry.name}`;

    const execRole = document.createElement('p');
    execRole.className = 'exec-desc-2';
    execRole.textContent = `${entry.role}`;

    execContainer.appendChild(execImg);
    execContainer.appendChild(execName);
    execContainer.appendChild(execRole);
    execListContainer.appendChild(execContainer);
  });
}

// Call the function to populate the HTML
populateExecList();

const execList = document.querySelector("#exec-list");
console.log("test");
const execs = execList.children;

Array.from(execs).forEach((exec, index) => {
  exec.addEventListener("mouseenter", () => {
    exec.classList.toggle("hovered");
  });

  exec.addEventListener("mouseleave", () => {
    exec.classList.toggle("hovered");
  });
});
