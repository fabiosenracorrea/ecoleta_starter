const btnEl = document.querySelector("#page-home main a");

// if the user clicks the search bar, the content for it appears
btnEl.addEventListener("click", () => {
    document.querySelector("#modal").classList.toggle("hide");
})

// if the user wants to go back to home without searching (close the pop-up)
const fechar_a = document.querySelector("#modal .header a");

fechar_a.addEventListener("click", () => {
    document.querySelector("#modal").classList.toggle("hide");
})