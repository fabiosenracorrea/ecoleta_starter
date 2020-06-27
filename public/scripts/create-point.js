
async function getStates() {
    try {
        let states = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        let ufs = [];
        let ids = {};
        states.data.forEach(uf => {
            const {nome, sigla, id} = uf
            ufs.push(`${nome} (${sigla})`)
            ids[sigla] = id
        });
        ufs.sort();

        const selEl = document.getElementById("state");

        ufs.forEach(uf => {
            const optEl = document.createElement("option");
            let sigla = uf[uf.length-3] + uf[uf.length-2]
            optEl.setAttribute("value", `${ids[sigla]}`)
            optEl.appendChild(document.createTextNode(uf))

            selEl.appendChild(optEl)
        })
    } catch (err) {
        const selEl = document.getElementById("state");
        selEl.innerHTML = "";
        const optEl = document.createElement("option");
        optEl.setAttribute("value", "");
        optEl.appendChild(document.createTextNode("Erro ao carregar as opções"))
        selEl.appendChild(optEl);
        document.getElementById("state").disabled = true;
        const selEl2 = document.getElementById("city");
        selEl2.innerHTML = "";
        const optEl2 = document.createElement("option");
        optEl2.setAttribute("value", "");
        optEl2.appendChild(document.createTextNode("Erro ao carregar as opções"))
        selEl2.appendChild(optEl2);
        document.getElementById("state").disabled = true;
    }
}

function loading(load = true) {
    if (load) {
        const selEl = document.getElementById("city");
        selEl.innerHTML = "";
        const optEl = document.createElement("option");
        optEl.setAttribute("value", "");
        optEl.appendChild(document.createTextNode("Loading..."))
        selEl.appendChild(optEl)
    } else {
        const selEl = document.getElementById("city");
        selEl.innerHTML = "";
        const optEl = document.createElement("option");
        optEl.setAttribute("value", "");
        optEl.appendChild(document.createTextNode("Selecione uma Cidade"))
        selEl.appendChild(optEl);
    }
}

async function getCities(event) {
    let uf_id = event.target.value;
    let city_list = [];
    let ids = {};
    loading();
    try {
        let cities = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf_id}/municipios`)
        cities.data.forEach(city => {
            let {nome, id} = city
            city_list.push(nome);
            ids[nome] = id;
        })
        city_list.sort()
        const selEl = document.getElementById("city");
        loading(false);
        selEl.disabled = false;

        city_list.forEach(city => {
            const optEl = document.createElement("option");
            optEl.setAttribute("value", `${ids[city]}`)
            optEl.appendChild(document.createTextNode(city))

            selEl.appendChild(optEl)
        })

        //pegando os dados e jogando nos input hidden
        const state_hidden = document.querySelector("input[name=state_name]");

        const state_index = event.target.selectedIndex
        state_hidden.value = event.target.options[state_index].text;


    } catch (err) {
        loading(false);
        const selEl2 = document.getElementById("city");
        selEl2.innerHTML = "";
        const optEl2 = document.createElement("option");
        optEl2.setAttribute("value", "");
        optEl2.appendChild(document.createTextNode("Erro ao carregar as opções"))
        selEl2.appendChild(optEl2);
        document.getElementById("state").disabled = true;
    }
}

function getCityName(event) {
    const city_hidden = document.querySelector("input[name=city_name]")
    city_hidden.value = event.target.options[event.target.selectedIndex].text
}

async function getStreetName(event) {
    let endElm = document.querySelector("input[name=address]")
    const cepEl = document.getElementById("cep").value;

    if (cepEl.toString().length !== 8) {
        return
    } else {
        try {
            const street = await axios.get(`https://viacep.com.br/ws/${cepEl}/json/`);
            
            if (street.data.erro === true) {
                alert("Erro ao buscar o CEP. Por favor, tente novamente.")
            } else {
                endElm.value = street.data.logradouro
            }
        } catch(err) {
            alert("Erro ao buscar o CEP. Por favor, tente novamente.")
        }
    }
}

function selecioneItems(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    if (alreadySelected !== -1) {
        selectedItems.splice(alreadySelected, 1);
    } else {
        selectedItems.push(itemId)
        selectedItems.sort()
    }

    document.getElementById("selected_items").value = selectedItems;
}

function load_img(load=true) {
    const div = document.getElementsByClassName("img_url")[0];
    div.innerHTML = ""
    if (load) {
        let loader = document.createElement("div");
        loader.setAttribute("class", "loader");
        div.appendChild(loader)
    } else {
        div.innerHTML = "";
    } 
}

