import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'src/modules/ui/Input';
import { changeUserInfo } from 'src/state/authSlice';
import { AppDispatch } from 'src/state/store';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useAuth } from './use-auth';

/** Form for changing user info */
export function ChangeUserInfo() {
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();

  if (!user) return null;
  return (
    <Formik
      initialValues={{
        email: user.email,
        name: user.name ?? '',
        phoneNumber: user.phoneNumber ?? '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().notRequired(),
        name: Yup.string().min(2).notRequired(),
        phoneNumber: Yup.string().min(5).max(30).notRequired(),
      })}
      onSubmit={(values) => {
        dispatch(changeUserInfo(values)).then(() =>
          Swal.fire({ title: 'Uspesno zamenjeni podaci', icon: 'success' }),
        );
      }}
    >
      {({ resetForm }) => (
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Input name="email" placeholder="Email" />
            </Grid>
            <Grid item xs={12}>
              <Input name="name" placeholder="Ime" />
            </Grid>
            <Grid item xs={12}>
              <Input name="phoneNumber" placeholder="Broj telefona" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined">
                Izmeni podatke
              </Button>
              <Box ml={2} display="inline">
                <Button variant="outlined" onClick={() => resetForm()}>
                  Resetuj
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  // if (canChange) {
  // return (
  //   <Card className="my-3 p-2">
  //     <div className="flex flex-wrap flex-col my-2">
  //       <label htmlFor="email" className="text-lg px-2 py-1">
  //         Email
  //       </label>
  //       {/* <Input value={email} id="email" onChange={(e) => setEmail(e.currentTarget.value)} /> */}
  //     </div>

  //     <div className="flex flex-wrap flex-col my-2">
  //       <label htmlFor="name" className="text-lg px-2 py-1">
  //         Ime
  //       </label>
  //       {/* <Input id="name" value={name} onChange={(e) => setName(e.currentTarget.value)} /> */}
  //     </div>

  //     <div className="flex flex-wrap flex-col my-2">
  //       <label htmlFor="phoneNumber" className="text-lg px-2 py-1">
  //         Telefon
  //       </label>
  //       {/* <Input
  //           id="phoneNimber"
  //           value={phoneNumber}
  //           onChange={(e) => setPhoneNumber(e.currentTarget.value)}
  //         /> */}
  //     </div>

  //     <div className="flex justify-between px-1">
  //       <Button className="w-5/12" onClick={reset}>
  //         Odustani
  //       </Button>
  //       <Button className="w-5/12" onClick={change}>
  //         Izmeni
  //       </Button>
  //     </div>
  //   </Card>
  // );
  // } else {
  //   return (
  //     <Card className="my-3 p-2 text-lg">
  //       <Pair name="Email" value={user.email} />
  //       <Pair name="Ime" value={user.name ? user.name : "Nema imena"} />
  //       <Pair name="Telefon" value={user.phoneNumber || "Nema broja"} />
  //       <Button className="w-full" onClick={() => setCanChange(true)}>
  //         Izmeni
  //       </Button>
  //     </Card>
  //   );
  // }
}
