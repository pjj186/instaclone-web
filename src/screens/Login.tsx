import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import PageTitle from '../components/PageTitle';
import routes from '../routes';
import { useForm } from 'react-hook-form';
import FormError from '../components/auth/FormError';

interface FormData {
  username: string;
  password: string;
}

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmitValid = (data: FormData) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 5,
                message: '최소 길이는 5글자입니다.',
              },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message!)}
          />
          <FormError message={errors?.username?.message!} />
          <Input
            {...register('password', {
              required: 'Password is required',
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message!)}
          />
          <FormError message={errors?.password?.message!} />
          <Button type="submit" value="Log in" disabled={!isValid} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        callToAction={"Don't have an account?"}
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
};

export default Login;
