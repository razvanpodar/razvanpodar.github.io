var project = 0

let projects = document.getElementsByClassName("project-card")
let nr_projects = projects.length

let prev = document.getElementById("prev")
let next = document.getElementById("next")

prev.addEventListener("click", () => {
    if (project != 0)
    {
        project = project - 1
    }
    else
    {
        project = nr_projects - 1
    }

    updateProject()
})

next.addEventListener("click", () => {
    if (project != nr_projects - 1)
    {
        project = project + 1
    }
    else
    {
        project = 0
    }
        
    updateProject()
})

function updateProject()
{
    for (let i = 0; i < nr_projects; i++)
    {
        projects[i].classList.add("project-invisible")
    }

    projects[project].classList.remove("project-invisible")
    console.log(projects[project])
}

updateProject()