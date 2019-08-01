import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from "./expense.constants";

export function addExpense(expense) {
    return {
        type: ADD_EXPENSE,
        expense
    };
}

export function updateExpense(expense) {
    return {
        type: UPDATE_EXPENSE,
        expense
    };
}

export function deleteExpense(expense) {
    return {
        type: DELETE_EXPENSE,
        expense
    };
}

