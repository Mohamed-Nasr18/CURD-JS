let title = document.getElementById("title");
let cost = document.querySelectorAll("#cost input");
let count = document.getElementById("count");
let department = document.getElementById("department");
let btnCreate = document.getElementById("btn-create");
let tBody = document.getElementById("table-body");
let deleteAllBtn = document.getElementById("deleteAll");
let spanCount = document.querySelector("#deleteAll span");
let headingOne = document.getElementById("headingOne");

// let validationMessage = document.getElementById("validationMessage");

let allData = [];                                          //array to push data of prouductObject

let mood = "create";
let globalId;

if (localStorage.prouduct != null) {
    allData = JSON.parse(localStorage.prouduct);
} else {
    allData = [];
}


let getTotal = () => {
    price = cost[0].value;
    taxes = cost[1].value;
    transferCost = cost[2].value;
    discound = cost[3].value;
    //total = (price + taxes(% from price) + transferCost) = total cost - discound = total

    let taxprice = +price * (+taxes / 100);                // + to make it number
    let totalCost = (+price + +taxprice + +transferCost);
    let discoundCost = +totalCost * (+discound / 100);
    let totalPrice = +totalCost - +discoundCost;

    cost[4].value = Math.ceil(+totalPrice);                // math.ceil عشان يقرب الرقم للقيمة الاعلى

}

for (let i = 0; i < cost.length; i++) {
    cost[i].addEventListener("keyup", getTotal);
}

let createObject = () => {
    let prouductObject = {
        title: title.value,
        price: cost[0].value,
        taxes: cost[1].value,
        transferCost: cost[2].value,
        discound: cost[3].value,
        total: cost[4].value,
        count: count.value,
        department: department.value,
    }

    if (mood == "create") {                         // create
        if (prouductObject.count > 1) {                     // for Count number
            for (let i = 0; i < prouductObject.count; i++) {
                allData.push(prouductObject);
            }
        } else {
            allData.push(prouductObject);
        }
    } else {   //update
        allData[globalId] = prouductObject;

        mood = "create";
        btnCreate.innerHTML = "Create";
        btnCreate.classList.replace("btn-warning", "btn-primary");
        count.classList.remove("none");

        headingOne.innerHTML = "Add New Prouduct";
        headingOne.classList.replace("text-warning", "text-success");
    }

    showData();
    clearInputs();
    localStorage.setItem("prouduct", JSON.stringify(allData));
}

let showData = () => {
    let tableRow = ``;
    for (let i = 0; i < allData.length; i++) {
        tableRow += `
        <tr>
            <td>  ${i + 1}                    </td>
            <td>  ${allData[i].title}         </td>
            <td>  ${allData[i].price}         </td>
            <td>  ${allData[i].taxes}         </td>
            <td>  ${allData[i].transferCost}  </td>
            <td>  ${allData[i].discound}      </td>
            <td>  ${allData[i].total}         </td>
            <td>  ${allData[i].count}         </td>
            <td>  ${allData[i].department}    </td>
            <td>  <button class="btn btn-danger" onclick="removeItem(${i})">Remove</button>  </td>
            <td>  <button class="btn btn-warning" onclick="updateData(${i})">Update</button>  </td>
        </tr>
        `
    }
    tBody.innerHTML = tableRow;

    if (allData.length > 0) {
        deleteAllBtn.classList.remove("none");
        spanCount.innerHTML = allData.length;
    } else {
        deleteAllBtn.classList.add("none");
    }
}

showData();

let clearInputs = () => {
    title.value = ""
    cost[0].value = ""
    cost[1].value = ""
    cost[2].value = ""
    cost[3].value = ""
    cost[4].value = ""
    count.value = ""
    department.value = ""
}

btnCreate.addEventListener("click", createObject);

let removeItem = (index) => {                            //for delete button
    allData.splice(index, 1);
    localStorage.prouduct = JSON.stringify(allData);     // to refresh local storage
    showData();
}

let deleteAll = () => {
    localStorage.clear();                               // to clear from local storage
    allData.splice(0);                                  // 0 to delete all
    showData();                                         // to refresh
}
deleteAllBtn.addEventListener("click", deleteAll);

let updateData = (i) => {
    mood = "update";

    title.value = allData[i].title;
    cost[0].value = allData[i].price;
    cost[1].value = allData[i].taxes;
    cost[2].value = allData[i].transferCost;
    cost[3].value = allData[i].discound;
    cost[4].value = allData[i].total;
    department.value = allData[i].department;

    globalId = i;
    count.classList.add("none");

    btnCreate.innerHTML = "Update";
    btnCreate.classList.replace("btn-primary", "btn-warning");

    headingOne.innerHTML = "Update Prouduct";
    headingOne.classList.replace("text-success", "text-warning");
}

let btnMood = document.getElementById("btnMood");
let card = document.getElementById("card");
let cardBody = document.getElementById("card-body");
let card2 = document.getElementById("cardTwo");
let cardBody2 = document.getElementById("card-bodyTwo");
let tableData = document.getElementById("table-Data");

let pageMood = () => {

    if (btnMood.innerHTML == "Light Mood") {

        document.body.style.background = "white";
        card.classList.add("card-lightMood");
        cardBody.classList.add("card-body-lightMood");
        card2.classList.add("card-lightMood");
        cardBody2.classList.add("card-body-lightMood");
        tableData.classList.replace("table-dark", "table-light")

        title.classList.add("form-control-light");
        cost[0].classList.add("form-control-light");
        cost[1].classList.add("form-control-light");
        cost[2].classList.add("form-control-light");
        cost[3].classList.add("form-control-light");
        cost[4].classList.add("form-control-light");
        count.classList.add("form-control-light");
        department.classList.add("form-control-light");

        btnMood.classList.replace("btn-light", "btn-dark");
        btnMood.innerHTML = "Dark Mood";

    } else {
        document.body.style.background = "#000000ef";
        card.classList.remove("card-lightMood");
        cardBody.classList.remove("card-body-lightMood");
        card2.classList.remove("card-lightMood");
        cardBody2.classList.remove("card-body-lightMood");
        tableData.classList.replace("table-light", "table-dark");

        title.classList.remove("form-control-light");
        cost[0].classList.remove("form-control-light");
        cost[1].classList.remove("form-control-light");
        cost[2].classList.remove("form-control-light");
        cost[3].classList.remove("form-control-light");
        cost[4].classList.remove("form-control-light");
        count.classList.remove("form-control-light");
        department.classList.remove("form-control-light");

        btnMood.classList.replace("btn-dark", "btn-light");
        btnMood.innerHTML = "Light Mood";
    }
}
btnMood.addEventListener("click", pageMood);

let load = document.querySelector(".load")
window.onload = () => {
    load.remove();
}