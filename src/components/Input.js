export default function Input(props) {
  const { searchValue, onSeachChange } = props;
  return <input type="search" value={searchValue} onChange={onSeachChange} />;
}
