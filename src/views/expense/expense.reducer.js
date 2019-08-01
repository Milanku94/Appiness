import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from "./expense.constants";

const defaultState = {
    expenseList: [ { id: 1, categoryName: 'category_1', itemName: "itemName_1", ammount: 11, expenseDate: new Date()  },
    { id: 4, categoryName: 'category_4', itemName: "itemName_4", ammount: 44, expenseDate: new Date() }
]
};

function ExpenseReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_EXPENSE:
            let expense=action.expense;
            expense.id =state.expenseList[state.expenseList.length-1].id+1;
            return {
                expenseList: state.expenseList.concat([expense])
            }
        case UPDATE_EXPENSE: {
            const { id, ...rest } = action.expense
            return {
                expenseList: state.expenseList.map(expense => {
                    if (expense.id === id) {
                        return { ...expense, ...rest }
                    }
                    return expense
                })
            }
        }

        case DELETE_EXPENSE: {
            return {
                expenseList: state.expenseList.filter(expense => expense.id !== action.expense.id)
            }
        }
        default:
            return state
    }
}

export default ExpenseReducer;