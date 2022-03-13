import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdDelete, MdEdit} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import {AddressInUse} from "../ServerConstant.js";

function PriceHistory() {
    useEffect(() => {
        loadPriceHistory();
    }, []);

    const [phList, setPHList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadPriceHistory = async () => {
        const response = await fetch(`${AddressInUse}/GET/priceHistory`);
        const phList = await response.json();
        setPHList(phList);
    }
    const filterResults = async (id) => {
        if(id == null){
            id = '';
        }
        const response = await fetch(`${AddressInUse}/GET/priceHistory/${id}`)
        const phList = await response.json();
        setPHList(phList);
    }


    const addPH = async() => {
        let sellerID = document.getElementById("sellerIDInp").value;
        let buyerID = document.getElementById("buyerIDInp").value;
        let aptNum = document.getElementById("aptNumInp").value;
        let dateSale = document.getElementById("dateSaleInp").value;
        let price = document.getElementById("priceInp").value;
        const newPH = {sellerID, buyerID, aptNum, dateSale, price}
        console.log(JSON.stringify(newPH));
        const response = await fetch(`${AddressInUse}/POST/priceHistory`, {
            method: 'POST',
            body: JSON.stringify(newPH),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the record!");
            loadPriceHistory();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const delPH = async(invoiceNum) => {
        console.log(`Starting process with ${invoiceNum}`)
        const response = await fetch(`${AddressInUse}/DELETE/priceHistory/${invoiceNum}`, {
            method: 'DELETE'
        });
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            //document.getElementById(`${invoiceNum}`).remove();
            loadPriceHistory();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }

    const PHInput = () => {
        return <tr>
                    <td></td>
                    <td><input id="sellerIDInp" placeholder="Seller ID"/></td>
                    <td><input id="buyerIDInp" placeholder="Buyer ID"/></td>
                    <td><input id="aptNumInp" placeholder="Apartment Number"/></td>
                    <td><input id="dateSaleInp" placeholder="Date of Sale"/></td>
                    <td><input id="priceInp" placeholder="Price($)"/></td>
                    <td><MdAdd onClick={addPH}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };
    const onAddClick = event => {
        setAddField(<PHInput/>);
    };

    const removeAddClick = event => {
        setAddField();
    };

    // Row of AptFloor data
    function PhList({ PHmap, filterResults}) {
        return (
            <table>
                <thead>
                <tr>
                    <th>Invoice Number [varchar]<FilterColumn fieldToSearch="invoiceNum" filter = {filterResults}/></th>
                    <th>Seller ID [int]<FilterColumn fieldToSearch={"sellerID"}/></th>
                    <th>Buyer ID [int]<FilterColumn fieldToSearch={"buyerID"}/></th>
                    <th>Apartment Number [int]<FilterColumn fieldToSearch={"aptNum"}/></th>
                    <th>Date of Sale [dateTime]<FilterColumn fieldToSearch={"dateSale"}/></th>
                    <th>Price($) [int]<FilterColumn fieldToSearch={"price"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {PHmap.map((ph, idx) => <PH ph={ph} key={idx} />)}
                </tbody>
            </table>
        );
    }
    function PH({ph}) {
        return (
            <tr id={ph.invoiceNum}>
                <td>{ph.invoiceNum}</td>
                <td>{ph.sellerID}</td>
                <td>{ph.buyerID}</td>
                <td>{ph.aptNum}</td>
                <td>{ph.dateSale}</td>
                <td>{ph.price}</td>
                <td><MdEdit/></td>
                <td><MdDelete onClick={() => delPH(ph.invoiceNum)}/></td>
            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar />
        <h1>Price History</h1>
        <p>Price History table tracks information related to a purchase of an apartment by the buying owner from the seller owner.  Information tracked include <br></br>
        price, date of Sale, and apartment number</p>
        <PhList PHmap={phList} filterResults={filterResults}/>
        <MdAdd onClick={onAddClick}></MdAdd>
        
        
        </>
        
    )
}

export default PriceHistory;