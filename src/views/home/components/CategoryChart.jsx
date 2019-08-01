import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Pie } from 'react-chartjs-2';

function CategoryChart(props) {
    let { expenseList } = props;

    const data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };

    return (
        <>
            <Card className="card-stats">
                <CardHeader>
                    <CardTitle tag="h5">Category wise Split (not implemented )</CardTitle>
                    <hr />
                </CardHeader>
                <CardBody>
                    <Pie data={data} />
                </CardBody>

            </Card>

        </>
    );
}

export default CategoryChart;
