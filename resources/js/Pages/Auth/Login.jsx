import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
          onFinish: () => reset('password'),
        });
      };
      

    return (
        <>
            <Head title="Log in" />
            <section className="sign-up">
      <div className="container-lg">
         <div className="row align-items-center sign-up-inner m-auto">
            <div className="col-md-6">
               <div className="signup-logo">
                  <img src="assets/img/signup-logo.png" alt="signup-logo" className="img-fluid" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="signup-form ms-md-auto">
                  <div className="form-heading text-center mt-md-0 mt-5">
                     <div className="signup-icon d-none d-md-block">
                        <img src="assets/img/logo-icon.png" alt="logo-icon" />
                     </div>
                     <h2 className="mt-3">Login your account</h2>
                  </div>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}


            <form onSubmit={submit} id="signupForm" className="row mt-3 mt-xl-5">
            <InputError message={errors.email} />
            <div className="col-12 mb-3">
            <label className="form-label">Email*</label>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="form-control"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                     


                </div>

                <div className="col-12 mb-2">
                <label className="form-label">Password*</label>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="form-control"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="col-12 mb-4">
                       <p className="instruction">Must be at least 8 characters.</p>
                </div>
                

                <div className="col-12">
                    

                    <PrimaryButton className="common_btn rounded-3 border-0" disabled={processing}>
                    Get started
                    </PrimaryButton>
                </div>
            </form>
            </div>
            </div>
         </div>
      </div>
   </section>
      </>
    );
}
