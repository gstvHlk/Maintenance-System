console.log("Carregou o Dashboard =) !!!");

const systemName = "Sistema de Controle de Manutenção";

// let activeEquipments = 48;
let maintenanceEquipments = 5;
//let preventiveMaintenance = 10;

console.log("Nome do sistema: " + systemName);
console.info("Em manutenção: " + maintenanceEquipments);

const equipments = [
    { id:1,
    name: "Compressor",
    local: "Oficina",
    status: "active",
    patrimony: "12-PP"
},{ id:2,
    name: "Torno",
    local: "Oficina",
    status: "active",
    patrimony: "1-PP"
},{ id:3,
    name: "Gerador",
    local: "Casa de Maquinas",
    status: "inactive",
    patrimony: "65-PP"
},{ id:4,
    name: "Gerador Grande",
    local: "Casa de Maquinas",
    status: "maintenance",
    patrimony: "70-PP"
},{ id:5,
    name: "Gerador Grande 5",
    local: "Casa de Maquinas",
    status: "maintenance",
    patrimony: "70-PP"
}];

console.table(equipments);


const activeTotal = document.querySelector("#activesTotal");
const preventiveTotal = document.querySelector("#preventiveTotal");
const maintenanceEquipmentsTotal = document.querySelector("#maintenanceEquipmentsTotal");
const equipmentsTable = document.querySelector("#equipmentsTable");
const searchInput = document.getElementById("searchInput");
const btnNewEquipment = document.getElementById("btnNewEquipment");
const modalElement = document.getElementById("equipmentModal");
const modal = new bootstrap.Modal(modalElement);

console.log("activeTotal: "+ activeTotal.textContent);
//activeTotal.textContent = 50;

// function dashboardRefresh() {
    
//     const actives = equipments.filter(
//         equipment => equipment.status === "active"
//     ).length;

//     const inMaintenance = equipments.filter(
//         equipment => equipment.status === "maintenance"
//     ).length;

//     activeTotal.textContent = actives;
//     maintenanceEquipmentsTotal.textContent = inMaintenance;

//     console.log("Dashboard atualizado");

// }

// dashboardRefresh();

function equipmentsTableRender(list) {
    
    equipmentsTable.innerHTML = "";

    list.forEach(equipment => {
        const row = document.createElement("tr");

        row.innerHTML = `<td>${equipment.name}</td>
        <td>${equipment.local}</td>
        <td>${equipment.status}</td>
        <td>
            <button class="btn btn-danger"
            onclick="equipmentDelete(${equipment.id})"
            >Excluir</button>
        </td>`
        
        equipmentsTable.appendChild(row);

    });
}

equipmentsTableRender(equipments);

searchInput.addEventListener("input", function () {
    const term = searchInput.value.toLowerCase();
    
    const result = equipments.filter(equipment =>
        equipment.name.toLowerCase().includes(term));

    equipmentsTableRender(result);
});

btnNewEquipment.addEventListener("click", function(){
    modal.show();
});

const btnSave = document.getElementById("btnSaveEquipment");
const equipmentName = document.getElementById("equipmentName");

btnSave.addEventListener("click", function(){
    if (equipmentName.value.trim() === ""){
        console.warn("Nome do equipamento não informado");
        alert("Informe o nome do equipamento.");
        return;
    } 
    
    const newEquipment = {
        id: equipments.length + 1,
        name: equipmentName.value,
        local: "Não Informado",
        status: "active",
        patrimony: `${String(equipments.length + 1).padStart(3, "0")}-PP`

    }

    equipments.push(newEquipment);
    equipmentsTableRender(equipments);
    // dashboardRefresh();


    modal.hide();
    equipmentName.value = "";
})

function equipmentDelete(id){
    const index = equipments.findIndex(
        equipment => equipment.id === id
    );
    
    if(index === -1){
        console.error("Equipamento não encontrado:", id);
        return;
    }

    equipments.splice(index,1);
    equipmentsTableRender(equipments);
    // dashboardRefresh();
    
    console.log("Equipamento removido",id);

}

async function dashboardLoad() {

    try{
        const response = await fetch("http://localhost:3000/dashboard");

        if(!response.ok){
            throw new Error("Não foi possível carregar o dashboard");
        }

        const data = await response.json();
        console.log("Dados recebidos: ",data); 

        const actives = data.activeEquips;
        const inMaintenance = data.inMaintenance;
        const preventiveEquips = data.preventiveMaintenance;
            
        activeTotal.textContent = actives;
        maintenanceEquipmentsTotal.textContent = inMaintenance;
        preventiveTotal.textContent = preventiveEquips;


    } catch(error){
        console.error("Erro ao carregar o dashboard: ", error );
    };

}
dashboardLoad();