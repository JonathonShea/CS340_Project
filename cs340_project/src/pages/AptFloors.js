import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import App from "../App";

function AptFloors() {
    useEffect(() => {
        loadAptFloors();
    }, []);


    const [aptFloorList, setAptFloorList] = useState([]);
    const [floorNum, setFloorNum] = useState([]);
    const [fireExits, setFireExits] = useState([]);
    const toggleField = () => setShowField(!showField);
    const [showField, setShowField] = useState(false);



    const loadAptFloors = async () => {
        const response = await fetch('http://localhost:3000/aptFloors');
        const aptFloorList = await response.json();
        setAptFloorList(aptFloorList);
    }


    function onAdd() {
        addAptFloor();
    }

    const addAptFloor = async () => {
        const responseOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ floorNum: floorNum, fireExits: fireExits })
        }
        await fetch('http://localhost:3000/aptFloors');
        await loadAptFloors();
    }

    const AptFloorInput = () => {
        return<tr>
                    <td>
                        <input placeholder="Floor number"
                               onChange={e => setFloorNum(e.target.value)}/>
                    </td>
                    <td>
                        <input placeholder="Fire exits"
                            onChange={e => setFireExits(e.target.value)}/>
                    </td>
                    <td>
                        <MdAdd onClick = { () => onAdd()}/>
                    </td>
                    <td>
                        <MdCancel/>
                    </td>
                </tr>
    };
    const onAddClick = event => {
        setAptFloorList(aptFloorList.concat(<AptFloorInput key={aptFloorList.length} />));
    };

    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Apartment Floors</h1>
        <p class = "DatabaseText">Apartment Floor table tracks floor specific information of each apartment including fire exits.</p>
        <AptFloorList aptFloors={aptFloorList} toggleField = {toggleField} showField = {showField}/>
        <MdAdd onClick={onAddClick}>Add New Apt Floor</MdAdd>
        </>
    )
}

function AptFloorList({ aptFloors, onAddClick, AptFloorInput, toggleField, showField}) {
    return (
        <table id="aptFloors">
            <thead>
            <tr>
                <th>floorNum</th>
                <th>fireExits</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {aptFloors.map((aptFloor, i) => <AptFloor aptFloor={aptFloor} key={i} />)}
            </tbody>
            <tbody>
            </tbody>
            <tr>
                <MdAdd onClick={() => {toggleField()
                }}/>
                {showField ? <AptFloorInput/>:<text>testing 123</text>}
            </tr>
        </table>

    );
}

function AptFloor({ aptFloor}) {
    return (
        <tr>
            <td>{aptFloor.floorNum}</td>
            <td>{aptFloor.fireExits}</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>
    );
}


export default AptFloors;