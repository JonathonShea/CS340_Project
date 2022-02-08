import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Header from "../components/Header";

function PriceHistory() {
    return(
        <><Header></Header>
        <h1 class = "DatabaseTitle">Price History</h1>
        <p class = "DatabaseText">Price History database table contains information realted to each
        specific sale of the aprtment between the selling owner and buying owner</p>
        <table id="PriceHistory">
            <thead>
                <tr>
                    <th>Invoice Number [varchar]</th>
                    <th>Seller ID [int]</th>
                    <th>Buyer ID [int]</th>
                    <th>Apartment Number [int]</th>
                    <th>Date of Sale(Yyyy-Mm-Dd) [dateTime]</th>
                    <th>Price($) [int]</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>055</td>
                    <td>666</td>
                    <td>999</td>
                    <td>55</td>
                    <td>2021-12-15</td>
                    <td>1,000,000</td>
                    <td><MdEdit /></td>
                    <td><MdDeleteForever /></td>
                </tr>
            </tbody>
        </table></>
        



    )};



    export default PriceHistory;