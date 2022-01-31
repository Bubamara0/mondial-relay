const showOverlay = () => {
    document.querySelector("#navbar .burger").style.setProperty("display", "none");
    document.querySelector("#overlay .cross").style.setProperty("display", "flex");
    document.querySelector("#overlay").style.setProperty("display", "flex");
}

const hideOverlay = () => {
    document.querySelector("#navbar .burger").style.setProperty("display", "flex");
    document.querySelector("#overlay .cross").style.setProperty("display", "none");
    document.querySelector("#overlay").style.setProperty("display", "none");
}

document.querySelector("#navbar .burger").addEventListener("click", showOverlay);

document.querySelector("#overlay").addEventListener("click", hideOverlay);
document.querySelector("#overlay .cross").addEventListener("click", hideOverlay);