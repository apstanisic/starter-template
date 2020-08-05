import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { auth } from 'src/core/auth/auth';
import { Input } from 'src/modules/ui/Input';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useAuth } from './use-auth';

/** Form to change user's password */
export function ChangePassword() {
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().min(8).required(),
        newPassword: Yup.string().min(8).required(),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null as any])
          .required(),
      })}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (values.newPassword.length < 8) {
          errors.newPassword = 'Sifra prekratka';
        }
        if (values.newPassword !== values.confirmPassword) {
          errors.confirmPassword = 'Potvrda sifre ne valja';
        }
        return errors;
      }}
      onSubmit={async ({ newPassword, oldPassword }, helpers) => {
        if (!user) return Swal.fire({ title: 'Niste ulogovani', icon: 'error' });
        const confirmed = await Swal.fire({
          title: 'Da li ste sigurni?',
          icon: 'warning',
          focusCancel: true,
          confirmButtonText: 'Da',
          cancelButtonText: 'Ne',
          showCancelButton: true,
        });
        if (confirmed.value) {
          try {
            await auth.managePassword.changePassword({
              newPassword,
              oldPassword,
              email: user.email,
            });
            Swal.fire({ title: 'Uspesno zamenjena sifra', icon: 'success' });
          } catch (e) {
            Swal.fire({ title: 'Problem pri promeni sifre', icon: 'error' });
          } finally {
            helpers.resetForm();
          }
        }
      }}
    >
      {({ resetForm }) => (
        <Form className="w-full">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Input type="password" name="oldPassword" placeholder="Stara lozinka" />
            </Grid>

            <Grid item xs={12}>
              <Input type="password" name="newPassword" placeholder="Nova lozinka" />
            </Grid>

            <Grid item xs={12}>
              <Input type="password" name="confirmPassword" placeholder="Potvrdi lozinku" />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="outlined">
                Izmeni lozinku
              </Button>
              <Box ml={2} display="inline">
                <Button variant="outlined" onClick={() => resetForm()}>
                  Odustani
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
