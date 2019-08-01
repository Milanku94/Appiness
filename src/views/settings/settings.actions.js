import { UPDATE_TOTAL_BUDGET, ADD_CATEGORY ,DELETE_CATEGORY} from "./settings.constants";

export function updateTotalBudget(totalBudget) {
    return {
      type: UPDATE_TOTAL_BUDGET,
      totalBudget
    };
  }

export function addCategory(categoryName) {
    return {
      type: ADD_CATEGORY,
      categoryName
    };
  }

  export function deleteCategory(categoryName) {
    return {
      type: DELETE_CATEGORY,
      categoryName
    };
  }

