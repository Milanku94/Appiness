import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "reactstrap";
import moment from "moment";
import cogoToast from 'cogo-toast';
import { connect } from "react-redux";
import { deleteExpense } from "../expense.actions";
import { selectExpenseList } from "../expense.selectors";

import Expense from './Expense';

class ExpenseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteExpense = async (expense) => {
        let deleteConfirm = window.confirm("Are you sure to delete jkhkj?");
        if (deleteConfirm) {
            await this.props.deleteExpense(expense);
            cogoToast.success("Expense deleted successfully!");
        }
    }

    render() {
        //fetch required values from component props
        const { expenseList } = this.props;

        //pagination option
        const paginationOptions = {
            // pageStartIndex: 0,
            sizePerPage: 5,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true
        };

        //table action buttons
        const actionButtons = (cell, row) => {
            return (
                <div>
                    <Expense actionName="Edit" labelName="Edit" expense={row} />
                    <Button className="mr-1" color="danger" size="sm" onClick={() => this.deleteExpense(row)}>Delete</Button>
                </div>
            )
        }

        //table columns
        const columns = [{
            dataField: 'id',
            text: 'ID',
            headerStyle: () => {
                return { width: "11%", textAlign: 'left', backgroundColor: '#c8e6c9' };
            },
            sort: true
        }, {
            dataField: 'categoryName',
            text: 'Catrgory',
            headerStyle: () => {
                return { width: "18%", textAlign: 'left', backgroundColor: '#c8e6c9' };
            },
            sort: true
        }, {
            dataField: 'itemName',
            text: 'Item Name',
            headerStyle: () => {
                return { width: "22%", textAlign: 'left', backgroundColor: '#c8e6c9' };
            },
            sort: true
        }, {
            dataField: 'ammount',
            text: 'Ammount',
            headerStyle: () => {
                return { textAlign: 'left', backgroundColor: '#c8e6c9' };
            },
            sort: true
        },
        {
            dataField: 'expenseDate',
            text: 'Expense Date',
            headerStyle: () => {
                return { textAlign: 'left', backgroundColor: '#c8e6c9' };
            },
            formatter: (cell, row) => { return moment(cell).format("MM/DD/YYYY") },
            sort: true
        },
        {
            dataField: 'Action',
            text: 'Action',
            headerStyle: () => {
                return { width: "17%", textAlign: 'center', backgroundColor: '#c8e6c9' };
            },
            formatter: actionButtons,
        }
        ];

        const defaultSorted = [{
            dataField: 'id',
            order: 'asc'
        }];


        return (
            <div className="content">

                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    data={expenseList}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    pagination={paginationFactory(paginationOptions)}
                    noDataIndication="Table is Empty"
                    hover
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        expenseList: selectExpenseList(state)
    };
}

const mapDispatchToProps = dispatch => ({
    deleteExpense: (expense) => {
        dispatch(deleteExpense(expense));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);