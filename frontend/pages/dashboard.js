const searchImput = document.getElementById(searchImput);
const equipmentsTable = document.querySelector( "#quipmentsTable");
const btnNewEquipment = document.getElementById("btnNewEquipment");
const modalElement = document.getElementById("equipmentModal");
const modal = new bootstrap.Modal(modalElement);
const btnSave = document.getElementById("btnSaveEquipment");
const equipmentsName = document.getElementById("equipmentName");
const NewEquipment = document.getElementById("equipments");


const maintenanceEquipmentsTotal = document.querySelector("#maintenanceEquipmentsTotal");
console.log("activeTotal: "+ activeTotal.textContent);
//activeTotal.textContent =50;

function dashboardRefresh(){
const actives = equipments.filter(
    equipment => equipment.status === "active"
).length;

const inMaintenance = equipments.filter(
    equipment => equipment.status === "maintenance"
).length;

activeTotal.textContent = actives;
maintenanceEquipmentsTotal.textContent = inMaintenance;

console.log("Dashboard atualizado.");

}

dashboardRefresh();

function equipmentsTableRender(list){
    equipmentsTable.innerHTML = "";
    list.forEach(equipment => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${equipment.name}</td>`
        `<td>${equipment.local}</td>`
        `<td>${equipment.status}</td>`
        <td>    
            <button click="equipmentDelete(${equipment.id})">
                Excluir
            </button>
        </td>
     
        equipmentsTable.appendChild(row);
    });
}
equipmentsTableRender(equipments);
searchImput.addEventListener("input", function(){
    const term = searchImput.value.toLocaleLowerCase();
    
    const result = equipments.filter(equipment =>
        equipment.name.toLowerCase().includes(term));

        equipmentsTableRender(result);

});

btnNewEquipment.addEventListener("click", function(){
    modal.show();

})

btnSave.addEventListener("click",function(){
    if(equipmentsName.value.trim() ===""){
        console.warn("Nome do equipamento não informado");
        alert("Informe o nome do equipamento");
        return;
    }

})
const NewEquipment = {
    id: equipments.length +1,
    name:equipmentsName.value, 
    local:"Não informado",
    status:"active",
    patrimony:`${String(equipments.length + 1).padStart(3, "0")}-PP`
}

equipments.push(NewEquipment);
equipmentsTableRender( equipments);
dashboardRefresh();
modal.hide();
equipmentsName.Value = "";

function equipmentDelete(id){
    const index = equipments.findIndex(
        equipment=> equipment.id === id
    );
    if(index=-1){
        console.error("Equipmaneto não encontrado", id);
        return;
    }
    equipments.splice(index,1);
    equipmentsTableRender(equipments);
    dashboardRefresh();
    console.log("Equipamento removido",id);

}
