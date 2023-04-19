import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import PageTitle from '../components/PageTitle';
import { FatLink } from '../components/shared';
import routes from '../routes';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import FormError from '../components/auth/FormError';

interface ISignUpFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  result: string;
}

interface ICreateAccountResult {
  createAccount: {
    error: string;
    ok: boolean;
  };
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data: ICreateAccountResult) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError('result', {
        message: error,
      });
      return;
    }
    history.push(routes.home, {
      message: 'Account created. Please log in.',
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    getValues,
  } = useForm<ISignUpFormData>({
    mode: 'onChange',
  });

  const onSubmitValid = (data: ISignUpFormData) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('firstName', {
              required: 'First Name is required.',
            })}
            type="text"
            placeholder="FirstName"
            hasError={Boolean(errors?.firstName?.message!)}
          />
          <FormError message={errors?.firstName?.message!} />
          <Input {...register('lastName')} type="text" placeholder="LastName" />
          <Input
            {...register('email', {
              required: 'Email is required.',
            })}
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message!)}
          />
          <FormError message={errors?.email?.message!} />
          <Input
            {...register('username', {
              required: 'Username is required.',
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
              required: 'password is required.',
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message!)}
          />
          <FormError message={errors?.password?.message!} />
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Sign up'}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message!} />
        </form>
      </FormBox>
      <BottomBox
        callToAction="Have an account?"
        link={routes.home}
        linkText="Log in"
      />
    </AuthLayout>
  );
};

export default SignUp;
