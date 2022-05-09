import React, { useState } from 'react';
import './toggleSwitch.scss';
import propTypes from 'prop-types';

function ToggleSwitch({ value, onChange }) {
  const [toggleOn, setToggleOn] = useState(value);

  return (
    <div
      className={`holder ${toggleOn ? 'on' : 'off'}`}
      onClick={() => {
        setToggleOn((prev) => !prev);
        onChange({ target: { name: 'isOfferable', value: !toggleOn } });
      }}
      role="none"
      name="isOfferable"
    >
      <div className="toggle" />
    </div>
  );
}
ToggleSwitch.propTypes = {
  value: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
};

export default ToggleSwitch;
