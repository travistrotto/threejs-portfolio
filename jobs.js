function showDescription(index) {
    // Get all job titles and descriptions
    var titles = document.getElementsByClassName("job-title");
    var descriptions = document.getElementsByClassName("job-description");

    // Hide all job descriptions
    for (var i = 0; i < descriptions.length; i++) {
        descriptions[i].style.display = "none";
    }

    // Remove the "current" class from all job titles
    for (var i = 0; i < titles.length; i++) {
        titles[i].classList.remove("current");
    }

    // Show the selected job description and add the "current" class to its corresponding job title
    descriptions[index].style.display = "block";
    titles[index].classList.add("current");
}