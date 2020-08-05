import { Box, Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';
import { Input } from '../ui/Input';
import { ShowErrorAlert } from '../ui/SubmitError';

interface Props {
  /** Is this a login or register form */
  formType: 'login' | 'register';
  /** Function to handle form submiting */
  onSubmit: (values: Record<string, any>) => any;
}

/**
 * Auth form. This component will handle validation for login and register,
 * and execute provided function on submit
 */
export default function AuthForm({ onSubmit, formType }: Props) {
  /** Helper value for rendering to know if it should render login or register form */
  const isLoging = formType === 'login';

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '', name: '' }}
      onSubmit={onSubmit}
      validateOnChange={false}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required(),
        password: isLoging ? Yup.string().required() : Yup.string().min(8).max(40).required(),
        // Only check for confirm password on register
        // Passwords must be the same. I don't know why null is needed, it's like this in issue
        // https://github.com/jaredpalmer/formik/issues/90
        name: isLoging ? Yup.mixed().notRequired() : Yup.string().min(3).max(50).required(),
        confirmPassword: isLoging
          ? Yup.mixed().notRequired()
          : Yup.string()
              // TODO: Check null as any in future
              .oneOf([Yup.ref('password'), null as any], 'Passwords must be same')
              .required(),
      })}
    >
      {() => (
        <Form
          className="inset-0 fixed bg-white"
          style={{
            zIndex: 2000,
          }}
        >
          <ShowErrorAlert />
          <div className="w-full max-w-xs md:max-w-sm mx-auto my-16">
            <Card>
              {/* Image */}
              <Link href="/">
                <img
                  src="http://placehold.it/400x168"
                  alt="Logo"
                  className="mb-4"
                  style={{ height: 168, width: '100%' }}
                />
              </Link>

              {/* Name input  */}
              {!isLoging && (
                <Box p={2} pt={0}>
                  <Input placeholder="Petar Petrovic" required name="name" />
                </Box>
              )}

              {/* Email input  */}
              <Box p={2} pt={0}>
                <Input type="email" placeholder="email@example.com" required name="email" />
              </Box>

              {/* Password input */}
              <Box p={2} pt={0}>
                <Input type="password" placeholder="Sifra" name="password" required />
              </Box>

              {/* Confirm password input  */}
              {!isLoging && (
                <Box p={2} pt={0}>
                  <Input
                    type="password"
                    placeholder="Sifra ponovo"
                    required
                    name="confirmPassword"
                  />
                </Box>
              )}

              {/* Submit and reset password buttons */}
              <Box p={2} pt={0} justifyContent="space-between" display="flex">
                <Button type="submit" variant="contained">
                  {isLoging ? 'Uloguj se' : 'Registruj se'}
                </Button>
                {isLoging && (
                  <Link href="/auth/reset-password">
                    <Button style={{ textTransform: 'none' }} className="ml-auto">
                      Zaboravili ste lozinku?
                    </Button>
                  </Link>
                )}
              </Box>
            </Card>

            {/* Switch from login to register and vice versa */}
            <Card className="px-4 py-5 mt-5">
              {isLoging ? 'Nemate nalog?' : 'Image nalog?'}
              <Link href={'/auth/' + (isLoging ? 'register' : 'login')}>
                <a className="font-bold pl-2">{isLoging ? 'Registruje se' : 'Ulogujte se'}</a>
              </Link>
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
}
