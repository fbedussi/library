import { useEffect, useRef, useState } from 'react';
import styles from './textField.module.css';

const TextField = ({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  error,
  type,
}: {
  id: string;
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  type?: 'password';
}) => {
  const [dirty, setDirty] = useState(!!defaultValue);

  return (
    <div className={styles.container}>
      <input
        id={id}
        type={type ?? 'text'}
        placeholder={placeholder}
        name={name}
        className={dirty ? styles.dirty : undefined}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        onChange={e => setDirty(!!e.currentTarget.value)}
      />
      {!!label && <label htmlFor={id}>{label}</label>}
      {!!error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TextField;
