const ListItem = (props) => {
  const { each, editButton } = props;
  const { id, firstName, lastName, phoneNumber } = each;
  const fullName = firstName + " " + lastName;
  const editButt = () => {
    editButton(id);
  };
  const delButt = () => {
    props.deleteButton(id);
  };
  return (
    <li className="bg-slate-100 rounded-md border-solid border-gray-400 p-4 flex justify-between items-center mt-4">
      <p className="font-sans text-red-500 font-bold">{id}</p>
      <p className="font-serif text-amber-950 font-bold text-xl">{fullName}</p>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={editButt}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5"
          onClick={delButt}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ListItem;
