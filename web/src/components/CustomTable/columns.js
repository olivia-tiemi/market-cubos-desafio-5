export const columns = [
  { id: 'photoUrl', label: '', maxWidth: 100, type: 'image' },
  { id: 'title', label: 'Name', maxWidth: 200 },
  { id: 'stock', label: 'Estoque', maxWidth: 100 },
  { id: 'sold', label: 'Vendidos', maxWidth: 100 },
  {
    id: 'price',
    label: 'Valor',
    maxWidth: 100,
    format: (value) => `R$${value.toFixed(2)}`,
    type: 'currency',
  },
  {
    id: 'edit',
    label: ' ',
    maxWidth: 20,
    type: 'image',
    handleClick: (
      e,
      product,
      navigate,
      updateProduct,
      updateOpenRemoveModal
    ) => {
      navigate('/editproduct');
      updateProduct(product);
    },
  },
  {
    id: 'exclude',
    label: ' ',
    maxWidth: 20,
    type: 'image',
    handleClick: (
      e,
      product,
      navigate,
      updateproduct,
      updateOpenRemoveModal
    ) => {
      updateproduct(product);
      updateOpenRemoveModal(true);
    },
  },
];
