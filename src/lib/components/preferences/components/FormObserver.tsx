import React from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useDidMountEffect, useDebouncedCallback } from '@saastack/rehooks';

interface Props<T = FormikValues> {
  onChange?: (values: T) => void;
  debounce?: number;
}

const FormObserver = <T extends {} = FormikValues>({
  onChange,
  debounce,
}: Props<T>) => {
  const formik = useFormikContext<T>();
  const [debouncedChange] = useDebouncedCallback(onChange!, debounce!);
  useDidMountEffect(() => {
    debouncedChange(formik.values);
  }, [formik?.values]);
  return null;
};

FormObserver.defaultProps = {
  onChange: () => undefined,
  debounce: 300,
};

export default FormObserver;
