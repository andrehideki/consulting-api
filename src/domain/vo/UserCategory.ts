export enum UserCategory {
  ADMIN = "ADMIN", 
  OWNER = "OWNER", 
  CONSULTING = "CONSULTING"
}

export const getUserCategory = (category: string): UserCategory => {
  let userCategory: UserCategory = UserCategory[category];
  if (!userCategory) throw new Error("Category not found");
  return userCategory;
}