function checkImg(event) {
    load_img()
    const image = document.querySelector("input[name=image]")
    const div = document.getElementsByClassName("img_url")[0];
    let timeout = 5000
    let img = new Image();
    let timedOut = false
    img.src = image.value;
    img.onerror = img.onabort = () => {
        if (!timedOut) {
            clearTimeout(timer)
            load_img(false)
            const imgEl = document.createElement("img")
            imgEl.setAttribute("src", "/icones/red-x.svg");
            imgEl.setAttribute("class", "loaded_img");
            const pEl = document.createElement("p");
            pEl.setAttribute("class", "img_text")
            pEl.appendChild(document.createTextNode("Verifique a imagem informada"))
            div.appendChild(imgEl)
            div.appendChild(pEl)
            image.style.border = "1px solid red"
            return
        }
    };
    img.onload = () => {
        if (!timedOut) {
            clearTimeout(timer)
            load_img(false)
            const imgEl = document.createElement("img")
            imgEl.setAttribute("src", "/icones/green_check.svg");
            imgEl.setAttribute("class", "loaded_img");
            div.appendChild(imgEl)
            image.style.border = "0"
            return
        }
    };

    let timer = setTimeout(() => {
        timedOut = true
        img.src = "//!!!!/test.jpg";
        load_img(false)
        const imgEl = document.createElement("img")
        imgEl.setAttribute("src", "/icones/red-x.svg");
        imgEl.setAttribute("class", "loaded_img");
        const pEl = document.createElement("p");
        pEl.setAttribute("class", "img_text")
        pEl.appendChild(document.createTextNode("Verifique a imagem informada"))
        div.appendChild(imgEl)
        div.appendChild(pEl)
        image.style.border = "1px solid red"
        return
    }, timeout)
}

function tool_tip_trigger() {
    let tool_tip = document.querySelector("div.tool-tip-box")
    tool_tip.classList.toggle("hide")
}

// function that makes sure the form is correctly filled (checks items clicked, CEP and Phone and IMG URL)
function no_null_items(event) {
    const items = document.getElementById("selected_items").value
    const cep = document.querySelector("input[name=cep]").value
    const phone = document.querySelector("input[name=phone]").value
    const img_text = document.getElementsByClassName("img_text")[0]

    const pop_up = document.getElementById("pop-up");
    const pop_text = document.getElementById("alert-p")
    
    if (items === "" || items === []) {
        event.preventDefault();
        pop_text.appendChild(document.createTextNode("Por favor, selecione ao menos um item de coleta"))
        pop_up.classList.toggle("hide");

        setTimeout(() => {
            pop_up.classList.toggle("hide");
            pop_text.innerHTML = ""
        }, 4000)
        
    } else if (cep.match(/^[a-z]*$/i) || cep.match(/^[!@#$-/?.,]*$/) || cep.length != 8) {
        event.preventDefault();
        pop_text.appendChild(document.createTextNode("Por favor, confira o seu CEP, digite apenas os 8 números."))
        pop_up.classList.toggle("hide");

        setTimeout(() => {
            pop_up.classList.toggle("hide");
            pop_text.innerHTML = ""
        }, 4000)

    } else if (img_text !== undefined) {
        event.preventDefault();
        pop_text.appendChild(document.createTextNode("Por favor, confira a imagem informada"))
        pop_up.classList.toggle("hide");

        setTimeout(() => {
            pop_up.classList.toggle("hide");
            pop_text.innerHTML = ""
        }, 4000)

    } else if (phone.match(/^[a-z]*$/i) || phone.match(/^[!@#$-/?.,]*$/) || phone.length < 10) {
                event.preventDefault();
        pop_text.appendChild(document.createTextNode("Por favor, confira o seu Telefone. O formato correto é DDD+número, sem espaços"))
        pop_up.classList.toggle("hide");

        setTimeout(() => {
            pop_up.classList.toggle("hide");
            pop_text.innerHTML = ""
        }, 4000)
    }
}

// everytime the user selects a different state, the function to fill the cities gets executed
document
    .getElementById("state")
    .addEventListener("change", getCities);

// everytime the user changes the city, this function adds the name of that city to our hidden input
document
    .getElementById("city")
    .addEventListener("change", getCityName);

// everytime the user changes the CEP number, the function that gets the street name is executed
document
    .getElementById("cep")
    .addEventListener("input", getStreetName);

// everytime the user changes the img URL, this function that checks if its valid is executed
document
    .getElementById("img_url")
    .addEventListener("input", checkImg);

// gets every <li> item so we can iterate on them adding an event lister to each
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (var i of itemsToCollect) {
    i.addEventListener("click", selecioneItems)
}

// here we will store the items the user selects
let selectedItems = [];

//here we get the on_mouse_over event to trigger the tool-tip
let tool_tip = document.getElementsByClassName("question-mark")[0]
tool_tip.setAttribute("onmouseover", "tool_tip_trigger()")
tool_tip.setAttribute("onmouseout", "tool_tip_trigger()")

// runs the function to check if everything is ok
document.querySelector("form").onsubmit = event => no_null_items(event);

//fills the state options with IBGE's API
getStates();