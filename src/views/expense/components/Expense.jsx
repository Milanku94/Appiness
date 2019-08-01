import React from "react";
import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cogoToast from 'cogo-toast';
import { connect } from "react-redux";
import { addExpense, updateExpense } from "../expense.actions";
import { selectCategories } from "../expense.selectors";

class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            categoryName: '',
            itemName: '',
            ammount: '',
            expenseDate: null,
            submitted: false
        };
    }

    componentDidMount() {
        let { expense, actionName } = this.props;
        console.log('hi hello');
        if (expense && actionName == "Edit") {
            console.log('hi');
            this.setState({ ...expense });
        }
    }

    handleChange = async (event, maxsize) => {
        let { name, value } = event.target;
        value = value.replace(/^\s+/g, "");
        if (value.length <= maxsize) {
            await this.setState({ [name]: value });
        }
    }

    handleExpenseDateChange = async (expenseDate) => {
        await this.setState({ expenseDate, });
    }

    addExpense = async (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        let { categoryName, itemName, ammount, expenseDate } = this.state;
        if (categoryName && itemName && ammount && expenseDate) {
            let category = { categoryName, itemName, ammount, expenseDate };
            await this.props.addExpense(category);
            cogoToast.success("Expense added successfully!");
            this.hideModal();
        }
    }

    updateExpense = async (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        let { id, categoryName, itemName, ammount, expenseDate } = this.state;
        if (id && categoryName && itemName && ammount && expenseDate) {
            let category = { id, categoryName, itemName, ammount, expenseDate };
            await this.props.updateExpense(category);
            cogoToast.success("Expense updated successfully!");
            this.hideModal();
        }
    }

    showModal = () => {
        let { actionName, expense } = this.props;
        if (actionName == "Edit") {
            expense.expenseDate = new Date(expense.expenseDate);
            this.setState({ submitted: false, showModal: true, ...expense });
        } else {
            this.setState({ submitted: false, showModal: true, categoryName: '', itemName: '', ammount: '', expenseDate: null });
        }
    }

    hideModal = () => {
        this.setState({ submitted: false, showModal: false, categoryName: '', itemName: '', ammount: '', expenseDate: null });
    }

    render() {

        //fetch required values from component state
        const { showModal, categoryName, itemName, ammount, expenseDate, submitted } = this.state;
        let { actionName, labelName, categories } = this.props;
        let categoryOptions = [{ categoryName: '' }].concat(categories);
        return (
            <>
                {actionName == "Add" ?
                    <Button onClick={() => this.setState({ submitted: false, showModal: true })} color="success" round="true">{labelName}</Button>
                    :
                    actionName == "Edit" ?
                        <Button className="mr-1" color="warning" size="sm" onClick={() => this.showModal()}>{labelName}</Button>
                        : ""
                }

                <Modal isOpen={showModal} toggle={this.hideModal} size="lg">
                    <ModalHeader toggle={this.hideModal}>{actionName} Expense</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-md-6 pr-1">
                                <FormGroup >
                                    <Label >Category</Label>
                                    <Input invalid={(!categoryName && submitted) ? true : false} name="categoryName" type="select" value={categoryName} onChange={(e) => this.handleChange(e, 50)}>
                                        {categoryOptions.map((e, index) => {
                                            return <option key={index} value={e.categoryName}>{e.categoryName}</option>;
                                        })}
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col-md-6 px-1">
                                <FormGroup >
                                    <Label >Item Name</Label>
                                    <Input invalid={(!itemName && submitted) ? true : false} name="itemName" type="text" onChange={(e) => this.handleChange(e, 50)} value={itemName} />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 pr-1">
                                <FormGroup >
                                    <Label >Amount</Label>
                                    <Input type="number" invalid={(!ammount && submitted) ? true : false} name="ammount" onChange={(e) => this.handleChange(e, 50)} value={ammount} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6 px-1">
                                <FormGroup >
                                    <Label >Expense Date</Label>
                                    <DatePicker name="expenseDate" className={(!expenseDate && submitted) ? "form-control is-invalid" : "form-control"} onChange={(value) => this.handleExpenseDateChange(value)} selected={expenseDate} />
                                    {(!expenseDate && submitted) ? <span style={{ color: "red" }} >{'actualRFQInValidMessage'}</span> : ""}

                                </FormGroup>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>{
                        actionName == "Add" ? <Button color="success" onClick={this.addExpense}>Add</Button> :
                            <Button color="success" onClick={this.updateExpense}>Update</Button>
                    }

                        <Button color="secondary" onClick={this.hideModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </>
        );
    }
}

Expense.propTypes = {
    actionName: PropTypes.string,
    labelName: PropTypes.string,
    expense:PropTypes.object
}

Expense.defaultProps = {
    actionName: "Add",
    labelName: "Add Expense",
    expense:{}
}

function mapStateToProps(state) {
    return {
        categories: selectCategories(state)
    };
}

const mapDispatchToProps = dispatch => ({
    addExpense: (expense) => {
        dispatch(addExpense(expense));
    },
    updateExpense: (expense) => {
        dispatch(updateExpense(expense));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);