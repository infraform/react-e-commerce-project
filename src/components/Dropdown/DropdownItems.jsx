import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import DownArrow from '../../constants/icons/DownArrow';
import './dropdown.scss';
import useClickOutside from '../../hooks/useClickOutside';

function DropdownItems({
  options, placeholder, error, value, setSelect,
}) {
  const inputRef = useRef();
  const [selected, setSelected] = useState(placeholder);
  const [isActive, setIsActive] = useState(false);
  const [isOutsideClick, setIsOutsideClick] = useClickOutside(inputRef);
  return (
    <div className="dropdown" ref={inputRef} role="none" onClick={() => setIsOutsideClick(false)}>
      <div className={` ${value ? 'valid' : ''} ${error ? 'not-valid' : ''} dropdown-btn`} onChange={(item) => setSelect(item)} role="none" onClick={() => setIsActive(true)}>
        {selected}
        <DownArrow />
      </div>
      {!isOutsideClick && isActive && (
        <div className="dropdown-content">
          <div
            className="dropdown-item -placeholder"
            role="none"
            onClick={() => {
              setIsActive(false);
              setSelected(placeholder);
            }}
          >
            {placeholder}
            <DownArrow />

          </div>
          {options.map((option) => (
            <div
              key={option.id}
              role="none"
              onClick={() => {
                setSelected(option.name);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
DropdownItems.propTypes = {
  options: propTypes.arrayOf.isRequired,
  placeholder: propTypes.string.isRequired,
  error: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  setSelect: propTypes.func.isRequired,
};

export default DropdownItems;
