import type React from 'react';
import { useEffect, useState } from 'react';
import type { FormData as BookData } from '../model/model';
import styles from './bookForm.module.css';
import TextField from './TextField';
import Close from '../icons/Close';

interface Props {
  initialValues: BookData;
  enableReinitialize?: boolean;
  validate?: (values: BookData) => { [k: string]: string };
  onSubmit: (values: BookData, reset: () => void) => void;
  onReset?: () => void;
  PrimaryIcon: React.ReactElement;
  primaryLabel: string;
  className?: string;
  variant: 'search' | 'edit';
}

const emptyValues: BookData = {
  author: '',
  title: '',
  location: '',
  category: '',
};

type State = {
  resetKey: number;
  defaults: BookData;
  errors: { [k: string]: string };
};

const BookForm: React.FC<Props> = ({
  initialValues,
  enableReinitialize,
  validate,
  onSubmit,
  onReset,
  PrimaryIcon,
  primaryLabel,
  className,
  variant,
}) => {
  const [{ resetKey, defaults, errors }, setState] = useState<State>({
    resetKey: 0,
    defaults: initialValues,
    errors: {},
  });

  useEffect(() => {
    if (enableReinitialize) {
      setState(s => ({
        ...s,
        resetKey: s.resetKey + 1,
        defaults: initialValues,
      }));
    }
  }, [initialValues, enableReinitialize]);

  const reset = () =>
    setState(s => ({
      resetKey: s.resetKey + 1,
      defaults: emptyValues,
      errors: {},
    }));

  const handleAction = (formData: FormData) => {
    const values: BookData = {
      author: formData.get('author')?.toString() ?? '',
      title: formData.get('title')?.toString() ?? '',
      location: formData.get('location')?.toString() ?? '',
      category: formData.get('category')?.toString() ?? '',
      read: formData.get('read')?.toString() ?? '',
      ...(variant === 'search' && {
        showOnlyNotRead: formData.get('showOnlyNotRead') === 'on',
      }),
    };
    const validationErrors = validate ? validate(values) : {};
    if (Object.keys(validationErrors).length > 0) {
      setState(s => ({ ...s, errors: validationErrors }));
      return;
    }
    setState(s => ({ ...s, defaults: values, errors: {} }));
    onSubmit(values, reset);
  };

  return (
    <form
      key={resetKey}
      name="book-form"
      action={handleAction}
      onReset={() => {
        setState(s => ({
          resetKey: s.resetKey + 1,
          defaults: emptyValues,
          errors: {},
        }));
        onReset?.();
      }}
      className={className}
    >
      <div className={styles['input-wrapper']}>
        <TextField
          id="author"
          name="author"
          label="autore"
          defaultValue={defaults.author}
          error={errors.author}
        />

        <TextField
          id="title"
          name="title"
          label="titolo"
          defaultValue={defaults.title}
          error={errors.title}
        />

        <TextField
          id="location"
          name="location"
          label="collocazione"
          defaultValue={defaults.location}
          error={errors.location}
        />

        <TextField
          id="category"
          name="category"
          label="categoria"
          placeholder="cate"
          defaultValue={defaults.category ?? ''}
        />

        {variant === 'search' && (
          <label>
            <input
              type="checkbox"
              name="showOnlyNotRead"
              defaultChecked={!!defaults.showOnlyNotRead}
            />
            non letto
          </label>
        )}

        {variant === 'edit' && (
          <fieldset>
            <legend>letto</legend>
            <input
              type="radio"
              id="yes"
              name="read"
              value="true"
              defaultChecked={defaults.read === 'true'}
            />
            <label htmlFor="yes">sì</label>
            <input
              type="radio"
              id="no"
              name="read"
              value="false"
              defaultChecked={defaults.read === 'false'}
            />
            <label htmlFor="no">no</label>
            <input
              type="radio"
              id="do-not-know"
              name="read"
              value=""
              defaultChecked={defaults.read === undefined}
            />
            <label htmlFor="do-not-know">non so</label>
          </fieldset>
        )}
      </div>
      <div className={styles['buttons-wrapper']}>
        <button className="btn" type="submit">
          {PrimaryIcon}
          {primaryLabel}
        </button>
        <button className="btn secondary" type="reset">
          <Close />
          reset
        </button>
      </div>
    </form>
  );
};

export default BookForm;
