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
import { gql, useMutation } from '@apollo/client';
import { logUserIn } from '../apollo';
import { useLocation } from 'react-router-dom';

interface LocationState {
  message: string;
  username: string;
  password: string;
}

interface ILoginFormData {
  username: string;
  password: string;
  result: string;
}

interface ILoginResult {
  login: {
    error: string;
    ok: boolean;
    token: string;
  };
}

const Notification = styled.div`
  color: #2ecc71;
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation<LocationState>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<ILoginFormData>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  const onCompleted = (data: ILoginResult) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError('result', {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginError = () => {
    clearErrors('result');
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 5,
                message: '최소 길이는 5글자입니다.',
              },
            })}
            onFocus={clearLoginError}
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
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Log in'}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message!} />
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
