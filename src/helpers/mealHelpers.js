export const calculateMealLogs = (meals) => {
    const mealLogs = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
    };
  
    meals.forEach((meal) => {
      meal.items.forEach((item) => {
        switch (meal.type) {
          case 'Frühstück':
            mealLogs.breakfast += item.calories;
            break;
          case 'Mittagessen':
            mealLogs.lunch += item.calories;
            break;
          case 'Abendessen':
            mealLogs.dinner += item.calories;
            break;
          default:
            break;
        }
      });
    });
  
    return mealLogs;
  };
  
  export const calculateMacronutrients = (meals) => {
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
  
    meals.forEach((meal) => {
      meal.items.forEach((item) => {
        const { totalCarbs, totalProtein, totalFat } = item;
        totalCarbs += totalCarbs;
        totalProtein += totalProtein;
        totalFat += totalFat;
      });
    });
  
    return {
      carbs: totalCarbs,
      protein: totalProtein,
      fat: totalFat,
    };
  };
  
  export const calculateEatenCalories = (macronutrients) => {
    // Assuming 4 calories per gram of carbs and protein, and 9 calories per gram of fat
    const { carbs, protein, fat } = macronutrients;
    const carbsCalories = carbs * 4;
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
  
    return carbsCalories + proteinCalories + fatCalories;
  };
  