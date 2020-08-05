import React from 'react';
import { connect, FormikProps } from 'formik';
import Swal from 'sweetalert2';

/**
 * Taken from and adopted to TypeScript
 * https://github.com/jaredpalmer/formik/issues/1484#issuecomment-490558973
 */
function OnSubmitValidationError(props: {
  callback: (f: FormikProps<any>) => any;
  formik?: FormikProps<any>;
}) {
  const { callback, formik } = props;

  const effect = () => {
    if (formik && formik.submitCount > 0 && !formik?.isSubmitting && !formik?.isValid) {
      callback(formik);
    }
  };
  React.useEffect(effect, [formik?.submitCount, formik?.isSubmitting]);

  return null;
}

const SubmitError = connect(OnSubmitValidationError);

/** Show alert with all errors on failed validation on submit */
export function ShowErrorAlert(props: { title?: string }) {
  return (
    <SubmitError
      callback={({ errors }) => {
        const errorsText = Object.values(errors).join('\n');
        Swal.fire({
          title: props.title ?? 'Greske u formi',
          html: `<pre style="text-align: left; white-space: pre-line; padding: 0 10px;">${errorsText}</pre>`,
          icon: 'error',
        });
      }}
    />
  );
}
