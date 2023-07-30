async function search_flight() {
    const url = "http://localhost:3000/get-dates";
    const duration = document.getElementById("duration").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const params = {
        from: from,
        to: to,
        duration: duration
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        document.getElementById("output").innerHTML = data.res;
    }
}

async function autoComplete(input, elementId) {
    const url = `https://www.skyscanner.com/g/autosuggest-search/api/v1/search-flight/US/en-US/${input}?isDestination=true&enable_general_search_v2=true&autosuggestExp=ranking_v0`
    const dataList = document.getElementById(`${elementId}Options`)
    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }
    const response = await fetch(url, {
        method: "GET",
    });

    if (response.status === 200) {
        const data = await response.json();
        data.forEach(element => {
            if (element.PlaceId){
                const option = document.createElement("option")
                option.innerHTML = element.PlaceName
                option.value = element.PlaceId
                dataList.appendChild(option)
            }
        })
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

const debounceSearch = debounce(function(event) {
    const query = event.target.value;
    const elementId = event.srcElement.id
    autoComplete(query, elementId);
}, 500);


document.getElementById("from").addEventListener('input', debounceSearch)
document.getElementById("to").addEventListener('input', debounceSearch)
