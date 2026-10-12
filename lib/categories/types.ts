export interface Category {
  key: string;
  label: string;
}

export interface CategoriesContextType {
  categories: Category[];
  addCategory: (label: string) => void;
  renameCategory: (key: string, label: string) => void;
  deleteCategory: (key: string) => void;
}
