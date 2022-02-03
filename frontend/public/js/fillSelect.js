import { Country, State, City }  from 'country-state-city';

const countriesLists = document.querySelectorAll(".countries-list");
const statesLists = document.querySelectorAll(".states-list");
const citiesLists = document.querySelectorAll(".cities-list");

statesLists.forEach(statesList => {
	statesList.addEventListener("click", () => {
		if (statesList.hasAttribute("disabled")) {
			alert("Sélectionnez un pays.");
		};
	});
});

citiesLists.forEach(citiesList => {
	citiesList.addEventListener("click", () => {
		if (citiesList.hasAttribute("disabled")) {
			alert("Sélectionnez une région.");
		};
	});
});

const setCountriesLists = () => {
	countriesLists.forEach((select, i) => {
		select.innerHTML = `<option value="" selected disabled>-- Sélectionnez un pays --</option>`;
		Country.getAllCountries().forEach(country => {
			select.innerHTML += `<option value="${country.isoCode}">${country.name}</option>`;
		});
		select.addEventListener("change", (e) => {
			setStatesList(i, e.target.value);
		});
	});
};

const setStatesList = (i, countryISO) => {
	statesLists[i].removeAttribute("disabled");
	citiesLists[i].setAttribute("disabled", true);
	statesLists[i].innerHTML = `<option value="" selected disabled>-- Sélectionnez une région --</option>`;
	if (countryISO) {
		State.getStatesOfCountry(countryISO).forEach(state => {
			statesLists[i].innerHTML += `<option value="${state.isoCode}">${state.name}</option>`;
		});
		statesLists[i].addEventListener("change", (e) => {
			setCitiesList(citiesLists[i], countryISO, e.target.value);
		});
	};
};

const setCitiesList = (citiesList, countryISO, stateISO) => {
	citiesList.removeAttribute("disabled");
	citiesList.innerHTML = `<option value="" selected disabled>-- Sélectionnez une ville --</option>`;
	if (stateISO) {
		City.getCitiesOfState(countryISO, stateISO).forEach(city => {
			citiesList.innerHTML += `<option value="${city.name}">${city.name}</option>`;
		});
	};
};

setCountriesLists();