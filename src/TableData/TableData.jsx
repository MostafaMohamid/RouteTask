import React from 'react'
import { useState, useEffect } from 'react';

import axios from 'axios';

export default function TableData() {
    const [customerData, setCustomerData] = useState([]);
    const [transactionsData, setTransactionsData] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const getSearchUser = (event) => {
        setSearchUser(event.target.value)

    }
    const searchCustomers = customerData?.data?.customers
        .filter(customer =>
            customer.name.toLowerCase().includes(searchUser.toLowerCase())
        );
    const getSearchAmount = (event) => {


        setSearchAmount(event.target.value)

    }
    const searchAmounts = transactionsData?.data?.transactions
        .filter(transaction =>
            transaction.amount >= searchAmount
        );
    const filterdUsers = customerData?.data?.customers
        .filter(user =>

            searchAmounts.some(transaction => transaction.customer_id == user.id)
        );

    useEffect(() => {
        axios.get('http://localhost:3000/customers').then((response) => {

            setCustomerData(response);
        });
        axios.get('http://localhost:3000/transactions').then((response) => {

            setTransactionsData(response);
        });
        axios.get('https://mostafamohamid.github.io/api/db.json').then((response) => {
            console.log(response.data);
            setCustomerData(response);
            setTransactionsData(response);

            // setCustomerData(response.data?.customers
            // );
            // setTransactionsData(response.data?.transactions);

        });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-6">
                    <form className="form-inline">
                        <input
                            className="form-control w-100"
                            type="text"
                            placeholder="Search By User"
                            aria-label="Search By User"
                            value={searchUser}
                            onChange={getSearchUser}
                        />
                    </form>
                </div>
                <div className="col-md-6">
                    <form className="form-inline">
                        <input
                            className="form-control w-100"
                            type="number"
                            placeholder="Search By Amount"
                            aria-label="Search By Amount"
                            value={searchAmount}
                            onChange={getSearchAmount}
                        />
                    </form>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th colSpan="2" className="text-center">Transaction Details</th>
                        </tr>
                        <tr>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {(filterdUsers && searchAmount ? filterdUsers : searchCustomers)?.map((customer) => (
                            <tr key={customer.id}>

                                <td>{customer.name}</td>
                                {searchAmounts?.filter(transaction => transaction.customer_id == customer.id).map((transaction) => (
                                    <React.Fragment key={transaction.id}>
                                        <td className="text-center">{transaction.date}  Amount:<span className="badge text-bg-info mx-1 fw-bold align-middle " style={{ fontSize: "13px" }}> {transaction.amount? transaction.amount : "--"}</span>
                                        </td>
                                        {/* <td className="text-center">{transaction.amount}</td> */}
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    );
}
