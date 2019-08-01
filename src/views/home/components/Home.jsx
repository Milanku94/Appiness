import React from "react";
import { Card,  CardBody, CardTitle, Row, Col } from "reactstrap";
import BudgetOverview from './BudgetOverview';
import CategoryChart from './CategoryChart';
import { Expense, ExpenseList } from '../../expense';
import { connect } from "react-redux";
import { selectTotalBudget, selectCategories, selectExpenseList } from "../home.selectors";

function Home(props) {
  let { totalBudget, expenseList } = props;

  return (
      <div className="content">
        <Row>
          <Col lg="6" md="6" sm="6">
            <BudgetOverview totalBudget={totalBudget} expenseList={expenseList} />
          </Col>
          <Col lg="6" md="6" sm="6">
            <CategoryChart expenseList={expenseList} />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <Expense actionName="Add" labelName="Add Expense" />
                <ExpenseList />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
  );
}

function mapStateToProps(state) {
  return {
    totalBudget: selectTotalBudget(state),
    categories: selectCategories(state),
    expenseList: selectExpenseList(state),
  };
}

export default connect(mapStateToProps, null)(Home);
