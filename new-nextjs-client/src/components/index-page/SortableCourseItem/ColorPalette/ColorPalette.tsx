import styles from './ColorPalette.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

interface Props {
  onColorSelect: (newColor: number) => void;
  selectedColor: number;
  setColor: (newColor: number) => void;
}

function ColorPalette(props: Props) {
  const [selectedColor, setSelectColor] = useState(props.selectedColor);
  const handleColorSelect = (newColor: number) => {
    setSelectColor(newColor);
    props.onColorSelect(newColor);
    props.setColor(newColor);
  };

  return (
    <div className={cx('container')}>
      {[...Array(12).keys()].map((num, index) => (
        <div
          key={index}
          className={cx('color-btn', `color-${num + 1}`, {
            selected: selectedColor === num + 1,
          })}
          onClick={() => handleColorSelect(num + 1)}
        ></div>
      ))}
    </div>
  );
}

export default ColorPalette;
