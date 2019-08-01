import { UPDATE_TOTAL_BUDGET, ADD_CATEGORY, DELETE_CATEGORY } from "./settings.constants";

const defaultState = {
    totalBudget: 200,
    categories: [{categoryName:'category_1'},{categoryName:'category_2'}]
};

function SettingsReducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_TOTAL_BUDGET: {
            return {
                ...state,
                totalBudget: action.totalBudget
            };
        }
        case ADD_CATEGORY: {
            return {
                totalBudget: state.totalBudget,
                categories: [
                    ...state.categories,
                    {
                        categoryName: action.categoryName
                    }
                ]
            };
        }
        case DELETE_CATEGORY: {
            return {
                totalBudget: state.totalBudget,
                categories: state.categories.filter(category => category.categoryName !== action.categoryName)
            };
        }
        default:
            return state;
    }
}

export default SettingsReducer;