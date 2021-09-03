import { useRef, useEffect } from "react";

export default function Input(props) {
  const { searchValue, onSearchChange } = props;
  const searchRef = useRef(false);
  const ifSearchValue = () => {
    searchValue ? searchRef.current.focus() : searchRef.current.blur();
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
