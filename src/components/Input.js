export default function Input(props) {
  const { searchValue, onSeachChange, onBlur } = props;
  return (
    <input
      type="search"
      value={searchValue}
      onChange={onSeachChange}
      onBlur={onBlur}
    />
  );
}
