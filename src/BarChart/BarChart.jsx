import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function BarChart() {
    const [customerData, setCustomerData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [chartData, setChartData] = useState({});
    const [transactionsData, setTransactionsData] = useState([]);

    const selectCustomer = (event) => {
        setSelectedCustomer(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        // axios.get('http://localhost:3000/transactions').then((response) => {
        //     console.log(response.data);
        //     setCustomerData(response.data);
        // });
        // axios.get('http://localhost:3000/transactions').then((response) => {
        //     setTransactionsData(response.data);
        // });
        axios.get('https://mostafamohamid.github.io/api/db.json').then((response) => {
            setCustomerData(response.data?.customers);
            setTransactionsData(response.data?.transactions);
           
        });
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            const selectedCustomerTransactions = transactionsData.filter(transaction => transaction.customer_id == selectedCustomer);
            const groupedTransactions = selectedCustomerTransactions.reduce((aggregated, transaction) => {
                const date = transaction.date;
                if (!aggregated[date]) {
                    aggregated[date] = 0;
                }
                aggregated[date] += transaction.amount;
                return aggregated;
            }, {});
            setChartData({
                labels: Object.keys(groupedTransactions),
                datasets: [
                    {
                        label: 'Total Transaction Amount',
                        data: Object.values(groupedTransactions),
                        backgroundColor: '#6200ff',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } else {
            setChartData({});
        }
    }, [selectedCustomer, transactionsData]);

    return (
        <div className='container py-3'>
            <h5 className='py-2'> Total transaction amount per day for : </h5>
            <select className="form-select" aria-label="Select customer" onChange={selectCustomer}>
                <option value="">Select the Customer</option>
                {customerData?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>
            <div className="row mx-auto">
                <div className="col-md-8">
                    {Object.keys(chartData).length > 0 && <Bar data={chartData} />}
                </div>
            </div>
        </div>
    );
}
