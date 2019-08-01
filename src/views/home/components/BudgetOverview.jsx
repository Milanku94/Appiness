import React from "react";
import PropTypes from 'prop-types';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function BudgetOverview(props) {
    let { totalBudget, expenseList } = props;
    let totalExpense = expenseList.reduce((total, expense) => { return total + parseInt(expense.ammount) }, 0);
    let percentageOfExpense = (totalBudget && totalBudget !== 0) ? ((totalExpense / totalBudget) * 100).toFixed(2) + '%' : '';

    return (
        <>
            <Card className="card-stats" style={{ height: "95%" }}>
                <CardHeader>
                    <CardTitle tag="h5">Budget Overview</CardTitle>
                    <hr />
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="4" xs="5">
                            <div className="text-center ">
                                <h3>{percentageOfExpense}</h3>
                            </div>
                        </Col>
                        <Col md="8" xs="7">
                            <div className="numbers">
                                <p className="card-category">Total Budget</p>
                                <p>Rs {totalBudget ? totalBudget : 0}</p>
                                <p className="card-category">Total Expense</p>
                                <p>Rs {totalExpense}</p>
                                <p />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
}

BudgetOverview.propTypes = {
    totalBudget: PropTypes.number,
    expenseList: PropTypes.object
}

BudgetOverview.defaultProps = {
    totalBudget: 0,
    expenseList: [],
}

export default BudgetOverview;
