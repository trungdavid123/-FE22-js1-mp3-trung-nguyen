const countryInput = document.querySelector("#country-input"),
    submitBtn = document.querySelector("#submit"),
    list = document.querySelector(".information ul");

let value = "";

countryInput.addEventListener("keyup", () => {
    value = countryInput.value;
});

const submit = (e) => {
    e.preventDefault();
    if (value) {
        fetch(`https://restcountries.com/v3.1/lang/${value}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    alert("Not Found");
                } else {
                    data.sort((a, b) => (a.population < b.population ? 1 : -1));
                    data.forEach((country) => {
                        const name = document.createElement("h2");
                        (li = document.createElement("li")),
                            (subregion = document.createElement("p")),
                            (capital = document.createElement("p")),
                            (population = document.createElement("p")),
                            (flag = document.createElement("img"));
                        if (data[0].name === country.name) {
                            li.classList.add("marked");
                        }

                        name.innerText = `Country: ${country.name.common}`;
                        capital.innerText = `Capital: ${
                            country.capital ? country.capital : "No Capital"
                        }`;
                        subregion.innerText = `Subregion: ${country.subregion}`;
                        population.innerText = `Population: ${country.population} people`;
                        flag.src = country.flags.png;

                        li.append(name, capital, subregion, population, flag);
                        list.append(li);
                    });
                }
            })
            .catch((err) => alert(err));
    }
    list.innerHTML = "";
    countryInput.value = "";
};

submitBtn.addEventListener("click", submit);
