const internships = [
    {
        id: "INT-101",
        title: "Frontend Intern",
        domain: "Full Stack Development",
        mode: "Remote",
        location: "India",
        skills: ["HTML", "CSS", "JavaScript"],
        openings: 3
    },
    {
        id: "INT-102",
        title: "API Engineer Intern",
        domain: "Full Stack Development",
        mode: "Hybrid",
        location: "Pune",
        skills: ["Node.js", "SQL", "Testing"],
        openings: 2
    },
    {
        id: "INT-103",
        title: "UI/UX Intern",
        domain: "UI/UX",
        mode: "Remote",
        location: "India",
        skills: ["Figma", "Research", "Accessibility"],
        openings: 1
    },
    {
        id: "INT-104",
        title: "Data Analyst Intern",
        domain: "Data Analytics",
        mode: "On-site",
        location: "Bengaluru",
        skills: ["Excel", "SQL", "Data visualisation"],
        openings: 2
    },
    {
        id: "INT-105",
        title: "Security Operations Intern",
        domain: "Cyber Security",
        mode: "Remote",
        location: "India",
        skills: ["Linux", "Logs", "Networking"],
        openings: 1
    }
];

const internshipList = document.getElementById("internship-list");
const searchInput = document.getElementById("search");
const domainFilter = document.getElementById("domain-filter");
const status = document.getElementById("status");

function loadDomains() {
    const domains = [...new Set(
        internships.map(item => item.domain)
    )];

    domains.forEach(domain => {
        const option = document.createElement("option");
        option.value = domain;
        option.textContent = domain;
        domainFilter.appendChild(option);
    });
}

function displayInternships() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedDomain = domainFilter.value;

    const filtered = internships.filter(item => {
        const searchableText = [
            item.title,
            item.domain,
            item.location,
            item.mode,
            ...item.skills
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        const matchesDomain =
            selectedDomain === "all" ||
            item.domain === selectedDomain;

        return matchesSearch && matchesDomain;
    });

    internshipList.replaceChildren();

    if (filtered.length === 0) {
        status.textContent =
            "No internships found. Try another search or filter.";
        return;
    }

    status.textContent = `${filtered.length} internship(s) found.`;

    filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "internship-card";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const domain = document.createElement("span");
        domain.className = "badge";
        domain.textContent = item.domain;

        const location = document.createElement("p");
        location.textContent = `Location: ${item.location}`;

        const mode = document.createElement("p");
        mode.textContent = `Work mode: ${item.mode}`;

        const skills = document.createElement("p");
        skills.textContent = `Skills: ${item.skills.join(", ")}`;

        const openings = document.createElement("p");
        openings.textContent = `Openings: ${item.openings}`;

        card.append(
            title,
            domain,
            location,
            mode,
            skills,
            openings
        );

        internshipList.appendChild(card);
    });
}

searchInput.addEventListener("input", displayInternships);
domainFilter.addEventListener("change", displayInternships);

loadDomains();
displayInternships();