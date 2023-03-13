import { create } from 'zustand';

export const useLoggedStore = create((set) => ({
  user: {},
  updateUser: (newUser) => set({ user: newUser }),
}));

export const useProductStore = create((set) => ({
  product: {},
  updateProduct: (newProduct) => set({ product: newProduct }),
}));

export const useUserStore = create((set) => ({
  user: '',
  updateUser: (newUser) => set({ user: newUser }),
}));

export const useRemoveModalStore = create((set) => ({
  openRemoveModal: false,
  updateOpenRemoveModal: (newStatus) => set({ openRemoveModal: newStatus }),
}));

export const useProductsListStore = create((set) => ({
  productsList: [],
  updateProductsList: (newProductsList) =>
    set({ productsList: newProductsList }),
}));

export const useLoggedProductsListStore = create((set) => ({
  loggedProductsList: [],
  updateLoggedProductsList: (newLoggedProductsList) =>
    set({ loggedProductsList: newLoggedProductsList }),
}));

export const usePageStore = create((set) => ({
  page: 0,
  updatePage: (newPage) => set({ page: newPage }),
}));

export const useRowsPerPageStore = create((set) => ({
  rowsPerPage: 10,
  updateRowsPerPage: (newRowsPerPage) => set({ rowsPerPage: newRowsPerPage }),
}));

export const useSchemaStore = create((set) => ({
  schema: {},
  updateSchema: (newSchema) => set({ schema: newSchema }),
}));

export const useRegisterStore = create((set) => ({
  register: undefined,
  updateRegister: (newRegister) => set({ register: newRegister }),
}));

export const useTypeStore = create((set) => ({
  type: '',
  updateType: (newType) => set({ type: newType }),
}));

export const useSetValueStore = create((set) => ({
  setValue: undefined,
  updateSetValue: (newSetValue) => set({ setValue: newSetValue }),
}));

export const useTriggerStore = create((set) => ({
  trigger: undefined,
  updateTrigger: (newTrigger) => set({ trigger: newTrigger }),
}));

export const useInputArrayStore = create((set) => ({
  inputArray: [],
  updateInputArray: (newInputArray) => set({ inputArray: newInputArray }),
}));

export const useTypeArrayStore = create((set) => ({
  typeArray: [],
  updateTypeArray: (newTypeArray) => set({ typeArray: newTypeArray }),
}));

export const usePlaceholderStore = create((set) => ({
  placeholder: [],
  updatePlaceholder: (newPlaceholder) => set({ placeholder: newPlaceholder }),
}));

export const useLabelArrayStore = create((set) => ({
  labelArray: [],
  updateLabelArray: (newLabelArray) => set({ labelArray: newLabelArray }),
}));
