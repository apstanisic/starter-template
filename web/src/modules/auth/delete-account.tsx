import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { auth } from 'src/core/auth/auth';
import { Input } from 'src/modules/ui/Input';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useAuth } from './use-auth';

/** Form to delete account */
export function DeleteAccount() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={Yup.object().shape({
        password: Yup.string().required().min(8),
      })}
      onSubmit={async ({ password }, helpers) => {
        if (!user) return Swal.fire({ title: 'Niste ulogovani', icon: 'error' });
        const confirmed = await Swal.fire({
          title: 'Da li ste sigurni da zelite da obrisete nalog?',
          icon: 'warning',
          focusCancel: true,
          confirmButtonText: 'Da',
          cancelButtonText: 'Ne',
          showCancelButton: true,
        });
        if (confirmed.value) {
          try {
            await auth.manageUser.deleteUser(password);
            await Swal.fire({ title: 'Uspesno izbrisan nalog', icon: 'success' });
            router.push('/');
          } catch (e) {
            Swal.fire({ title: 'Problem pri brisanju naloga', icon: 'error' });
            helpers.resetForm();
          }
        }
      }}
    >
      {({ resetForm }) => (
        <Form className="w-full">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Input type="password" name="password" placeholder="Lozinka" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined">
                Izbrisi nalog
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
