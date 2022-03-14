import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdEdit, MdDelete} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import {AddressInUse} from "../ServerConstant.js";

function Rodents() {
    useEffect(() => {
        loadRodents();
    }, []);

    const [rodentList, setRodentList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadRodents = async () => {
        const response = await fetch(`${AddressInUse}/GET/rodents`);
        const rodentList = await response.json();
        setRodentList(rodentList);
    }

    const addRodents = async() => {
        let rodentName = document.getElementById("rodentNameInp").value;

        //validate input
        if (rodentName.length < 1) {
            alert("Please Enter a Name");
            return;  
        } 

        const newRodent = {rodentName}
        const response = await fetch(`${AddressInUse}/POST/rodents`, {
            method: 'POST',
            body: JSON.stringify(newRodent),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the rodent record!");
            loadRodents();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const delRodents = async(rodentID) => {
        console.log(`Starting process with ${rodentID}`)
        const response = await fetch(`${AddressInUse}/DELETE/rodents/${rodentID}`, {
            method: 'DELETE'
        });
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            //document.getElementById(`${rodentID}`).remove();
            loadRodents();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }
    const filterResults = async (id) => {
        if(id == null){
            id = '';
        }
        const response = await fetch(`${AddressInUse}/GET/rodents/${id}`)
        const rodentList = await response.json();
        setRodentList(rodentList);
    }


    const RodentNameFormat = event => {
        var tag = document.getElementById("rodentNameInp");
        let val = tag.value.replace(/[^a-zA-Z]/g, '');
        tag.value = val;
    };

    const RodentInput = () => {
        return <tr>
                    <td></td>
                    <td><input id="rodentNameInp" placeholder="Rodent Name e.g. PizzaRat" onKeyUp={RodentNameFormat}/></td>
                    <td><MdAdd onClick={addRodents}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };

    const onAddClick = event => {
        setAddField(<RodentInput />);
    };

    const removeAddClick = event => {
        setAddField();
    };

    // Row of AptFloor data
    function RodentList({ rodents, filterResults}) {
        return (
            <table>
                <thead>
                <tr>
                    <th>Rodent ID #<FilterColumn fieldToSearch="rodentID" filter={filterResults}/></th>
                    <th>Rodent Name<FilterColumn fieldToSearch={"rodentName"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {rodents.map((rodent, idx) => <Rodent rodent={rodent} key={idx} />)}
                </tbody>
            </table>
        );
    }

    function Rodent({ rodent}) {
        return (
            <tr id={rodent.rodentID}>
                <td>{rodent.rodentID}</td>
                <td>{rodent.rodentName}</td>
                <td><MdEdit/></td>
                <td><MdDelete onClick={() => delRodents(rodent.rodentID)}/></td>
            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Rodents</h1>
        <p class = "DatabaseText">Tracks past and present rodents by name and ID</p>
        <MdAdd onClick={onAddClick}/> 
        <RodentList rodents = {rodentList} filterResults={filterResults}/>
        </>
    )
}

export default Rodents;