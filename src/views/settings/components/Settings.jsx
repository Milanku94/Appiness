import React from "react";
import { Card, CardBody, Button, FormGroup, Input, Table, FormFeedback } from "reactstrap";
import cogoToast from 'cogo-toast';
import { connect } from "react-redux";
import { updateTotalBudget, addCategory, deleteCategory } from "../settings.actions";
import { selectTotalBudget, selectCategories } from "../settings.selectors";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: props.totalBudget,
      categoryName: null,
      totalBudgetInvalidMessage: '',
      categoryNameInvalidMessage: '',
    };
  }

  componentDidMount() {

  }

  handleChange = async (event, maxsize) => {
    let { name, value } = event.target;
    value = value.replace(/^\s+/g, "");
    if (value.length <= maxsize) {
      await this.setState({ [name]: value });
    }
  }

  addCategory = async () => {
    let { categoryName } = this.state;
    let { categories } = this.props;
    //valid category name
    if (categoryName) {
      categoryName = categoryName.trim();
    } else {
      this.setState({ categoryNameInvalidMessage: "Category Name is required." });
      return;
    }
    //check whether category exist or not 
    if (categories.find(category => category.categoryName === categoryName)) {
      this.setState({ categoryNameInvalidMessage: "Allready Category Name exist." });
      return;
    }
    await this.props.addCategory(categoryName);
    cogoToast.success("Category added successfully!");
    this.setState({ categoryName: '', categoryNameInvalidMessage: '' });
  }

  updateTotalBudget = async () => {
    let { totalBudget } = this.state;
    //valid total budget 
    if (!totalBudget) {
      this.setState({ totalBudgetInvalidMessage: "Total Budget is required." });
    } else {
      await this.props.updateTotalBudget(totalBudget);
      cogoToast.success("Total Budget updated successfully!");
      this.setState({ totalBudget, totalBudgetInvalidMessage: '' });
    }
  }

  deleteCategory = (categoryName) => {
    let deleteConfirm = window.confirm("Are you sure to delete?");
    if (deleteConfirm) {
      cogoToast.success("Category deleted successfully!");
      this.props.deleteCategory(categoryName);
    }
  }

  render() {

    //fetch required values from component and state
    const { totalBudget, categoryName, totalBudgetInvalidMessage, categoryNameInvalidMessage } = this.state;
    const { categories } = this.props;
    return (
      <div className="content">
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-md-1 pr-1">

              </div>
              <div className="col-md-2 pr-1" style={{ textAlign: "center" }}>
                <label style={{ paddingTop: "12px" }}>Total Budget</label>
              </div>

              <div className="col-md-4 px-1">
                <FormGroup >
                  <Input invalid={totalBudgetInvalidMessage ? true : false} name="totalBudget" type="number" onChange={(e) => this.handleChange(e, 50)} value={totalBudget} />
                  <FormFeedback>{totalBudgetInvalidMessage}</FormFeedback>
                </FormGroup>
              </div>
              <div className="col-md-3 pl-1">
                <Button color="success" onClick={this.updateTotalBudget} style={{ marginTop: "auto", width: "inherit" }}>Update</Button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-1 pr-1">

              </div>
              <div className="col-md-2 pr-1" style={{ textAlign: "center" }}>
                <label style={{ paddingTop: "12px" }}>Category</label>
              </div>
              <div className="col-md-4 px-1">
                <FormGroup >
                  <Input invalid={categoryNameInvalidMessage ? true : false} name="categoryName" type="text" onChange={(e) => this.handleChange(e, 50)} value={categoryName} />
                  <FormFeedback>{categoryNameInvalidMessage}</FormFeedback>
                </FormGroup>
              </div>
              <div className="col-md-3 pl-1">
                <Button color="success" onClick={this.addCategory} style={{ marginTop: "auto", width: "inherit" }}>Add</Button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2 pr-1">
              </div>
              <div className="col-md-8 px-1">
                {
                  categories.length > 0 ?
                    <Table hover bordered>
                      <thead>
                        <tr>
                          <th>Sl No.</th>
                          <th>Category Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          categories.map((category, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.categoryName}</td>
                                <td>
                                  <Button color="danger" fab round icon size="sm" onClick={() => this.deleteCategory(category.categoryName)}>
                                    <i className="fa fa-trash"></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        }

                      </tbody>
                    </Table>
                    : ""
                }
              </div>
              <div className="col-md-2 pl-1">
              </div>
            </div>


          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalBudget: selectTotalBudget(state),
    categories: selectCategories(state)
  };
}

const mapDispatchToProps = dispatch => ({
  updateTotalBudget: (totalBudget) => {
    dispatch(updateTotalBudget(totalBudget));
  },
  addCategory: (categoryName) => {
    dispatch(addCategory(categoryName));
  },
  deleteCategory: (categoryName) => {
    dispatch(deleteCategory(categoryName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);