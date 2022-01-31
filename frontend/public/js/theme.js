const lightIcon = require("../img/theme-light.webp");
const darkIcon = require("../img/theme-dark.webp");

const lightLogo = require("../img/logo.png");
const darkLogo = require("../img/logo_dark.png");

// const html = document.querySelector("html");
const themeButton = document.querySelector(".theme-changer");
const logo = document.querySelector(".logo");

const revertThemes = () => {
	if (document.documentElement.classList.contains("theme-light")) {
		document.documentElement.classList.replace("theme-light", "theme-dark");
		themeButton.style.backgroundImage = `url(${lightIcon.replaceAll(window.location.origin + "/", "")})`;
		logo.style.backgroundImage = `url(${darkLogo.replaceAll(window.location.origin + "/", "")})`;
	} else {
		document.documentElement.classList.replace("theme-dark", "theme-light");
		themeButton.style.backgroundImage = `url(${darkIcon.replaceAll(window.location.origin + "/", "")})`;
		logo.style.backgroundImage = `url(${lightLogo.replaceAll(window.location.origin + "/", "")})`;
	};
};

themeButton.addEventListener("click", revertThemes);

// function to set a given theme/color-scheme
const setTheme = (themeName) => {
	localStorage.setItem('theme', themeName);
	document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
const toggleTheme = () => {
	if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-light')
	else setTheme('theme-dark')
}

// Immediately invoked function to set the theme on initial load
(() => {
 if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-dark')
 else setTheme('theme-light')
})();