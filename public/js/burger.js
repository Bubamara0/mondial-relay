document.querySelector("#navbar .burger").addEventListener("click", () => {
    document.querySelector("#overlay").style.setProperty("display", "flex");
});

document.querySelector("#overlay .cross").addEventListener("click", () => {
    document.querySelector("#overlay").style.setProperty("display", "none");
});