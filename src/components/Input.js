import { useRef } from "react";

export default function Input(props) {
  const { searchValue, onSearchChange } = props;
  const searchRef = useRef();
  const ifSearchValue = () => {
    searchRef.current.value
      ? searchRef.current.focus()
      : searchRef.current.blur();
  };

  return (
    <input
      ref={searchRef}
      type="search"
      value={searchValue}
      onChange={onSearchChange}
      onBlur={() => ifSearchValue()}
    />
  );
}
